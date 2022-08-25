import { Block } from '../../modules/block';
import template from './profile-page.hbs';
import Button from '../../components/button';
import Form from '../../components/form';
import { patterns } from '../../modules/validators';

interface ProfilePageProps {
  form: Form;
}

export class ProfilePage extends Block {
  constructor() {
    const button = new Button({
      text: 'Сохранить',
      type: 'submit',
      events: {
        click: () => console.log('click!')
      }
    });

    // title: Настройки пользователя | Zoo-Chat
    // непонятно должны ли поля быть обязательными
    const form = new Form({
      title: 'Настройки пользователя',
      fields: [
        { name: 'first_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Имя', pattern: patterns.name },
        { name: 'second_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Фамилия', pattern: patterns.name },
        { name: 'login', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Логин', pattern: patterns.login },
        { name: 'display_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Отображать имя' },
        { name: 'email', inputClass: 'input', type: 'email', labelClass: 'label', labelText: 'Почта', pattern: patterns.email },
        { name: 'phone', inputClass: 'input', type: 'phone', labelClass: 'label', labelText: 'Телефон', pattern: patterns.phone },
        { name: 'avatar', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Аватар' },
        { name: 'oldPassword', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Старый пароль', pattern: patterns.password },
        { name: 'newPassword', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Новый пароль', pattern: patterns.password },
      ],
      button
    });

    super({ form });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
