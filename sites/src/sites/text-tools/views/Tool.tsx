import React from 'react';
import Tools from '../tools';
import Machine from '../components/Machine';
import { useParams } from 'react-router-dom';

const Tool = () => {
  const { tool: slugParam } = useParams<{ tool: string }>();

  return (
    <div className="relative mx-auto flex max-w-8xl justify-center mt-5 mb-10">
      <div className="min-w-0 max-w-6xl flex-auto">{slugParam && <Machine slug={slugParam} tools={Tools} />}</div>
    </div>
  );
};

export default Tool;
