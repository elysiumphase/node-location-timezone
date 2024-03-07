import locationTimezone from '../src';

describe('locationTimezone', () => {
  it('should not be undefined', () => {
    expect(locationTimezone).not.toBeUndefined();
  });

  it('should have an expected amount of utility functions', () => {
    const functions = Object.keys(locationTimezone);
    expect(functions.length).toEqual(29);
    functions.forEach((func) => {
      expect(locationTimezone[func]).toEqual(expect.any(Function));
    });
  });
});
