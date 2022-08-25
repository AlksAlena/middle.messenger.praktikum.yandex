import { Block } from '../../modules/block';
import template from './index-page.hbs';
import Button from '../../components/button';
import Form from '../../components/form';
import { patterns } from '../../utils/validators';


export class IndexPage extends Block {
  constructor() {
    const button = new Button({
      text: 'Войти',
      type: 'submit'
    });

    // не поняла как менять в <head> значение <title> для разных страниц
    // title: Вход | Zoo-Chat
    const form = new Form({
      title: 'Вход',
      fields: [
        { name: 'login', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Логин', required: true, pattern: patterns.login },
        { name: 'password', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Пароль', required: true, pattern: patterns.password },
      ],
      link: { text: 'Ещё не зарегистрированы?', url: 'sign-up.html', class: 'navigation link' },
      button
    });

    super({ form });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
