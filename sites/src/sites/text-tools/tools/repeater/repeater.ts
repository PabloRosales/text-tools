import { RepeaterParams } from './index';
import { replaceNewLines } from '../../utils/tools';

export const func = (input: string, params: RepeaterParams): string | undefined => {
  const times = params.times;
  const delimiter = params.delimiter;
  const surroundEnd = params.surroundEnd;
  const surroundStart = params.surroundStart;
  const surroundEachEnd = params.surroundEachEnd;
  const surroundEachStart = params.surroundEachStart;

  if (input && times) {
    const timesInt = parseInt(times, 10);

    if (timesInt > 0) {
      const textRepeated: string[] = [];
      for (let i = 0; i < timesInt; i++) {
        if (surroundEachStart && surroundEachEnd) {
          textRepeated.push(`${surroundEachStart}${input}${surroundEachEnd}`);
        } else if (surroundEachStart) {
          textRepeated.push(`${surroundEachStart}${input}`);
        } else if (surroundEachEnd) {
          textRepeated.push(`${input}${surroundEachEnd}`);
        } else {
          textRepeated.push(input);
        }
      }

      let finalText: string;

      if (delimiter) {
        finalText = textRepeated.join(delimiter);
      } else {
        finalText = textRepeated.join('');
      }

      if (delimiter && delimiter.includes('\\n')) {
        finalText = replaceNewLines(finalText);
      }

      if (surroundStart) {
        finalText = `${surroundStart}${finalText}`;
      }

      if (surroundEnd) {
        finalText = `${finalText}${surroundEnd}`;
      }

      return finalText;
    }
  }

  return undefined;
};
