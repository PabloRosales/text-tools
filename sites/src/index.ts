import cors from 'cors';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { existsSync, readFileSync } from 'fs';
import { ISiteConfig } from './types/ISiteConfig';
import CONFIG_TEXT_TOOLS from './sites/text-tools/config';

const app = express();
const CURRENT_SITE = process.env.SITE;

let CONFIG: ISiteConfig;
if (CURRENT_SITE === 'text-tools') {
  CONFIG = CONFIG_TEXT_TOOLS;
} else {
  console.error(`Unknown site: ${CURRENT_SITE}`);
  process.exit(1);
}

const PUBLIC_DIR = path.join(__dirname, '../public', CONFIG.name);

const start = async () => {
  console.log(`Starting ${CONFIG.name} setup in ${process.env.NODE_ENV} mode`);

  app.set('trust proxy', true);
  app.disable('x-powered-by');

  app.use(compression());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    cors({
      credentials: true,
      origin: CONFIG.domain,
      methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    }),
  );

  app.use('/public', express.static(PUBLIC_DIR));

  if (CONFIG.singlePage) {
    app.get('*', (req, res) => {
      const template = path.join(PUBLIC_DIR, 'app.html');
      if (existsSync(template)) {
        const file = readFileSync(template);
        const html = file.toString();
        return res.send(html);
      }
      return res.sendStatus(500);
    });
  } else {
    app.get('*', (req, res) => {
      let templateFile;
      if (req.path === '/') {
        templateFile = 'homepage.html';
      } else {
        templateFile = req.url.substring(1);
        // Format is /some/tool -> some-tool.html
        templateFile = templateFile.replace(/\//g, '-') + '.html';
      }

      if (templateFile) {
        const template = path.join(PUBLIC_DIR, templateFile);
        if (existsSync(template)) {
          const file = readFileSync(template);
          const html = file.toString();
          return res.send(html);
        }
      }

      return res.sendStatus(404);
    });
  }

  app.listen(CONFIG.port, () => {
    console.log(`Server ${CONFIG.name} is running on port ${CONFIG.port}`);
  });
};

start().then(() => {
  console.log(`Finished ${CONFIG.name} setup`);
});
