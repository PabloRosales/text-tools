import React from 'react';
import Tools from '../tools';
import CONFIG from '../config';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { uniq } from 'lodash';
import { IToolCategory } from '../types/ITool';

const Homepage = () => {
  const [category, setCategory] = React.useState<IToolCategory | undefined>(undefined);
  const categories = uniq(Tools.map((tool) => tool.category));

  return (
    <div>
      <Helmet>
        <title>{CONFIG.appName}</title>
      </Helmet>
      <div className="relative mx-auto flex max-w-8xl justify-center mt-10 mb-10">
        <div className="min-w-0 max-w-5xl flex-auto">
          <h1 className="text-center text-3xl text-sky-600 dark:text-sky-300 font-bold">{CONFIG.appName}</h1>
          <p className="text-center text-slate-800 dark:text-slate-100 mt-2">
            A collection of useful text processing utilities.
            <br />
            All tools are easy to use, chainable and free.
          </p>
          <div className="flex justify-center mt-10">
            <div className="w-full lg:w-9/12">
              {categories.length > 1 && (
                <div className="mt-3 flex items-center justify-center">
                  {categories.map((cat, i) => (
                    <div
                      key={`${cat}-${i}`}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-lg cursor-pointer mr-2 capitalize text-sm"
                      onClick={() => {
                        if (category === cat) {
                          setCategory(undefined);
                        } else {
                          setCategory(cat);
                        }
                      }}
                    >
                      <i className="fa-solid fa-filters pr-2" />
                      Tools for {cat}
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 items-center justify-center mt-4">
                {Tools.map((tool, i) => {
                  return (
                    <Link key={`${tool.slug}-${i}`} to={`/tool/${tool.slug}`}>
                      <div className="group rounded shadow-md border border-sky-600 cursor-pointer overflow-hidden select-none">
                        <div className="px-3 py-2 bg-sky-700 group-hover:bg-sky-600 border-b border-sky-600 group-hover:border-sky-800 text-white font-medium text-base">
                          <div className="flex items-center">
                            <div className="flex-grow">
                              <i className={`${tool.icon} fa-sm pr-2`} />
                              {tool.name}
                            </div>
                            <div className="text-white">
                              <i className="fa-solid fa-chevron-right" />
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-2 bg-sky-600 group-hover:bg-sky-700 text-white text-sm">{tool.introduction}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
