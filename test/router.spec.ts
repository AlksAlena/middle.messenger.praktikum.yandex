import { expect } from 'chai';
import { Router } from '../src/app/utils/router';
import ChatsPage from '../src/app/pages/chats-page';
import { Block } from '../src/app/modules/block';
import { Route } from '../src/app/utils/route';

// https://github.com/mochajs/mocha-examples

describe('Router', () => {
  function createRouter(): Router {
    return new Router('');
  }

  it('Создается экземпляр роутера', () => {
    expect(createRouter()).to.not.be.null;
  });

  it('Регистрируется роут /chats', () => {
    const router: Router = createRouter();
    router.use('/chats', {} as Block<any>);
    const route: Route | undefined = router.routes.find(r => r.match('/chats'));
    expect(route).to.be.exist;
    // router.go('/chats');

    // const history = window.history;
    // console.log(window.history);
    // expect(history.s).to.not.be.null;
  });

  it('Переход на /chats работает', () => {
    const router: Router = createRouter();
    router.use('/chats', {} as Block<any>);
    router.go('/chats');

    // const history = window.history;
    console.log(window.history);
    // expect(history.s).to.not.be.null;
  });
});

// describe('Проверяем переходы у Роута', () => {
//   function createRouter(): Router {
//     return new Router('');
//   }
//
//   it('', () => {
//     const router: Router = createRouter();
//     window.history.pushState({page: 'login'}, 'Login', '/');
//     window.history.pushState({page: 'register'}, 'Register', '/sign-up');
//
//     expect(window.history.length).to.eq(3);
//   });
//
//   it('Переход на новую страницу должен менять состояние сущности history', () => {
//     const router: Router = createRouter();
//     window.history.pushState({page: 'login'}, 'Login', '/');
//     window.history.pushState({page: 'register'}, 'Register', '/sign-up');
//
//     expect(window.history.length).to.eq(3);
//   });
// });
