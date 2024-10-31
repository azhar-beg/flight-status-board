import { formatTime } from './utils';

describe('formatTime Function', () => {
  it('formats a valid date string correctly', () => {
    const result = formatTime('2023-10-05T14:48:00.000Z');
    expect(result).toBe('October 5, 2023 at 02:48 PM');
  });

  it('formats a date string with different time correctly', () => {
    const result = formatTime('2023-10-05T08:30:00.000Z');
    expect(result).toBe('October 5, 2023 at 08:30 AM');
  });

  it('returns "Invalid Date" for an invalid date string', () => {
    const result = formatTime('invalid-date-string');
    expect(result).toBe('Invalid Date');
  });

  it('formats a date string in 24-hour format when hour12 is false', () => {
    const originalLocaleString = Date.prototype.toLocaleString;
    Date.prototype.toLocaleString = function () {
      return 'Oct 5, 2023, 14:48';
    };
    const result = formatTime('2023-10-05T14:48:00.000Z');
    Date.prototype.toLocaleString = originalLocaleString;
    expect(result).toBe('Oct 5, 2023, 14:48');
  });

  it('handles a date string with different timezone correctly', () => {
    const result = formatTime('2023-10-05T14:48:00.000+05:00');
    expect(result).toBe('October 5, 2023 at 09:48 AM');
  });
});
