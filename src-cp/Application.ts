import { ApplicationLoader, ApplicationSettings, Inject, ConfigContainer } from 'mvc-ts';

import './controllers';

import './rpc';

@ApplicationSettings({ rootDir: `${__dirname}/../` })
export class CpApplication extends ApplicationLoader { }

