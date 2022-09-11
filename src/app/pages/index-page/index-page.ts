import { Block } from '../../modules/block';
import template from './index-page.hbs';
import Button from '../../components/button';
import Form from '../../components/form';
import { patterns } from '../../utils/validators';

type IndexPageProps = {
  form: Form;
};


export class IndexPage extends Block<IndexPageProps> {
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
      link: { text: 'Ещё не зарегистрированы?', url: '/sign-up', class: 'navigation link' },
      button
    });

    const props: IndexPageProps = { form };

    super(props);
  }

  protected render(): DocumentFragment {
    // @ts-ignore
    return this.compile(template, {...this.props});
  }
}
