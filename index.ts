// server utils path alias
import 'module-alias/register';

import * as dotenv from 'dotenv';
// enable .env file effect in typescript
dotenv.config();

import * as OauthServer from 'oauth2-server';

import {Application} from './src/Application';

import {OauthModel} from './src/lib/OauthModel';

const application = new Application();
new Application().start();

application.install('oauth', new OauthServer({
  model: OauthModel,
  debug: true,
  accessTokenLifetime: 1800,
  refreshTokenLifetime: 3600 * 24 * 15,
}));

process.on('uncaughtException', (err: Error) => {
  console.error('Caught exception: ' + err.stack);
});
