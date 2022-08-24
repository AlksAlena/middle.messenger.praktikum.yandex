import { Block } from '../../modules/block';
import template from './sign-up-page.hbs';
import Button from '../../components/button';
import Form from '../../components/form';

interface SignUpPageProps {
  form: Form;
}

export class SignUpPage extends Block {
  constructor() {
    const button = new Button({
      text: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: () => console.log('click!')
      }
    });

    // title: Регистрация | Zoo-Chat
    const form = new Form({
      title: 'Регистрация',
      fields: [
        { name: 'first_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Имя'},
        { name: 'second_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Фамилия'},
        { name: 'login', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Логин'},
        { name: 'password', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Пароль'},
        { name: 'email', inputClass: 'input', type: 'email', labelClass: 'label', labelText: 'Почта'},
        { name: 'phone', inputClass: 'input', type: 'phone', labelClass: 'label', labelText: 'Телефон'},
      ],
      button
    });

    super({ form });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
