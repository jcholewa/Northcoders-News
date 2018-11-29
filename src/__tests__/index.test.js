const { alterVoteMod, getDate } = require('../utils');

// 'Mon Feb 01 2016 02:29:55 GMT+0000'
//'1/2/2016'

describe('utils functions', () => {
  describe('getDate()', () => {
    it('returns a date string', () => {
      expect(getDate('Mon Feb 01 2016 02:29:55 GMT+0000')).toBe('1/2/2016');
    });
    it('throws error if dateObj is not a string', () => {
      const errMsg = 'Only numbers please'
      expect(() => getDate(123456)).toThrowError(errMsg);
      expect(() => getDate({ date: 'Mon Feb 01 2016 02:29:55 GMT+0000' })).toThrowError(errMsg);
      expect(() => getDate(null)).toThrowError(errMsg);
    })
  });
  describe('alterVoteMod()', () => {
    it('returns x', () => {

    });
  });
});