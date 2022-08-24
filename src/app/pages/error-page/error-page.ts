import { Block } from '../../modules/block';
import template from './error-page.hbs';

interface ErrorPageProps {
  link: { text: string, url: string };
  message: string;
}
export class ErrorPage extends Block {
  constructor() {
    // title: 500. Ошибка сервера | Zoo-Chat
    // message: Ошибка сервера

    // title: 404. Страница не существует | Zoo-Chat
    // pageHeader: Страница не существует
    const props: ErrorPageProps = {
      link: { text: 'На главную', url: './index.html'},
      message: 'Ошибка сервера'
    };

    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
