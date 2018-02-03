require('isomorphic-fetch');
import Orbit, { Schema } from '@orbit/data';
import Store from '@orbit/store';
import Coordinator, { RequestStrategy, SyncStrategy, EventLoggingStrategy } from '@orbit/coordinator';
import JSONAPISource, { JSONAPISerializer } from '@orbit/jsonapi';
import schema from '../src/schema';
import InterceptClient from '../src/index.js';

import resource_types from './mocks/resource_types';

const testClient = new InterceptClient({
  host: 'http://intercept.test'
});

const models = Object.keys(schema._models);
const relationshipModels = models.reduce((modelList, resource) => {
  const model = schema.getModel(resource);
  // Get a list of
  const relatedModels = Object.keys(model.relationships || {})
  .map(rel => model.relationships[rel].model);

  // Add related models to the list and ensure they are unique.
  return modelList.concat(relatedModels.filter(relatedModel => {
    return modelList.indexOf(relatedModel) < 0;
  }));
}, []);

testClient.coordinator.activate();

describe('Intercept Schema', () => {
  it('instantiates', () => {
    expect(schema).toBeInstanceOf(Schema);
  });

  resource_types.forEach(resource => {
    it(`has ${resource}`, () => {
      expect(schema.getModel(resource)).toBeInstanceOf(Object);
    });
  });

  relationshipModels.forEach(relationshipModel => {
    it(`Relationship ${relationshipModel} has matching model`, () => {
      expect(schema.getModel(relationshipModel)).toBeInstanceOf(Object);
    });
  });
});

describe('InterceptClient', () => {
  it('instantiates', () => {
    expect(testClient.store).toBeInstanceOf(Store);
  });

  it('has a coordinator', () => {
    expect(testClient.coordinator).toBeInstanceOf(Coordinator);
    expect(testClient.coordinator.sources).toBeInstanceOf(Array);
  });

  it('has a store source', () => {
    expect(testClient.coordinator.getSource('store')).toBeInstanceOf(Store);
  });

  it('has a remote source', () => {
    expect(testClient.coordinator.getSource('remote')).toBeInstanceOf(JSONAPISource);
  });

  it('can be activated', (done) => {
    testClient.coordinator.activate().then(() => {
      expect(testClient.coordinator.activated).toBeInstanceOf(Promise);
      done();
    })
  });

  it('can be deactivated', (done) => {
    testClient.coordinator.deactivate().then(() => {
      expect(testClient.coordinator.activated).toBeFalsy();
      done();
    })
  });

  it('can query', (done) => {
    testClient.coordinator.activate().then(() => {
      testClient.store.query(q => q.findRecords('node--location'))
        .then((result) => {
          expect(result).toBeInstanceOf(Array);
          done();
      })
    })
  });
});
