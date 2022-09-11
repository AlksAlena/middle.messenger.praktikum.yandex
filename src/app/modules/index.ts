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
});
