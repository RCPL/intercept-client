const mapValues = require('lodash/mapValues');
// import { connect } from 'net';

const filePath = './src/schema/schema.json';

// const dotenv = require('dotenv').config();
const OrbitSchemaFromOpenApi = require('orbit-schema-from-openapi');

const interceptSchema = new OrbitSchemaFromOpenApi({
  base: process.env.DOMAIN,
  oauth: {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  whitelist: {
    resources: [
      'evaluation_criteria:evaluation_criteria',
      'file:file',
      'event_recurrence:event_recurrence',
      'media:file',
      'media:image',
      'media:slideshow',
      'media:web_video',
      'node:equipment',
      'node:event',
      'node:event_series',
      'node:location',
      'node:room',
      'taxonomy_term:audience',
      'taxonomy_term:equipment_type',
      'taxonomy_term:evaluation_criteria',
      'taxonomy_term:event_type',
      'taxonomy_term:lc_subject',
      'taxonomy_term:meeting_purpose',
      'taxonomy_term:population_segment',
      'taxonomy_term:room_type',
      'taxonomy_term:tag',
      'user:user'
    ]
  },
  blacklist: {
    attributes: [
      'default_langcode',
      'vid',
      'langcode',
      'revision_timestamp',
      'revision_log',
      'revision_created',
      'revision_log_message',
      'revision_translation_affected'
    ],
    relationships: [
      'bundle',
      'revision_uid',
      'menu_link',
      'revision_user',
      'vid'
    ]
  },
  alterRelationship: (resource, name, relationship) => {
    const output = {
      name,
      relationship
    };
    switch (name) {
      // Update the taxonomy relationship to point to the same model,
      //  rather than the non-existent 'taxonomy_term--taxonomy_term'
      case 'parent':
        output.relationship.model = resource;
        break;
      default:
        break;
    }

    return output;
  }
});

// const additionalModels = {
// "node_type--node_type": {
//   "attributes": {
//     "uuid": {
//       "type": "string"
//     },
//     "name": {
//       "type": "string"
//     },
//     "type": {
//       "type": "string"
//     },
//   },
// },
// "user_role--user_role": {
//   "attributes": {
//     "uuid": {
//       "type": "string"
//     },
//     "name": {
//       "type": "string"
//     }
//   },
// },
// };

function updateSchema(schema) {
  const output = mapValues(schema.models, model => {
    const relationships = model.relationships
      ? mapValues(model.relationships, relationship =>
        Object.assign({}, relationship, { type: 'relationship' }))
      : {};
    return Object.assign({}, model.attributes, relationships);
  });
  return output;
}

interceptSchema
  .generate()
  .then(updateSchema)
  .then(interceptSchema.writeToFile(filePath))
  .catch(err => console.log(err));
