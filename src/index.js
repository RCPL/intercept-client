import Orbit from '@orbit/data';
import Store from '@orbit/store';
import Coordinator, { RequestStrategy, SyncStrategy } from '@orbit/coordinator';
import DrupalJSONAPISource from 'orbit-drupal';
// eslint-disable-next-line no-unused-vars
import isomorphicfetch from 'isomorphic-fetch';
import schema from './schema';

Orbit.fetch = window.fetch.bind(window);

export class OrbitClient {
  constructor(settings) {
    this.schema = settings.schema;
    this.strategies = settings.strategies || [];

    // Setup in-memory source.
    const store = new Store({ schema });
    this.store = store;

    const sources = settings.sources || [store];

    const coordinator = new Coordinator({
      sources
    });

    this.strategies.forEach(strategy => {
      coordinator.addStrategy(strategy);
    });

    this.coordinator = coordinator;
  }
}

export default class InterceptClient extends OrbitClient {
  constructor(settings) {
    const _settings = Object.assign({
      schema,
      namespace: 'jsonapi'
    }, settings);

    super(_settings);

    // Setup remote source
    const remote = new DrupalJSONAPISource({
      schema: _settings.schema,
      name: 'remote',
      namespace: _settings.namespace,
      host: _settings.host
    });
    this.coordinator.addSource(remote);

    // Query the remote server whenever the store is queried
    this.coordinator.addStrategy(new RequestStrategy({
      source: 'store',
      on: 'beforeQuery',
      target: 'remote',
      action: 'pull',
      blocking: true
    }));
    // Update the remote server whenever the store is updated
    this.coordinator.addStrategy(new RequestStrategy({
      source: 'store',
      on: 'beforeUpdate',
      target: 'remote',
      action: 'push',
      blocking: false
    }));
    // Sync all changes received from the remote server to the store
    this.coordinator.addStrategy(new SyncStrategy({
      source: 'remote',
      target: 'store',
      blocking: true
    }));
  }
}

// const store = new Store({ schema });

// Setup remote source
// const remote = new DrupalJSONAPISource({
//   schema,
//   name: 'remote',
//   namespace: 'jsonapi',
//   host: 'http://intercept.test'
// });

// // Setup offline source
// const backup = new IndexedDBSource({
//   schema,
//   name: 'backup',
//   namespace: 'intercept_client'
// });

// const coordinator = new Coordinator({
//   // sources: [store, backup]
//   // sources: [store, backup, remote]
//   sources: [store, remote]
// });

// const backupStoreSync = new SyncStrategy({
//   source: 'store',
//   target: 'backup',
//   blocking: true
// });

// coordinator.addStrategy(backupStoreSync);
// coordinator.addStrategy(new EventLoggingStrategy());

// // // Query the remote server whenever the store is queried
// coordinator.addStrategy(new RequestStrategy({
//   source: 'store',
//   on: 'beforeQuery',
//   target: 'remote',
//   action: 'pull',
//   blocking: true
// }));
// // Update the remote server whenever the store is updated
// coordinator.addStrategy(new RequestStrategy({
//   source: 'store',
//   on: 'beforeUpdate',
//   target: 'remote',
//   action: 'push',
//   blocking: false
// }));
// // Sync all changes received from the remote server to the store
// coordinator.addStrategy(new SyncStrategy({
//   source: 'remote',
//   target: 'store',
//   blocking: true
// }));

// coordinator.activate().then(() => {
//   store.query(q => q.findRecords('node--location')).then((result => console.log(result)));
//   // console.log('Coordinator is active');
// });
// // returns a promise that resolves when all strategies
// // have been activated

// export default store;
