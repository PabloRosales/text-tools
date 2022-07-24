import React from 'react';
import CONFIG from '../config';
import Tool from '../views/Tool';
import About from '../views/About';
import { RecoilRoot } from 'recoil';
import Nav, { INavItem } from './Nav';
import Homepage from '../views/Homepage';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const NAV: INavItem[] = [
  {
    href: '/',
    name: CONFIG.appName,
    className: 'font-bold text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200',
  },
  {
    name: 'About',
    href: '/about',
  },
];

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/tool/:tool" element={<Tool />} />
    </Routes>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <RecoilRoot>
            <div>
              <Nav
                items={NAV}
                colors="bg-slate-100 dark:bg-slate-800 border-b border-sky-300 dark:border-sky-800"
                itemColors="text-slate-800 dark:text-slate-50 hover:text-slate-900 dark:hover:text-slate-100 hover:font-medium"
              />
              <Router />
            </div>
          </RecoilRoot>
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
