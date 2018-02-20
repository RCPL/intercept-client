import interceptClient from './../src/index';

describe('module', () => {
  it('Module exports object', () => {
    expect(interceptClient).toBeInstanceOf(Object);
    expect(interceptClient).toHaveProperty('constants');
    expect(interceptClient).toHaveProperty('actions');
    expect(interceptClient).toHaveProperty('reducer');
    expect(interceptClient).toHaveProperty('api');
    expect(interceptClient).toHaveProperty('models');
  });
});
