import { SplitterParams } from './index';
import { getRegexFromString, replaceNewLines } from '../../utils/tools';

export const func = (input: string, params: SplitterParams): string | undefined => {
  const splitter = params.splitter;
  const separator = params.separator;
  const surroundEnd = params.surroundEnd;
  const splitterType = params.splitterType;
  const surroundStart = params.surroundStart;
  const trimEach = params.trimEach === 'true';
  const surroundEachEnd = params.surroundEachEnd;
  const surroundEachStart = params.surroundEachStart;

  if (input && splitter && splitterType) {
    let splitted: string[];

    if (splitterType === 'regex') {
      splitted = input.split(getRegexFromString(splitter));
    } else if (splitterType === 'text') {
      splitted = input.split(splitter);
    } else {
      return undefined;
    }

    if (trimEach) {
      splitted = splitted.map((item) => item.trim());
    }

    if (surroundEachStart && surroundEachEnd) {
      splitted = splitted.map((item) => `${surroundEachStart}${item}${surroundEachEnd}`);
    } else if (surroundEachStart) {
      splitted = splitted.map((item) => `${surroundEachStart}${item}`);
    } else if (surroundEachEnd) {
      splitted = splitted.map((item) => `${item}${surroundEachEnd}`);
    }

    let final = replaceNewLines(splitted.join(separator || ''));

    if (surroundStart) {
      final = `${surroundStart}${final}`;
    }

    if (surroundEnd) {
      final = `${final}${surroundEnd}`;
    }

    return final;
  }

  return undefined;
};
