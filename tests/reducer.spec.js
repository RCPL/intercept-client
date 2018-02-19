import reducer from './../src/reducer';

describe('reducer', () => {
  it('Reducer contains resource reducers', () => {
    expect(reducer).toHaveProperty('node--event');
  });
});
