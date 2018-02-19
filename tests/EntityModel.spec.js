import { EntityModel } from './../src/lib/EntityModel';
import classModel from './mocks/classModel';

describe('EntityModel', () => {
  it('instantiates', () => {
    expect(classModel).toBeInstanceOf(EntityModel);
    expect(classModel.type).toEqual('node');
    expect(classModel.bundle).toEqual('classroom');
    expect(classModel.resource).toEqual('node--classroom');
  });

  it('getFields without Aliases', () => {
    expect(classModel.getFields()).toContain('title');
  });

  it('getFields with Aliases', () => {
    expect(classModel.getFields(true)).toContain('name');
  });
});
