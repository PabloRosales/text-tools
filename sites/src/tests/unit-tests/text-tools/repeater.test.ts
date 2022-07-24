import { func } from '../../../sites/text-tools/tools/repeater/repeater';

describe('repeater', () => {
  it('should return undefined if input is not provided', () => {
    expect(func('', {})).toBeUndefined();
  });

  it('should return undefined if times is not provided', () => {
    expect(func('a', {})).toBeUndefined();
    expect(func('a', { times: '' })).toBeUndefined();
  });

  it('should return undefined if times is not a number', () => {
    expect(func('a', { times: 'a' })).toBeUndefined();
  });

  it('should return undefined if times is not a positive number', () => {
    expect(func('a', { times: '-1' })).toBeUndefined();
  });

  it('should return the text repeated the number of times', () => {
    expect(func('a', { times: '2' })).toBe('aa');
  });

  it('should return the text repeated the number of times, with delimiter', () => {
    expect(func('a', { times: '2', delimiter: 'b' })).toBe('aba');
  });

  it('should return the text repeated the number of times, with new lines if delimiter is new line', () => {
    expect(func('a', { times: '2', delimiter: '\\n' })).toBe('a\na');

    expect(func('a', { times: '2', delimiter: '\\n\\n' })).toBe('a\n\na');
  });

  it('should surround repetitions with surround start/end', () => {
    expect(
      func('a', {
        times: '2',
        delimiter: ',',
        surroundEachStart: '[',
      }),
    ).toBe('[a,[a');

    expect(
      func('a', {
        times: '2',
        delimiter: ',',
        surroundEachEnd: ']',
      }),
    ).toBe('a],a]');

    expect(
      func('a', {
        times: '2',
        delimiter: ',',
        surroundEachEnd: ']',
        surroundEachStart: '[',
      }),
    ).toBe('[a],[a]');
  });

  it('should prepend and append text', () => {
    expect(
      func('a', {
        times: '2',
        delimiter: ',',
        surroundStart: '[',
      }),
    ).toBe('[a,a');

    expect(
      func('a', {
        times: '2',
        delimiter: ',',
        surroundEnd: ']',
      }),
    ).toBe('a,a]');

    expect(
      func('a', {
        times: '2',
        delimiter: ',',
        surroundStart: '[',
        surroundEnd: ']',
      }),
    ).toBe('[a,a]');
  });
});
