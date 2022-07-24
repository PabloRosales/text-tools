import Checkbox from './Checkbox';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface ItemProps {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

interface Props {
  color: string;
  items: ItemProps[];
}

const Item = ({ color, active, onClick, label }: ItemProps) => {
  return (
    <Menu.Item>
      <div className={`group flex items-center px-4 py-2 text-sm cursor-pointer ${active ? 'font-medium' : ''} ${color}`} onClick={onClick}>
        <Checkbox checked={active} label={label} />
      </div>
    </Menu.Item>
  );
};

const DropdownCheckboxes = ({ items, color }: Props) => {
  return (
    <div className="w-56">
      <Menu as="div" className="relative inline-block text-left z-20 w-full">
        <div>
          <Menu.Button
            className={`flex items-center justify-left w-full rounded-md border shadow-sm px-4 pb-1 pt-1.5 ${color} text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            <div className="flex-grow text-left capitalize">
              <i className={`text-white fa-solid fa-eye fa-lg mr-3`} />
              Show Keyword Data
            </div>
            <div>
              <i className="fa-solid fa-chevron-down" />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            <div className="py-1">
              {items.map((item, i) => {
                return <Item label={item.label} color={item.color} active={item.active} onClick={item.onClick} />;
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownCheckboxes;
