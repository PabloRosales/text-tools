import Param from './Param';
import { ITool } from '../types/ITool';
import { toolParamsDefaultValues } from '../utils/tools';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  slug: string;
  tools: ITool[];
}

const Machine = ({ slug, tools }: Props) => {
  const firstRun = useRef(true);
  const [searchTool, setSearchTool] = useState('');
  const [inputs, setInputs] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [slugs, setSlugs] = useState<string[]>([slug]);
  const [values, setValues] = useState<Array<Record<string, string>>>([]);

  const updateNext = useCallback(
    async (chainIndex: number, sls: string[], ins: string[], res: string[], vals: Array<Record<string, string>>) => {
      const newInputs = [...ins];
      const newResults = [...res];
      let currentInput = newInputs[chainIndex];

      for (let i = 0; i < sls.length; i++) {
        if (i >= chainIndex) {
          const _tool = tools.find((t) => t.slug === sls[i]);
          if (_tool) {
            const module = await _tool.func();
            if (module && vals[i] !== undefined) {
              const value = module.func(currentInput, vals[i]);
              if (value) {
                currentInput = value;
                newResults[i] = value;
                if (newInputs[i + 1] !== undefined) {
                  newInputs[i + 1] = value;
                }
              }
            }
          }
        }
      }

      setSlugs(sls);
      setValues(vals);
      setInputs(newInputs);
      setResults(newResults);
    },
    [tools],
  );

  useEffect(() => {
    if (!firstRun.current) {
      return;
    }

    firstRun.current = false;

    if (slugs.length > 0) {
      let i = 0;
      const newInputs: string[] = [];
      const newResults: string[] = [];
      const newValues: Array<Record<string, string>> = [];

      for (const _slug of slugs) {
        const _tool = tools.find((t) => t.slug === _slug);
        if (_tool) {
          newInputs[i] = '';
          newResults[i] = '';
          newValues[i] = toolParamsDefaultValues(_tool.paramGroups);
        }
        i++;
      }

      setInputs(newInputs);
      setValues(newValues);
      setResults(newResults);
    }
  }, [slugs, tools, updateNext]);

  const toolFilters = tools.filter((tool) => tool.name.toLowerCase().includes(searchTool));

  return (
    <Fragment>
      {slugs.map((currentSlug, chainIndex) => {
        const chainTool = tools.find((tool) => tool.slug === currentSlug);

        if (!chainTool) {
          return null;
        }

        let gridSize = 3;
        if (chainTool.paramGroups.length === 2) {
          gridSize = 2;
        }

        return (
          <div key={`chain-${chainIndex}`}>
            {slugs.length > 1 && chainIndex !== 0 && (
              <div className="bg-slate-200 dark:bg-slate-800 text-sky-700 dark:text-sky-500 px-4 py-2 rounded text-xl font-medium mb-1 select-none mt-3 mb-3 flex items-center">
                <div className="flex-grow">
                  <i className="fa-solid fa-arrow-down mr-2" />
                  Chained
                </div>
                <div
                  className="text-red-700 hover:text-red-600 cursor-pointer"
                  onClick={async () => {
                    const newSlugs = [...slugs];
                    const newInputs = [...inputs];
                    const newValues = [...values];
                    const newResults = [...results];
                    newSlugs.splice(chainIndex, 1);
                    newInputs.splice(chainIndex, 1);
                    newValues.splice(chainIndex, 1);
                    newResults.splice(chainIndex, 1);
                    await updateNext(chainIndex - 1, newSlugs, newInputs, newResults, newValues);
                  }}
                >
                  <i className="fa-solid fa-times" />
                </div>
              </div>
            )}
            <div className="flex items-center">
              <div>
                <h1 className="text-3xl text-slate-600 dark:text-slate-200 font-bold">{chainTool.name}</h1>
                <p className=" text-slate-800 dark:text-slate-100 mt-2">{chainTool.description}</p>
              </div>
              <div className="flex-grow flex justify-end">
                <img alt="ad" src="https://via.placeholder.com/728x90/181818/FFFFFF.png?text=Ads" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <textarea
                  rows={10}
                  spellCheck={false}
                  placeholder="Input"
                  value={chainIndex !== 0 ? inputs[chainIndex] : undefined}
                  className="w-full h-full shadow-sm block dark:bg-slate-700 dark:text-slate-50 dark:placeholder-slate-400 focus:ring-sky-500 dark:focus:ring-sky-500 focus:border-sky-100 sm:text-sm border border-slate-300 dark:border-slate-500 rounded-md"
                  onChange={async (e) => {
                    const newInputs = [...inputs];
                    newInputs[chainIndex] = e.target.value;
                    await updateNext(chainIndex, slugs, newInputs, results, values);
                  }}
                />
              </div>
              <div>
                <div className="h-full">
                  <textarea
                    readOnly
                    rows={10}
                    spellCheck={false}
                    placeholder="Output"
                    value={results[chainIndex] || ''}
                    className="w-full h-full shadow-sm block bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 focus:ring-sky-500 dark:focus:ring-sky-500 focus:border-sky-100 sm:text-sm border border-slate-300 dark:border-slate-500 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              {chainTool && chainTool.paramGroups ? (
                <div
                  className={`grid ${gridSize === 1 && 'grid-cols-1'} ${gridSize === 2 && 'grid-cols-2'} ${
                    gridSize === 3 && 'grid-cols-3'
                  } gap-3 mt-3 px-2 py-2 bg-slate-300 dark:bg-slate-600 rounded`}
                >
                  {chainTool.paramGroups.map((group, i) => {
                    return (
                      <div
                        key={`${group.title}-${i}`}
                        className="border-b border-slate-300 dark:border-slate-500 bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded select-none"
                      >
                        <div className="text-lg text-sky-700 dark:text-sky-300 font-medium mb-2">{group.title}</div>
                        <div>
                          {group.params.map((param) => {
                            return (
                              <div key={`${chainTool.slug}-${param.name}`} className="mb-2">
                                <Param
                                  chainId={chainIndex}
                                  param={{
                                    ...param,
                                    default: values[chainIndex]?.[param.name] || param.default,
                                  }}
                                  onChange={async (s) => {
                                    const newValues = [...values];
                                    newValues[chainIndex][param.name] = s;
                                    await updateNext(chainIndex, slugs, inputs, results, newValues);
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : undefined}
            </div>
            <div>
              {chainIndex === slugs.length - 1 ? (
                <div>
                  <div className="bg-slate-200 dark:bg-slate-700 text-sky-700 dark:text-sky-400 px-4 py-2 rounded text-xl font-medium mb-1 select-none mt-3 mb-3 flex items-center">
                    <div>
                      <i className="fa-solid fa-link mr-2" />
                      Chain with...
                    </div>
                    <div className="flex-grow">
                      <div className="px-3">
                        <input
                          type="text"
                          placeholder="Search tool to chain with"
                          className="w-full shadow-sm dark:placeholder-slate-400 dark:text-slate-200 dark:bg-slate-800 focus:ring-sky-500 focus:border-sky-500 block sm:text-sm border-slate-300 dark:border-slate-500 rounded-md"
                          onChange={(e) => {
                            setSearchTool(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <i className="fa-solid fa-plus text-sky-700 dark:text-sky-400" />
                    </div>
                  </div>
                  <div>
                    {searchTool !== '' && (
                      <div
                        className={`px-3 pt-3 bg-slate-300 dark:bg-slate-700 ${toolFilters.length > 0 ? 'h-[250px] overflow-y-auto' : ''}`}
                      >
                        {toolFilters.length === 0 && (
                          <div className="text-slate-700 dark:text-slate-200 pb-3 pl-1 font-medium">No tool found</div>
                        )}
                        {toolFilters.map((tool) => {
                          return (
                            <div
                              key={tool.slug}
                              className="px-2 py-1 mb-1.5 bg-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-100 flex items-center cursor-pointer"
                              onClick={async () => {
                                const newValues = [...values];
                                const v = toolParamsDefaultValues(tool.paramGroups);
                                newValues.push(v);
                                await updateNext(chainIndex, [...slugs, tool.slug], [...inputs, ''], [...results, ''], newValues);
                                setSearchTool('');
                              }}
                            >
                              <span>{tool.name}</span>
                              <span className="text-slate-600 dark:text-slate-400 text-sm pl-2">{tool.introduction}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : undefined}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Machine;
