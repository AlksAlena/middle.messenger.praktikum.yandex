import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './tmpl';
import Page from '../../сomponents/IndexPage/IndexPage';

export default class IndexPage extends Block {
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const props = {
  title: 'Вход | Zoo-Chat',
  formTitle: 'Вход',
  fields: [
    { label: 'Логин', name: 'login', type: 'text' },
    { label: 'Пароль', name: 'password', type: 'password' },
  ],
  submitButtonText: 'Войти',
  link: { text: 'Ещё не зарегистрированы?', url: './sign-up.hbs' },
};
const indexPage = new Page('div', { ...props });
