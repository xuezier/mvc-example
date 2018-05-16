import {ApplicationLoader, ApplicationSettings} from 'mvc-ts';

import {Collection} from 'mvc-ts';

import './middlewares';
import './controllers';

import './model';

@ApplicationSettings({rootDir: `${__dirname}/../`})
export class Application extends ApplicationLoader {

}