import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import url from 'url';
import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';
import {
  ApiManager,
  apiRegistrar,
  apiReducer,
  dataReducer
} from './../src/util/ApiManager';
import * as t from './../src/actionTypes';
import Registrar from './../src/util/Registrar';
import interceptClient from './../src/index';

// Mocks
import mockState from './mocks/state.json';
import eventCollectionResponse from './__mockData__/responses/node--event/collection/success.json';
import eventCollectionResponseWithIncludes from './__mockData__/responses/node--event/collection/withIncludesSuccess.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//
function getIncludes(response) {
  const includes = [];
  const resources = groupBy(response.included, record => record.type);
  forEach(resources, (records, type) => {
    includes.push({
      type: t.RECEIVE,
      id: undefined,
      resource: type,
      resp: { data: records }
    });
  });
  return includes;
}

describe('ApiManager', () => {
  const resource = 'node--event';
  let testApi;
  let testModel;

  beforeAll(() => {
    testApi = interceptClient.api[resource];
    testModel = interceptClient.models[resource];
  });

  it('instantiates', () => {
    expect(testApi).toBeInstanceOf(ApiManager);
    expect(testApi.type).toEqual('node');
    expect(testApi.bundle).toEqual('event');
    expect(testApi.resource).toEqual('node--event');
    expect(testApi.fields).toHaveProperty('node--event');
    expect(testApi.fields['node--event']).toContain('changed');
  });

  it('Creates an api register', () => {
    expect(apiRegistrar).toBeInstanceOf(Registrar);
    expect(apiRegistrar.get('node--event')).toBeInstanceOf(ApiManager);
  });

  it('getEndpoint', () => {
    expect(testApi.getEndpoint({})).toEqual(url.format({
      host: '/',
      pathname: 'jsonapi/node/event',
      query: {
        'fields[node--event]': Object.keys(testModel.schema).join(',')
      }
    }));
  });

  it('can disable sparse fieldsets', () => {
    expect(testApi.getEndpoint({ fields: null })).toEqual(url.format({
      host: '/',
      pathname: 'jsonapi/node/event'
    }));
  });

  it('can purge', () => {
    expect(testApi.purge).toBeInstanceOf(Function);
    expect(testApi.purge()).toBeInstanceOf(Function);
  });

  it('can apply filters', () => {
    const filters = {
      published: {
        path: 'status',
        value: '1'
      }
    };
    expect(testApi.getEndpoint({ filters, fields: null })).toEqual(url.format({
      host: '/',
      pathname: 'jsonapi/node/event',
      query: {
        'filter[status][value]': '1'
      }
    }));
  });

  it('getEndpointPath', () => {
    expect(testApi.getEndpointPath()).toEqual('jsonapi/node/event');
  });

  it('getEndpointInclude', () => {
    expect(ApiManager.getEndpointInclude([])).toEqual({});
    expect(ApiManager.getEndpointInclude(['uid'])).toEqual({
      include: 'uid',
    });
    expect(ApiManager.getEndpointInclude(['uid', 'field_event'])).toEqual({
      include: 'uid,field_event',
    });
  });

  it('getEndpointOrigin', () => {
    expect(ApiManager.getEndpointOrigin({
      host: 'http://www.example.com'
    })).toEqual('http://www.example.com');
    expect(ApiManager.getEndpointOrigin('http://www.example.com/jsonapi')).toEqual('http://www.example.com');
    expect(ApiManager.getEndpointOrigin()).toEqual('/');
  });

  it('getEndpointFilters uses shorthand', () => {
    expect(ApiManager.getEndpointFilters({
      published: {
        path: 'status',
        value: '1'
      }
    })).toEqual({
      'filter[status][value]': '1'
    });
  });

  it('getEndpointFilters handles multiple', () => {
    expect(ApiManager.getEndpointFilters({
      published: {
        path: 'status',
        value: '1'
      },
      user: {
        path: 'user.uid',
        value: '1'
      }
    })).toEqual({
      'filter[status][value]': '1',
      'filter[user.uid][value]': '1'
    });
  });

  it('getEndpointFilters applies operator', () => {
    expect(ApiManager.getEndpointFilters({
      published: {
        path: 'status',
        value: '1',
        operator: '<>'
      }
    })).toEqual({
      'filter[published][condition][path]': 'status',
      'filter[published][condition][value]': '1',
      'filter[published][condition][operator]': '<>'
    });
  });

  it('getEndpointFilters condition applies memberOf', () => {
    expect(ApiManager.getEndpointFilters({
      published: {
        path: 'status',
        value: '1',
        memberOf: 'and-group'
      }
    })).toEqual({
      'filter[published][condition][path]': 'status',
      'filter[published][condition][value]': '1',
      'filter[published][condition][memberOf]': 'and-group'
    });
  });

  it('getEndpointFilters group defaults to AND', () => {
    expect(ApiManager.getEndpointFilters({
      'and-group': {
        type: 'group'
      }
    })).toEqual({
      'filter[and-group][group][conjunction]': 'AND'
    });
  });

  it('getEndpointFilters group applies conjunction', () => {
    expect(ApiManager.getEndpointFilters({
      'or-group': {
        type: 'group',
        conjunction: 'OR'
      }
    })).toEqual({
      'filter[or-group][group][conjunction]': 'OR'
    });
  });

  it('getEndpointFilters group applies memberOf', () => {
    expect(ApiManager.getEndpointFilters({
      'or-group': {
        type: 'group',
        conjunction: 'OR',
        memberOf: 'and-group'
      }
    })).toEqual({
      'filter[or-group][group][conjunction]': 'OR',
      'filter[or-group][group][memberOf]': 'and-group'
    });
  });
});

