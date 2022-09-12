import { render } from '../utils/render';
import { Router } from '../utils/router';

import BasePage from '../pages/base-page';
import IndexPage from '../pages/index-page';
import ChatsPage from '../pages/chats-page';
import ErrorPage from '../pages/error-page';
import ProfilePage from '../pages/profile-page';
import SignUpPage from '../pages/sign-up-page';

document.addEventListener('DOMContentLoaded', () => {
  const basePage = new BasePage({});
  render('#app', basePage);

  const router = new Router('#outlet');
  router
    .use('/', IndexPage)
    .use('/index', IndexPage)
    .use('/chats', ChatsPage)
    .use('/profile', ProfilePage)
    .use('/sign-up', SignUpPage)
    .use('/404', ErrorPage)
    .use('/5**', ErrorPage)
    .start();

  window['router'] = router;

  /*
  // Изменение истории
  const state = { foo: 'bar' };
  window.history.pushState(
    state,         // объект состояния
    'Page Title',  // заголовок состояния
    '/pages/login'  // URL новой записи (относительно домена)
  );
  window.history.replaceState(state2, 'Other Title', '/another/page');
  */

  //   '404.html': () => new ErrorPage({
  //   link: { text: 'На главную', url: 'index.html'},
  //   message: '404. Страница не существует'
  // }),
  //   '5**.html': () => new ErrorPage({
  //   link: { text: 'На главную', url: 'index.html'},
  //   message: '5**. Ошибка сервера'
  // }),

});
