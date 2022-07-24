import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import React, { useEffect, useRef } from 'react';
import { AtomSettings } from '../atoms/AtomSettings';

export interface INavItem {
  name: string;
  href: string;
  className?: string;
}

interface Props {
  colors?: string;
  items: INavItem[];
  itemColors?: string;
}

const Nav = ({ items, colors, itemColors }: Props) => {
  const firstLoad = useRef(false);
  const [settings, setSettings] = useRecoilState(AtomSettings);

  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = true;
      return;
    }

    const root = document.getElementsByTagName('html')?.[0];
    if (settings.darkMode) {
      root.classList.toggle('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <nav className={`py-4 ${colors} select-none`}>
      <ul className="flex items-center justify-center">
        {items.map((item, index) => (
          <li key={index} className={`mr-6 ${itemColors}`}>
            <Link to={item.href} className={item.className}>
              {item.name}
            </Link>
          </li>
        ))}
        <li
          className={`${itemColors}`}
          onClick={() => {
            setSettings({ ...settings, darkMode: !settings.darkMode });
          }}
        >
          <span className={`${settings.darkMode ? 'text-slate-50' : 'text-slate-600'} text-sm cursor-pointer`}>
            <i className={`fa-solid fa-toggle-${settings.darkMode ? 'on' : 'off'} pr-1`} /> Dark Mode
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
