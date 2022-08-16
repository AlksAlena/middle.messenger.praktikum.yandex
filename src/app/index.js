import render from './utils/render';
import Button from './layouts/сomponents/Button/Button';
import Input from './layouts/сomponents/Input/Input';
import Nav from './layouts/сomponents/Nav/Nav';
import Page from './layouts/сomponents/IndexPage/IndexPage';

import IndexLayout from './layouts/pages/Index';
import SignUpPage from './layouts/pages/SignUp';
import UserErrorPage from './layouts/pages/UserError';

// const button = new Button({
//   text: 'Click me',
//   class: 'button',
// });
//
// const input = new Input({
//   label: 'Имя',
//   name: 'first_name',
//   type: 'text',
// });

// const nav = new Nav(
//   'nav',
//   {
//     links: [
//       { title: 'Вход', url: './index.hbs' },
//       { title: 'Регистрация', url: './sign-up.hbs' },
//       { title: 'Список чатов', url: './chats.hbs' },
//       { title: 'Настройки пользователя', url: './profile.hbs' },
//       { title: '404', url: './404.hbs' },
//       { title: 'ServerError', url: './5**.hbs' },
//     ],
//     events: {
//       click: (e) => {
//         const { target } = e;
//         if (target && target.hasAttributes('href')) {
//           console.log('Nav link clicked');
//           e.preventDefault();
//           e.stopPropagation();
//         } else {
//           console.log('No link clicked');
//         }
//       },
//     },
//   },
// );

// const content = new Page('div', { content: '' });

const props = {
  title: 'Регистрация | Zoo-Chat',
  fields: [
    { label: 'Имя', name: 'first_name', type: 'text' },
    { label: 'Фамилия', name: 'second_name', type: 'text' },
    { label: 'Логин', name: 'login', type: 'text' },
    { label: 'Пароль', name: 'password', type: 'password' },
    { label: 'Почта', name: 'email', type: 'email' },
    { label: 'Телефон', name: 'phone', type: 'phone' },
  ],
  formTitle: 'Регистрация',
  submitButtonText: 'Зарегистрироваться',
};
const signUpPage = new SignUpPage('div', { ...props });

// const page = new IndexLayout(
//   'div',
//   {
//     nav,
//     title: 'Главная',
//     content,
//   },
// );

document.addEventListener('DOMContentLoaded', () => {
  // render(".app", input);
  // render(".app", button);

  // window.page = page;
  // window.content = content;

  // render('.app', page);
  render('.app', signUpPage);
});
