import { func } from '../../../sites/text-tools/tools/splitter/splitter';

describe('splitter', () => {
  it('should return undefined if input is not provided', () => {
    expect(func('', {})).toBeUndefined();
  });

  it('should return undefined if splitter is not provided', () => {
    expect(func('a', { splitterType: 'text' })).toBeUndefined();
    expect(func('a', { splitterType: 'text', splitter: '' })).toBeUndefined();
  });

  it('should return undefined if splitterType is not provided', () => {
    expect(func('a', { splitter: '' })).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(func('a', { splitterType: '', splitter: 'b' })).toBeUndefined();
  });

  it('should return undefined if splitterType is not valid', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(func('a', { splitterType: 'invalid', splitter: 'b' })).toBeUndefined();
  });

  it('should return splitted text when using text splitterType', () => {
    expect(func('a,b,c', { splitter: ',', splitterType: 'text' })).toBe('abc');
    expect(func('a, b,c', { splitter: ',', splitterType: 'text' })).toBe('a bc');
  });

  it('should return splitted text when using regex splitterType', () => {
    expect(
      func('a,b.c', {
        splitterType: 'regex',
        splitter: '/[,.]/',
      }),
    ).toBe('abc');

    expect(
      func('a, b,c', {
        splitterType: 'regex',
        splitter: '/[,.]/',
      }),
    ).toBe('a bc');
  });

  it('should surround each piece with start/end when surroundEachStart/surroundEachEnd is provided', () => {
    expect(
      func('a,b,c', {
        splitter: ',',
        splitterType: 'text',
        surroundEachStart: '<',
      }),
    ).toBe('<a<b<c');

    expect(
      func('a,b,c', {
        splitter: ',',
        splitterType: 'text',
        surroundEachEnd: '>',
      }),
    ).toBe('a>b>c>');

    expect(
      func('a,b,c', {
        splitter: ',',
        splitterType: 'text',
        surroundEachStart: '<',
        surroundEachEnd: '>',
      }),
    ).toBe('<a><b><c>');
  });

  it('should surround text with start/end when surroundStart/surroundEnd is provided', () => {
    expect(
      func('a,b,c', {
        splitter: ',',
        splitterType: 'text',
        surroundStart: '<',
      }),
    ).toBe('<abc');

    expect(
      func('a,b,c', {
        splitter: ',',
        splitterType: 'text',
        surroundEnd: '>',
      }),
    ).toBe('abc>');

    expect(
      func('a,b,c', {
        splitter: ',',
        splitterType: 'text',
        surroundStart: '<',
        surroundEnd: '>',
      }),
    ).toBe('<abc>');
  });

  it('should trim each piece when trimEach is provided', () => {
    expect(
      func('a, b, c', {
        splitter: ',',
        splitterType: 'text',
        trimEach: 'true',
      }),
    ).toBe('abc');

    expect(
      func('a,b, c', {
        splitter: ',',
        splitterType: 'text',
        trimEach: 'true',
        surroundEachStart: '<',
        surroundEachEnd: '>',
      }),
    ).toBe('<a><b><c>');

    expect(
      func('a,b, c', {
        splitter: ',',
        splitterType: 'text',
        trimEach: 'true',
      }),
    ).toBe('abc');
  });
});
