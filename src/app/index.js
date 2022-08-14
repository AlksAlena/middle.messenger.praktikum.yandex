import render from './utils/render';
import Button from './сomponents/Button/Button';
import Input from './сomponents/Input/Input';
import Nav from './сomponents/Nav/Nav';
import Page from './сomponents/IndexPage/IndexPage';

import IndexLayout from './layout/Index';

const button = new Button({
  text: 'Click me',
  class: 'button',
});

const input = new Input({
  label: 'Имя',
  name: 'first_name',
  type: 'text',
});

const nav = new Nav(
  'nav',
  {
    links: [
      { title: 'Вход', url: './index.hbs' },
      { title: 'Регистрация', url: './sign-up.hbs' },
      { title: 'Список чатов', url: './chats.hbs' },
      { title: 'Настройки пользователя', url: './profile.hbs' },
      { title: '404', url: './404.hbs' },
      { title: 'ServerError', url: './5**.hbs' },
    ],
    events: {
      click: (e) => {
        const { target } = e;
        if (target && target.hasAttributes('href')) {
          console.log('Nav link clicked');
          e.preventDefault();
          e.stopPropagation();
        } else {
          console.log('No link clicked');
        }
      },
    },
  },
);

const content = new Page('div', { content: 'ipsum sit amet' });

const page = new IndexLayout(
  'div',
  {
    nav,
    title: 'Главная',
    content,
  },
);

// const page = new IndexLayout(
//   'div',
//   {
//     nav: nav,
//     title: 'Главная',
//     content: content
//   }
// );

document.addEventListener('DOMContentLoaded', () => {
  // render(".app", input);
  // render(".app", button);

  window.page = page;
  window.content = content;

  render('.app', page);
});