describe('api actions', () => {
  let testApi;
  let store;
  const resource = 'node--event';

  beforeAll(() => {
    testApi = interceptClient.api[resource];
    store = mockStore(mockState.payload[0]);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('dispatches RESET', () => {
    store.dispatch(testApi.reset());
    // Test if your store dispatched the expected actions
    const expectedActions = [
      {
        resource,
        type: t.RESET
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches PURGE', () => {
    store.dispatch(testApi.purge());
    // Test if your store dispatched the expected actions
    const expectedActions = [
      {
        resource,
        type: t.PURGE
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches fetchAll actions for simple collection', () => {
    fetch.mockResponse(JSON.stringify(eventCollectionResponse));

    const expectedActions = [
      // a.request
      {
        type: t.REQUEST,
        id: undefined,
        resource
      },
      // a.receive
      {
        type: t.RECEIVE,
        id: undefined,
        resource,
        resp: { data: eventCollectionResponse.data }
      }
      // a.setTimestamp
    ];
    return store.dispatch(testApi.fetchAll()).then(() => {
      const actions = store.getActions();
      const timeStampAction = actions.pop();
      expect(actions).toEqual(expectedActions);

      // Check timestamp action
      expect(timeStampAction.type).toEqual(t.SET_TIMESTAMP);
      expect(timeStampAction.resource).toEqual(resource);
      expect(typeof timeStampAction.resource).toEqual('string');
    });
  });

  it('dispatches fetchAll actions for collection w/ includes', () => {
    fetch.mockResponse(JSON.stringify(eventCollectionResponseWithIncludes));

    const expectedActions = [].concat(
      // a.request
      {
        type: t.REQUEST,
        id: undefined,
        resource
      },
      // processIncludes [a.receive]
      getIncludes(eventCollectionResponseWithIncludes),
      // a.receive
      {
        type: t.RECEIVE,
        id: undefined,
        resource,
        resp: { data: eventCollectionResponseWithIncludes.data }
      }
      // a.setTimestamp
    );
    return store.dispatch(testApi.fetchAll()).then(() => {
      const actions = store.getActions();
      const timeStampAction = actions.pop();
      expect(actions).toEqual(expectedActions);
      expect(timeStampAction.type).toEqual(t.SET_TIMESTAMP);
      expect(timeStampAction.resource).toEqual(resource);
      expect(typeof timeStampAction.resource).toEqual('string');
    });
  });
});

describe('Data Reducers', () => {
  const initialState = {
    id: {
      data: {},
      state: {
        dirty: false,
        error: null,
        saved: true,
        syncing: false
      }
    }
  };

  it('should handle CLEAR_ERRORS', () => {
    const action = {
      type: t.CLEAR_ERRORS,
      id: 'id'
    };

    const expectedState = {
      id: {
        data: {},
        state: {
          dirty: false,
          error: null,
          saved: true,
          syncing: false
        }
      }
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_SAVED', () => {
    const action = {
      type: t.SET_SAVED,
      id: 'id',
      value: false
    };

    const expectedState = {
      id: {
        data: {},
        state: {
          dirty: true,
          error: null,
          saved: false,
          syncing: false
        }
      }
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REQUEST', () => {
    const action = {
      type: t.REQUEST,
      id: 'id'
    };

    const expectedState = {
      id: {
        data: {},
        state: {
          dirty: false,
          error: null,
          saved: true,
          syncing: true
        }
      }
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RECEIVE', () => {
    const action = {
      type: t.RECEIVE,
      id: 'id',
      resp: {
        data: {
          attributes: {},
          links: {},
          meta: {}
        }
      }
    };

    const expectedState = {
      id: {
        data: {
          attributes: {},
          links: {},
          meta: {}
        },
        state: {
          dirty: false,
          error: null,
          saved: true,
          syncing: false
        }
      }
    };
    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });
});

describe('API Reducers', () => {
  let resource;
  let initialState;

  beforeEach(() => {
    resource = 'node--event';
    initialState = {
      items: {
        a: {
          data: {
            id: 'a',
            type: resource
          },
          state: {
            dirty: false,
            error: null,
            saved: true,
            syncing: false
          }
        }
      },
      validating: false,
      syncing: false,
      error: null,
      updated: null
    };
  });

  it('should handle CLEAR_ERRORS', () => {
    const action = {
      type: t.CLEAR_ERRORS,
      resource
    };

    const newInitialState = Object.assign({}, initialState);
    newInitialState.items.a.state.error = 'error';
    newInitialState.error = 'error';

    const expectedState = {
      items: {
        a: {
          data: {
            id: 'a',
            type: resource
          },
          state: {
            dirty: true,
            error: null,
            saved: true,
            syncing: false
          }
        }
      },
      error: null,
      syncing: false,
      updated: null,
      validating: false
    };
    expect(apiReducer(resource)(newInitialState, action)).toEqual(expectedState);
  });

  it('should handle MARK_DIRTY', () => {
    const action = {
      type: t.MARK_DIRTY,
      resource
    };

    expect(apiReducer(resource)(initialState, action).items.a.state.dirty).toEqual(true);
  });

  it('should handle REQUEST', () => {
    const action = {
      type: t.REQUEST,
      resource
    };

    expect(apiReducer(resource)(initialState, action).syncing).toEqual(true);
  });

  it('should handle SET_TIMESTAMP', () => {
    const action = {
      type: t.SET_TIMESTAMP,
      resource,
      timestamp: '1234'
    };

    expect(apiReducer(resource)(initialState, action).updated).toEqual('1234');
  });

  it('should handle RECEIVE', () => {
    const action = {
      type: t.RECEIVE,
      resource,
      resp: {
        data: [
          {
            id: 'a',
            type: 'node--event',
            attributes: {
              uuid: 'a'
            },
            relationships: {
              b: {
                type: 'media--image',
                id: 'c'
              }
            },
            links: {
              self: '...'
            },
            meta: {
              stuff: {}
            }
          }
        ]
      }
    };

    const expectedState = {
      items: {
        a: {
          data: {
            id: 'a',
            type: 'node--event',
            attributes: {
              uuid: 'a'
            },
            relationships: {
              b: {
                type: 'media--image',
                id: 'c'
              }
            },
            links: {
              self: '...'
            },
            meta: {
              stuff: {}
            }
          },
          state: {
            dirty: false,
            error: null,
            saved: true,
            syncing: false
          }
        }
      },
      error: null,
      syncing: false,
      updated: null,
      validating: false
    };
    expect(apiReducer(resource)(initialState, action)).toEqual(expectedState);
  });
});
