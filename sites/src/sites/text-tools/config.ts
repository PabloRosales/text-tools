import { ISiteConfig } from '../../types/ISiteConfig';

const PORT = 8080;
const isDev = process.env.NODE_ENV === 'development';

const CONFIG: ISiteConfig = {
  dev: isDev,
  port: PORT,
  name: 'text-tools',
  singlePage: true,
  appName: 'Text Tools',
  domain: isDev ? `localhost:${PORT}` : 'easytext.com',
};

export default CONFIG;
