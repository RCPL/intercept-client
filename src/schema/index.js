import { Schema } from '@orbit/data';

const schemaDefinition = require('./schema.json');

const schema = new Schema(schemaDefinition);
export default schema;
