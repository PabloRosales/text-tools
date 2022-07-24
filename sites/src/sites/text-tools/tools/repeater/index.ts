import { IToolWithOptions } from '../../types/ITool';

export type RepeaterOptions = 'times' | 'delimiter' | 'surroundStart' | 'surroundEnd' | 'surroundEachStart' | 'surroundEachEnd';

export type RepeaterParams = { [key in RepeaterOptions]?: string };

export const Repeater: IToolWithOptions<RepeaterOptions, string, RepeaterParams> = {
  type: 'convert',
  category: 'text',
  slug: 'repeater',
  name: 'Repeat Text',
  processorType: 'function',
  icon: 'fa-solid fa-repeat',
  func: () => import('./repeater'),
  description: 'Repeat text a number of times',
  introduction: 'Repeat text a number of times',
  paramGroups: [
    {
      title: 'Repeater Options',
      params: [
        {
          min: 1,
          default: '1',
          name: 'times',
          type: 'number',
          label: 'Times',
          placeholder: 'Times to repeat',
          help: 'How many times to repeat the text',
        },
        {
          type: 'input',
          name: 'delimiter',
          label: 'Delimiter',
          placeholder: 'Your delimiter',
          help: 'The delimiter to use between each repetition',
        },
      ],
    },
    {
      title: 'Surround Options',
      params: [
        {
          type: 'input',
          optional: true,
          name: 'surroundEachStart',
          label: 'Start each repetition with',
          placeholder: 'Start for repetition',
          help: 'The text to start each repetition with',
        },
        {
          type: 'input',
          optional: true,
          name: 'surroundEachEnd',
          label: 'End each repetition with',
          placeholder: 'End for each repetition',
          help: 'The text to end each repetition with',
        },
      ],
    },
    {
      title: 'Output Options',
      params: [
        {
          type: 'input',
          optional: true,
          name: 'surroundStart',
          label: 'Start output with',
          placeholder: 'Start output with',
          help: 'Text to include at the beginning of the output',
        },
        {
          type: 'input',
          optional: true,
          name: 'surroundEnd',
          label: 'End output with',
          placeholder: 'End output with',
          help: 'Text to include at the end of the output',
        },
      ],
    },
  ],
};
