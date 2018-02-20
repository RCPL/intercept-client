import { EntityModel } from './../src/lib/EntityModel';
import models from './../src/models';

describe('models', () => {
  it('provides', () => {
    expect(models).toHaveProperty('node--event');
    expect(models['node--event']).toBeInstanceOf(EntityModel);
  });
});
