const { alterVoteMod, getDate } = require('../utils');

// 'Mon Feb 01 2016 02:29:55 GMT+0000'
//'1/2/2016'

describe('utils functions', () => {
  describe('getDate()', () => {
    it('returns a date string', () => {
      expect(getDate('Mon Feb 01 2016 02:29:55 GMT+0000')).toBe('1/2/2016');
    });
    it('throws error if dateObj is not a string', () => {
      const errMsg = 'Only strings please'
      expect(() => getDate(123456)).toThrowError(errMsg);
      expect(() => getDate({ date: 'Mon Feb 01 2016 02:29:55 GMT+0000' })).toThrowError(errMsg);
      expect(() => getDate(null)).toThrowError(errMsg);
    })
  });
  describe('alterVoteMod()', () => {
    it('returns 1 if direction is up and user not yet voted up', () => {
      expect(alterVoteMod(0, 'up')).toBe(1)
    });
    it('returns -1 if direction is down and user not yet voted down', () => {
      expect(alterVoteMod(0, 'down')).toBe(-1)
    });
    it('returns 0 if direction is up and user already voted up', () => {
      expect(alterVoteMod(-1, 'up')).toBe(0)
    });
    it('returns 0 if direction is down and user already voted down', () => {
      expect(alterVoteMod(1, 'down')).toBe(0)
    });
    it('throws error if voteMod is not a number', () => {
      const errMsg = 'Only numbers please'
      expect(() => alterVoteMod('1', 'up')).toThrowError(errMsg);
      expect(() => alterVoteMod(null, 'up')).toThrowError(errMsg);
    })
  });
});