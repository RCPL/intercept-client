import url from 'url';
import { ApiManager } from './../src/util/ApiManager';
import classModel from './mocks/classModel';

export const testApi = new ApiManager({
  model: classModel,
  priority: 2
});

describe('ApiManager', () => {
  it('instantiates', () => {
    expect(testApi).toBeInstanceOf(ApiManager);
    expect(testApi.type).toEqual('node');
    expect(testApi.bundle).toEqual('classroom');
    expect(testApi.resource).toEqual('node--classroom');
    expect(testApi.fields).toHaveProperty('node--classroom');
    expect(testApi.fields['node--classroom']).toContain('changed');
  });

  it('getEndpoint', () => {
    expect(testApi.getEndpoint({})).toEqual(url.format({
      host: '/',
      pathname: 'jsonapi/node/classroom',
      query: {
        'fields[node--classroom]':
            'title,uuid,nid,field_archived,field_class_grade,created,changed'
      }
    }));
  });

  it('can disable sparse fieldsets', () => {
    expect(testApi.getEndpoint({ fields: null })).toEqual(url.format({
      host: '/',
      pathname: 'jsonapi/node/classroom'
    }));
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
      pathname: 'jsonapi/node/classroom',
      query: {
        'filter[status][value]': '1'
      }
    }));
  });

  it('getEndpointPath', () => {
    expect(testApi.getEndpointPath()).toEqual('jsonapi/node/classroom');
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
