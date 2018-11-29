const { alterVoteMod, getDate } = require('../utils');

describe('utils functions', () => {
  describe('getDate()', () => {
    it('returns a string', () => {
      expect(getDate('Mon Feb 01 2016 02:29:55 GMT+0000')).toBe('1/2/2016');
    });
  });
  describe('alterVoteMod()', () => {
    it('returns x', () => {

    });
  });
});