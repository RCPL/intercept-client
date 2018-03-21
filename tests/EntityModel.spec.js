import { EntityModel } from './../src/util/EntityModel';
import classModel from './mocks/classModel';
import interceptClient from './../src/index';
import eventCollectionResponse from './__mockData__/responses/node--event/collection/withIncludesSuccess.json';

const { models } = interceptClient;

const eventModel = models['node--event'];
const eventData = eventCollectionResponse.data[0];

const fileData = eventCollectionResponse.included.filter(include => include.type === 'file--file')[0];

describe('EntityModel', () => {
  // This is not a proper unit test.
  it('Instantiates', () => {
    const model = models['file--file'];
    expect(model).toBeInstanceOf(EntityModel);
    expect(model.type).toEqual('file');
    expect(model.bundle).toEqual('file');
    expect(model.resource).toEqual('file--file');
  });

  it('getFields without aliases', () => {
    expect(classModel.getFields()).toContain('title');
  });

  it('getFields with aliases', () => {
    expect(classModel.getFields(true)).toContain('name');
  });

  it('imports jsonapi', () => {
    const importedData = EntityModel.import(eventData);
    expect(importedData).toBeInstanceOf(Object);
  });

  it('creates a new uuid if not supplied', () => {
    const input = {
      attributes: {}
    };
    const createdModel = EntityModel.create(input);
    expect(typeof createdModel.id).toBe('string');
  });

  it('creates a new model', () => {
    const input = {
      attributes: {
        uuid: '971685e1-fba5-4eee-bd31-96cf54f4fe4e'
      },
      relationships: {
        uid: {
          data: {
            type: 'user--user',
            id: '22620c98-cb92-4823-b44f-7e03c78de503'
          }
        }
      }
    };
    const createdModel = EntityModel.create(input);
    const output = {
      id: '971685e1-fba5-4eee-bd31-96cf54f4fe4e',
      data: input,
      state: {
        saved: false,
        syncing: null,
        error: null,
        dirty: true
      }
    };
    expect(createdModel).toEqual(output);
  });

  it('imports meta data', () => {
    const importedData = EntityModel.import(fileData);
    expect(importedData.type).toEqual('file--file');
    expect(importedData).toBeInstanceOf(Object);
    expect(importedData).toHaveProperty('attributes');
    expect(importedData).toHaveProperty('meta');
  });
});
