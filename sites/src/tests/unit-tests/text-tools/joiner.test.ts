import { func } from '../../../sites/text-tools/tools/joiner/joiner';

describe('joiner', () => {
  it('should return undefined if no input', () => {
    expect(func('', {})).toBeUndefined();
  });

  it('should return undefined if no joinType', () => {
    expect(func('text', { delimiter: ' ' })).toBeUndefined();
  });

  it('should join lines into a single line', () => {
    expect(func('line1\nline2', { joinType: 'line' })).toBe('line1line2');
  });

  it('should join lines into a single line with a delimiter', () => {
    expect(func('line1\nline2', { joinType: 'line', delimiter: '-' })).toBe('line1-line2');
  });

  it('should join lines into a single line with a delimiter and trim', () => {
    expect(func('line1 \n line2', { joinType: 'line', delimiter: '-', trim: 'true' })).toBe('line1-line2');
  });

  it('should join text using a splitter', () => {
    expect(func('a,b,c', { joinType: 'text', splitter: ',' })).toBe('abc');
    expect(func('a, b,c ', { joinType: 'text', splitter: ',', trim: 'true' })).toBe('abc');
  });

  it('should join text using a regex', () => {
    expect(func('a,b.c', { joinType: 'regex', splitter: '/[,.]/' })).toBe('abc');
    expect(func('a. b,c ', { joinType: 'regex', splitter: '/[,.]/', trim: 'true' })).toBe('abc');
    expect(func('a. b,c ', { joinType: 'regex', splitter: '/[,. ]/' })).toBe('abc');
  });

  it('should remove empty pieces', () => {
    expect(func(',a,,b,c,,', { joinType: 'text', splitter: ',', removeEmpty: 'true' })).toBe('abc');
  });
});
