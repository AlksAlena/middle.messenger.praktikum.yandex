import { Block } from '../../modules/block';
import template from './index-page.hbs';
import Button from '../../components/button';
import Form from '../../components/form';

interface IndexPageProps {
  form: Form;
}

export class IndexPage extends Block {
  constructor() {
    const button = new Button({
      text: 'Войти',
      events: {
        click: () => console.log('click!')
      }
    });

    // title: Вход | Zoo-Chat
    const form = new Form({
      title: 'Вход',
      fields: [
        { name: 'login', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Логин'},
        { name: 'password', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Пароль'},
      ],
      link: { text: 'Ещё не зарегистрированы?', url: './sign-up.html'},
      button
    });

    super({ form });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
