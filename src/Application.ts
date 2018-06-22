import { ApplicationLoader, ApplicationSettings, Inject, ConfigContainer } from 'mvc-ts';

import './middlewares';
import './controllers';

import './model';

import './rpc';

@ApplicationSettings({ rootDir: `${__dirname}/../` })
export class Application extends ApplicationLoader { }

