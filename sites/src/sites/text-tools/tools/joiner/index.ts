import { IToolWithOptions } from '../../types/ITool';
export type JoinerOptionsJoinType = 'line' | 'text' | 'regex';
export type JoinerOptions = 'delimiter' | 'joinType' | 'splitter' | 'removeEmpty' | 'trim';

export type JoinerParams = { [key in JoinerOptions]?: string } & {
  trim?: 'true';
  removeEmpty?: 'true';
  joinType?: JoinerOptionsJoinType;
};

export const Joiner: IToolWithOptions<JoinerOptions, JoinerOptionsJoinType, JoinerParams> = {
  type: 'convert',
  slug: 'joiner',
  category: 'text',
  name: 'Join Text',
  processorType: 'function',
  icon: 'fa-solid fa-puzzle',
  func: () => import('./joiner'),
  description: 'Join text pieces',
  introduction: 'Merge text using a delimiter',
  paramGroups: [
    {
      title: 'Join Type',
      params: [
        {
          type: 'radio',
          default: 'line',
          name: 'joinType',
          htmlName: 'joinType',
          options: [
            {
              value: 'line',
              label: 'Join lines',
              help: 'Join each line with the delimiter',
            },
            {
              value: 'text',
              label: 'Join by using a text splitter',
              help: 'Join each piece by splitting first with text',
            },
            {
              value: 'regex',
              label: 'Join by using regex',
              help: 'Join each piece by splitting first with regex',
            },
          ],
        },
        {
          type: 'input',
          optional: true,
          name: 'splitter',
          label: 'Splitter',
          placeholder: 'Splitter or Regex',
          help: 'Text or regex to use to separate each piece and then join',
        },
      ],
    },
    {
      title: 'Merge Options',
      params: [
        {
          type: 'input',
          optional: true,
          name: 'delimiter',
          label: 'Delimiter',
          placeholder: 'Delimiter',
          help: 'The delimiter used to join each piece',
        },
      ],
    },
    {
      title: 'Output Options',
      params: [
        {
          type: 'checkbox',
          name: 'removeEmpty',
          label: 'Remove empty pieces',
          help: 'Remove empty pieces, like blank lines',
        },
        {
          name: 'trim',
          type: 'checkbox',
          label: 'Trim each piece',
          help: 'Trim each piece of text before adding it to the final result',
        },
      ],
    },
  ],
};
