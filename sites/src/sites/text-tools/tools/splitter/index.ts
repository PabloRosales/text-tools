import { IToolWithOptions } from '../../types/ITool';

export type SplitterOptionsType = 'text' | 'regex';

export type SplitterOptions =
  | 'splitter'
  | 'trimEach'
  | 'separator'
  | 'surroundEnd'
  | 'splitterType'
  | 'surroundStart'
  | 'surroundEachEnd'
  | 'surroundEachStart';

export type SplitterParams = { [key in SplitterOptions]?: string } & {
  trimEach?: 'true';
  splitterType?: SplitterOptionsType;
};

export const Splitter: IToolWithOptions<SplitterOptions, SplitterOptionsType, SplitterParams> = {
  type: 'convert',
  slug: 'splitter',
  category: 'text',
  name: 'Split Text',
  processorType: 'function',
  icon: 'fa-solid fa-split',
  func: () => import('./splitter'),
  description: 'Split text into pieces',
  introduction: 'Split text into chunks',
  paramGroups: [
    {
      title: 'Split Options',
      params: [
        {
          type: 'radio',
          default: 'text',
          htmlName: 'symbol',
          name: 'splitterType',
          options: [
            {
              value: 'text',
              label: 'Use text for splitting',
              help: 'A character or text to split the text into parts',
            },
            {
              value: 'regex',
              label: 'Use regex for splitting',
              help: 'A regular expression to split the text into parts',
            },
          ],
        },
        {
          default: ',',
          type: 'input',
          name: 'splitter',
          label: 'Splitter',
          placeholder: 'Enter the splitter',
          help: 'The text or regex that we will use to split the text into chunks',
        },
      ],
    },
    {
      title: 'Quote Each',
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
      title: 'Separator Options',
      params: [
        {
          type: 'input',
          default: '\\n',
          optional: true,
          name: 'separator',
          label: 'Separator',
          placeholder: 'Enter a separator',
          help: 'The separator that we will used between each split chunk',
        },
      ],
    },
    {
      title: 'Trim Each',
      params: [
        {
          optional: true,
          default: 'true',
          type: 'checkbox',
          name: 'trimEach',
          label: 'Trim each piece',
          help: 'Trim each piece of text before adding it to the final result',
        },
      ],
    },
    {
      title: 'Surround Output',
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
