import find from 'lodash/find';
import findKey from 'lodash/findKey';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import uuid from 'uuid';

import { JsonApiSchema, JsonApiModel } from './JsonApiModel';
import Registrar from './Registrar';

export const modelRegistrar = new Registrar('entityManagers');

export function loadEntity(resource, id, state) {
  // if (!state.hasOwnProperty(resource)) {
  //   logger.log(new Error(`Tried to load an entity from a resource, ${resource}, that does not exist.`));
  //   return null;
  // }
  //
  // const entity = state[resource].items[uuid];
  //
  // if (!entity) {
  //   logger.log(new Error(`Tried to load a ${resource} entity, ${uuid}, that does not exist.`));
  //   return null;
  // }
  //
  // return entity;
  return state[resource].items[id];
}

export function loadEntityFromState(state) {
  return (resource, id) => loadEntity(resource, id, state);
}

/**
 * An EntityModel is used to manage the back and forth transformation between
 *  JSON_API structured resources and locally stored entity objects.
 *  EntityModel instances are created on a per resource type basis.
 *
 * @type {EntityModel}
 */
export const EntityModel = class {
  /**
   * Entity Manager constructor
   * @param  {String} type    Drupal entity type. ex. 'node', 'taxonomy_term'
   * @param  {String} bundle  Drupal bundle type. ex. 'article', 'tags'
   * @param  {Object} schema  Schema definition describing how fields map to JSON_API
   */
  constructor(type, bundle, schema) {
    const resource = `${type}--${bundle}`;
    this.type = type;
    this.bundle = bundle;
    this.resource = resource; // JSON_API resource type
    this.schema = schema;
    this.jsonApiSchema = new JsonApiSchema(resource, schema);
    this.model = new JsonApiModel(this.jsonApiSchema);
    this.import = this.import.bind(this);
    this.getDependentFields = this.getDependentFields.bind(this);
    this.dependentFields = this.getDependentFields();
    this.getFields = this.getFields.bind(this);
    modelRegistrar.register(resource, this);
  }

  /**
   * Create a new entity POJO to store data and state.
   * @param  {Object} data Initial entity data fields.
   * @return {Object}      Standard entity formatted data.
   */
  static create(data) {
    const id = data.uuid || uuid.v4();

    return {
      id,
      data: Object.assign({}, data, { uuid: id }),
      state: {
        saved: false, // Exists remotely.
        syncing: null, // Request sent, response not yet received
        error: null, // { status: '403', message: 'Forbidden'}
        dirty: true // Local Changes, not yet synced
      }
    };
  }

  /**
   * Returns a flat array of dependent entity uuids
   * @params
   */
  getDependentUuids(id, state) {
    const { dependentFields, resource } = this;
    const item = loadEntityFromState(state)(resource, id);

    return dependentFields.reduce(
      (acc, field) =>
        // Ignore null values.
        acc.concat([].concat(item.data[field]).filter(i => i)),
      []
    );
  }

  /**
   * Returns a flat array of field names. Uses alias if available.
   * @param {boolean}
   *   If aliases should be used or the root field name.
   */
  getFields(useAlias) {
    const { schema } = this;
    const fields = Object.keys(schema);
    return !useAlias ? fields : fields.map(field => schema[field].alias || field);
  }

  /**
   * Returns a flat array of dependent field names. Uses alias if available.
   * @params
   */
  getDependentFields() {
    const { schema } = this;
    const dependentFields = Object.keys(schema)
      .filter(field => schema[field].dependency)
      .map(field => schema[field].alias || field);
    return dependentFields;
  }

  /**
   * Returns an array of relationships
   */
  getRelationships() {
    return keys(pickBy(this.schema, o => o.type === 'relationship'));
  }

  /**
   * Returns an array of relationships with their aliases.
   */
  getRelationshipAliases() {
    return this.getRelationships().map(r => this.getPropertyAlias(r));
  }

  /**
   * Returns a property alias if it exist.
   */
  getPropertyAlias(property) {
    if (property in this.schema && 'alias' in this.schema[property]) {
      return this.schema[property].alias;
    }

    return property;
  }

  /**
   * Returns a property alias if it exist.
   */
  getPropertyFromAlias(alias) {
    return (
      findKey(
        this.schema,
        property => 'alias' in property && property.alias === alias
      ) || alias
    );
  }

  /**
   * Converts JSON_API formated Entity into a plain object.
   * @param  {Object} entity JSON_API formated object
   * @return {Object}        Plain object representation of the data.
   */
  import(entity) {
    if (!entity) {
      return {};
    }

    const { model } = this;
    // Set the models data property to match the entity's
    model._data = entity;

    const data = {};

    // Set each prop listed in the schema.
    forEach(this.schema, (value, key) => {
      const prop = value.alias ? value.alias : key;

      // Translations is a special property that does not map to a field.
      if (prop !== 'translations') {
        data[prop] = model[prop];
      }
    });

    return data;
  }

  /**
   * Converts plain object into a JSON_API representation based on a schema.
   * @param  {Object} entity Plain object representation of the data.
   * @return {Object}        JSON_API formatted object
   */
  export(entity) {
    const model = new JsonApiModel(this.jsonApiSchema);

    // Set each prop.
    forEach(entity.data, (value, key) => {
      // Ignore created and changed date.
      const ignoredFields = ['created', 'changed', 'nid', 'tid', 'id'];
      if (ignoredFields.includes(key)) {
        return;
      }

      const field =
        key in this.jsonApiSchema.schema
          ? this.jsonApiSchema.schema[key]
          : find(this.jsonApiSchema.schema, s => s.alias === key);
      // @todo Remove this workaround once https://www.drupal.org/node/2790257 is fixed.
      // The following workaround loads the replaces the uuid on relationships with
      // the appropriate Drupal ID.

      if (field) {
        if (field.type !== 'relationship') {
          // If it's not a relationship, use the value as is.
          model[key] = value;
        }
        else if (field.multiple) {
          // If it is a relationship, the value is a uuid
          // use the uuid to get the data.id  (drupal id) of the entity
          // Ignore the key if there are no values.
          // Remove null values.
          const result = value.filter(v => v);
          if (result.length > 0) {
            model[key] = result;
          }
        }
        else if (value) {
          model[key] = value;
        }
      }
    });

    const data = model._data;
    data.id = model.uuid;

    return {
      data
    };
  }
};

export default EntityModel;
