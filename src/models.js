import mapValues from 'lodash/mapValues';
import Model from './lib/EntityModel';
import schema from './schema/schema.json';

const models = mapValues(schema, (model, resource) =>
  new Model(
    resource.split('--')[0],
    resource.split('--')[1],
    model
  ));

export default models;
