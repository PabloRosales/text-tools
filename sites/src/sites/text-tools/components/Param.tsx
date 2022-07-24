import React, { Fragment } from 'react';
import { IToolParam } from '../types/ITool';

interface Props {
  chainId: number;
  param: IToolParam;
  onChange: (s: string) => void;
}

const Param = ({ param, onChange, chainId }: Props) => {
  const name = `${chainId}-${param.name}`;

  return (
    <div>
      {param.type === 'radio' && (
        <Fragment>
          {param.options?.map((option) => (
            <div key={`${name}-${option.value}`} className="mb-2">
              <div className="flex items-center">
                <input
                  name={name}
                  type="radio"
                  id={option.value}
                  value={option.value}
                  onChange={(e) => onChange(e.target.value)}
                  defaultChecked={param.default === option.value}
                  className="focus:ring-sky-500 dark:focus:ring-sky-800 h-4 w-4 text-sky-600 dark:text-slate-800 border-sky-500 dark:border-slate-700 dark:bg-slate-900"
                />
                <label htmlFor={option.value} className="ml-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  {option.label}
                </label>
              </div>
              {option.help && <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line">{option.help}</div>}
            </div>
          ))}
        </Fragment>
      )}
      {param.type === 'checkbox' && (
        <div key={`${name}-${param.value}`} className="mb-2">
          <div className="flex items-center">
            <input
              id={name}
              name={name}
              value="true"
              type="checkbox"
              defaultChecked={param.default === 'true'}
              onChange={(e) => onChange(e.target.checked ? 'true' : '')}
              className="focus:ring-sky-500 dark:focus:ring-sky-800 h-4 w-4 text-sky-600 dark:text-slate-800 border-sky-500 dark:border-slate-700 dark:bg-slate-900"
            />
            <label htmlFor={name} className="ml-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {param.label}
            </label>
          </div>
          {param.help && <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line">{param.help}</div>}
        </div>
      )}
      {param.type === 'input' && (
        <Fragment>
          {param.label && (
            <label htmlFor={name} className="block text-b font-medium text-slate-700 dark:text-slate-200 mb-0.5 flex items-center">
              {param.label} {param.optional && <span className="text-sm text-slate-500 dark:text-slate-400 pl-1">optional</span>}
            </label>
          )}
          <input
            id={name}
            type="text"
            spellCheck={false}
            defaultValue={param.default}
            placeholder={param.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full shadow-sm dark:placeholder-slate-400 dark:text-slate-200 dark:bg-slate-800 focus:ring-sky-500 focus:border-sky-500 block sm:text-sm border-slate-300 dark:border-slate-500 rounded-md"
          />
          {param.help && <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line">{param.help}</div>}
        </Fragment>
      )}
      {param.type === 'textarea' && (
        <textarea
          rows={12}
          spellCheck={false}
          placeholder={param.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-lg shadow-sm block focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-slate-300 rounded-md"
        />
      )}
      {param.type === 'number' && (
        <Fragment>
          {param.label && (
            <label htmlFor={name} className="block text-b font-medium text-slate-700 dark:text-slate-200 mb-0.5 flex items-center">
              {param.label} {param.optional && <span className="text-sm text-slate-500 dark:text-slate-400 pl-1">optional</span>}
            </label>
          )}
          <input
            type="number"
            min={param.min}
            defaultValue={param.default}
            placeholder={param.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full shadow-sm dark:placeholder-slate-400 dark:text-slate-200 dark:bg-slate-800 focus:ring-sky-500 focus:border-sky-500 block sm:text-sm border-slate-300 dark:border-slate-500 rounded-md"
          />
          {param.help && <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line">{param.help}</div>}
        </Fragment>
      )}
    </div>
  );
};

export default Param;
