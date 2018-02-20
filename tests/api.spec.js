import { ApiManager } from './../src/lib/ApiManager';
import api from './../src/api';

describe('api', () => {
  it('provides', () => {
    expect(api).toHaveProperty('node--event');
    expect(api['node--event']).toBeInstanceOf(ApiManager);
  });
});
