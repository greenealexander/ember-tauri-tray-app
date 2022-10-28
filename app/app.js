import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'ember-tauri-test/config/environment';
import { appWindow } from '@tauri-apps/api/window';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  constructor(owner, args) {
    super(owner, args);

    if ('Notification' in window && Notification.permission !== 'granted') {
      try {
        Notification.requestPermission();
      } catch (error) {
        console.error(error);
      }
    }

    window?.addEventListener('blur', () => {
      appWindow.hide();
    });
  }
}

loadInitializers(App, config.modulePrefix);
