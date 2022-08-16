import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './tmpl';
import Page from "../../сomponents/IndexPage/IndexPage";

export default class SignUpPage extends Block {
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

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
const signUpPage = new Page('div', {...props});
