import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'ember-tauri-test/config/environment';
import { appWindow } from '@tauri-apps/api/window';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  constructor() {
    super();

    window?.addEventListener('blur', () => {
      console.log('window blurred');
      appWindow.hide();
    });
  }
}

loadInitializers(App, config.modulePrefix);
