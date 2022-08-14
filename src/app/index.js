import render from "./utils/render";
import Button from "./сomponents/Button/Button";
import Input from "./сomponents/Input/Input";
import Nav from "./сomponents/Nav/Nav";

const button = new Button({
  text: 'Click me',
  class: 'button'
});

const input = new Input({
  label: 'Имя',
  name: 'first_name',
  type: 'text'
});

const nav = new Nav(
  'nav',
  {
    links: [
      { title: "Вход", url: "./index.hbs" },
      { title: "Регистрация", url: "./sign-up.hbs" },
      { title: "Список чатов", url: "./chats.hbs" },
      { title: "Настройки пользователя", url: "./profile.hbs" },
      { title: "404", url: "./404.hbs" },
      { title: "5**", url: "./5**.hbs" }
    ]
  }
);

document.addEventListener('DOMContentLoaded', () => {
  render(".app", input);
  render(".app", button);
  render(".app", nav);
});

