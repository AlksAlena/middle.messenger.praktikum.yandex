import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './tmpl';
import Page from "../../сomponents/IndexPage/IndexPage";

export default class UserErrorPage extends Block {
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const props = {
  title: '404. Страница не существует | Zoo-Chat',
  pageHeader: 'Страница не существует',
  link: { text: 'На главную', url: './chats.html' }
};
const userErrorPage = new Page('div', {...props});
