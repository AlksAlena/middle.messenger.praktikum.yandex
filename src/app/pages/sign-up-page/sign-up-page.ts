import { Block } from '../../modules/block';
import template from './sign-up-page.hbs';
import Button from '../../components/button';
import Form from '../../components/form';
import { patterns } from '../../modules/validators';


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
        { name: 'first_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Имя', required: true, pattern: patterns.name },
        { name: 'second_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Фамилия', required: true, pattern: patterns.name },
        { name: 'login', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Логин', required: true, pattern: patterns.login },
        { name: 'password', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Пароль', required: true, pattern: patterns.password },
        { name: 'email', inputClass: 'input', type: 'email', labelClass: 'label', labelText: 'Почта', required: true, pattern: patterns.email },
        { name: 'phone', inputClass: 'input', type: 'phone', labelClass: 'label', labelText: 'Телефон', required: true, pattern: patterns.phone },
      ],
      button
    });

    super({ form });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
