import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './tmpl';
import Page from '../../сomponents/IndexPage/IndexPage';

export default class ServerErrorPage extends Block {
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const props = {
  title: 'Ошибка сервера | Zoo-Chat',
  pageHeader: 'Ошибка сервера',
  link: { text: 'На главную', url: './chats.html' },
};
const serverErrorPage = new Page('div', { ...props });
