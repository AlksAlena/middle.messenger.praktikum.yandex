import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './tmpl';
import Page from '../../сomponents/IndexPage/IndexPage';

export default class ProfilePage extends Block {
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const props = {
  title: 'Настройки пользователя | Zoo-Chat',
  fields: [
    { label: 'Имя', name: 'first_name', type: 'text' },
    { label: 'Фамилия', name: 'second_name', type: 'text' },
    { label: 'Логин', name: 'login', type: 'text' },
    { label: 'Отображать имя', name: 'display_name', type: 'text' },
    { label: 'Почта', name: 'email', type: 'email' },
    { label: 'Телефон', name: 'phone', type: 'phone' },
    { label: 'Аватар', name: 'avatar', type: 'text' },
    { label: 'Старый пароль', name: 'oldPassword', type: 'password' },
    { label: 'Новый пароль', name: 'newPassword', type: 'password' },
  ],
  formTitle: 'Настройки пользователя',
  submitButtonText: 'Сохранить',
};
const profilePage = new Page('div', { ...props });
