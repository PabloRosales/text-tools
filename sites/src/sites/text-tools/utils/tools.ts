import { IToolParamGroup } from '../types/ITool';

export const toolParamsDefaultValues = (groups: IToolParamGroup[]): Record<string, string> => {
  const values: Record<string, string> = {};

  for (const group of groups) {
    for (const param of group.params) {
      values[param.name] = param.default || '';
    }
  }

  return values;
};

export const getRegexFromString = (str: string): RegExp | string => {
  let flags = '';
  let finalRegex = str;

  if (finalRegex.startsWith('/')) {
    finalRegex = str.slice(1);
  }

  if (finalRegex.endsWith('/')) {
    finalRegex = finalRegex.slice(0, -1);
  }

  if (finalRegex.endsWith('/g')) {
    flags += 'g';
    finalRegex = finalRegex.slice(0, -2);
  } else if (finalRegex.endsWith('/i')) {
    flags += 'i';
    finalRegex = finalRegex.slice(0, -2);
  } else if (finalRegex.endsWith('/gi')) {
    flags += 'gi';
    finalRegex = finalRegex.slice(0, -3);
  } else if (finalRegex.endsWith('/ig')) {
    flags += 'ig';
    finalRegex = finalRegex.slice(0, -3);
  }

  if (finalRegex === '') {
    return str;
  }

  let regexp: RegExp | string;
  try {
    regexp = new RegExp(finalRegex, flags);
  } catch (e) {
    console.log('Invalid regex');
    regexp = finalRegex;
  }

  return regexp;
};

export const replaceNewLines = (str: string): string => {
  return str.replace(/\\n/g, '\n');
};
