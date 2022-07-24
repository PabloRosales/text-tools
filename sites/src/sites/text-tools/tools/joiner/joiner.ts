import { JoinerParams } from './index';
import { getRegexFromString } from '../../utils/tools';

export const func = (input: string, params: JoinerParams): string | undefined => {
  const trim = params.trim;
  const joinType = params.joinType;
  const splitter = params.splitter;
  const delimiter = params.delimiter;
  const removeEmpty = params.removeEmpty;

  if (input && joinType) {
    let parts: string[] = [];

    if (joinType === 'line') {
      parts = input.split('\n');
    } else if (joinType === 'text' && splitter) {
      parts = input.split(splitter);
    } else if (joinType === 'regex' && splitter) {
      parts = input.split(getRegexFromString(splitter));
    }

    if (trim) {
      parts = parts.map((part) => part.trim());
    }

    if (removeEmpty) {
      parts = parts.filter((part) => part.trim().length > 0);
    }

    return parts.join(delimiter || '');
  }

  return undefined;
};
