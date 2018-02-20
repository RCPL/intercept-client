import { EntityModel } from './../../src/util/EntityModel';
import classSchema from './classSchema';

const classModel = new EntityModel('node', 'classroom', classSchema);
export default classModel;
