const classSchema = {
  title: {
    alias: 'name',
    type: 'string',
    required: true
  },
  uuid: {
    type: 'string'
  },
  nid: {
    alias: 'id',
    type: 'string'
  },
  field_archived: {
    alias: 'archived',
    type: 'boolean'
  },
  field_class_grade: {
    alias: 'grade',
    type: 'relationship',
    required: false,
    ref: 'taxonomy_term--grades'
  },
  created: {
    type: 'date'
  },
  changed: {
    type: 'date'
  }
};
export default classSchema;
