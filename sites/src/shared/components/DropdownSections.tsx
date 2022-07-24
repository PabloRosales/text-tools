import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '@headlessui/react/dist/utils/class-names';

interface Item {
  name: string;
  icon: string;
  label: string;
  setSelected: () => void;
}

interface Props {
  color: string;
  items: Item[];
  selected: string;
  colorItem: string;
  colorDropdown: string;
  colorItemSelected: string;
}

const DropdownSections = ({ colorDropdown, color, items, selected, colorItem, colorItemSelected }: Props) => {
  const current = items.find((item) => item.name === selected);

  if (!current) {
    return null;
  }

  return (
    <div className="w-full select-none">
      <Menu as="div" className="relative inline-block text-left z-20 w-full">
        <div>
          <Menu.Button
            className={`flex items-center justify-left w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium ${color} focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            <div className="flex-grow text-left capitalize">
              <i className={`${current.icon} fa-lg mr-3`} />
              {current.label}
            </div>
            <div>
              <i className="fa-solid fa-chevron-down ml-2" />
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
          <Menu.Items
            className={`origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg ${colorDropdown} ring-1 ring-opacity-5 divide-y focus:outline-none`}
          >
            <div className="py-1">
              {items.map((item, i) => {
                return (
                  <Menu.Item key={`${item.name}-${i}`}>
                    <div
                      className={classNames(
                        item.name === selected ? colorItemSelected : colorItem,
                        'group flex items-center px-4 py-2 text-sm cursor-pointer',
                      )}
                      onClick={item.setSelected}
                    >
                      <i className={`${item.icon} pr-2`} />
                      {item.label}
                    </div>
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownSections;
