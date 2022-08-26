import { Block } from '../../modules/block';
import template from './chats-page.hbs';
import Button from '../../components/button';

interface ChatInfo {
  userName: string;
  isUserOnline: boolean;
}

type ChayMessageType = 'out' | 'in';

interface ChatMessage {
  text: string;
  status: boolean;
  type: ChayMessageType;
  date: string;
}

type ChatsPageProps = {
  chats: ChatInfo[];
  activeChatMessages: ChatMessage[];
  button: Button
};

export class ChatsPage extends Block<ChatsPageProps> {
  constructor() {
    const button = new Button({
      text: 'Отправить',
      type: 'submit',
      events: {
        click: () => console.log('click!')
      }
    });
    // title: Чаты | Zoo-Chat
    const props: ChatsPageProps = {
      chats: [
        { userName: 'Катя', isUserOnline: false },
        { userName: 'Коля', isUserOnline: false },
        { userName: 'Оля', isUserOnline: false },
        { userName: 'Настя', isUserOnline: false },
        { userName: 'Павел Сергеевич', isUserOnline: false },
        { userName: 'Kroca', isUserOnline: false },
      ],
      activeChatMessages: [
        { text: 'Привет, как дела?', status: true, type: 'out', date: '15-02-2022, 18:15'},
        { text: 'Спасибо, отлично! А ты как?', status: true, type: 'in', date: '15-02-2022, 18:17'},
      ],
      button
    };

    super(props);
  }

  protected render(): DocumentFragment {
    // @ts-ignore
    return this.compile(template, {...this.props});
  }
}
