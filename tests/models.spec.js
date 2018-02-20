import { EntityModel } from './../src/util/EntityModel';
import models from './../src/models';

describe('models', () => {
  it('provides', () => {
    expect(models).toHaveProperty('node--event');
    expect(models['node--event']).toBeInstanceOf(EntityModel);
  });
});
