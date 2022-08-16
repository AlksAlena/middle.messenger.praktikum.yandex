import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './tmpl';
import Page from "../../сomponents/IndexPage/IndexPage";

export default class ChatsPage extends Block {
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const props = {
  title: 'Чаты | Zoo-Chat',
  chats: [
    {
      userName: 'Катя',
      status: 'online',
      messages: [
        {text: 'Привет, как дела?', type: 'out', status: 'ok', date: '15-02-2022, 18:15'},
        {text: 'Спасибо, отлично! А ты как?', type: 'in', status: 'ok', date: '15-02-2022, 18:17'},
      ]
    },
    { userName: 'Коля', status: 'offline', messages: [] },
    { userName: 'Оля', status: 'offline', messages: [] },
    { userName: 'Настя', status: 'offline', messages: [] },
    { userName: 'Павел Сергеевич', status: 'offline', messages: [] },
    { userName: 'Kroca', status: 'online', messages: [] },
  ],
  submitButtonText: 'Отправить'
};
const chatsPage = new Page('div', {...props});
