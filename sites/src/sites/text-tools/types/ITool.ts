export type IToolType = 'convert';
export type IToolCategory = 'text' | 'csv';
export type IToolProcessorType = 'function' | 'remote';

export type IToolFunc<P> = (input: string, params: P) => string | undefined;

export interface IToolModule<P> {
  func: IToolFunc<P>;
}

export interface IToolParamOption {
  label: string;
  help?: string;
  value: string;
}

export interface IToolParam {
  name: string;
  min?: number;
  max?: number;
  help?: string;
  label?: string;
  value?: string;
  default?: string;
  htmlName?: string;
  optional?: boolean;
  placeholder?: string;
  options?: IToolParamOption[];
  type: 'input' | 'textarea' | 'number' | 'radio' | 'checkbox' | 'select';
}

export interface IToolParamGroup {
  title: string;
  help?: string;
  params: IToolParam[];
}

export interface ITool {
  icon: string;
  slug: string;
  name: string;
  type: IToolType;
  debounce?: number;
  description?: string;
  introduction?: string;
  category: IToolCategory;
  paramGroups: IToolParamGroup[];
  processorType: IToolProcessorType;
  func: () => Promise<IToolModule<any>>;
}

export type IToolWithOptions<T, R, P> = ITool & {
  func: () => Promise<IToolModule<P>>;
  paramGroups: Array<{ params: Array<IToolParam & { name: T; options?: Array<IToolParamOption & { value?: R }>; value?: R }> }>;
};
