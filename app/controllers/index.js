import Controller from '@ember/controller';

export default class IndexController extends Controller {
  async notifyMe() {
    if (!('Notification' in window) || Notification.permission !== 'granted')
      return;

    new Notification('Hi there!', {
      body: 'How are you doing?',
      icon: 'https://bit.ly/2DYqRrh',
    });
  }
}
