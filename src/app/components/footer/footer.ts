import { Block } from '../../modules/block';
import template from './footer.hbs';

interface FooterProps {
  links: { text: string, url: string }[];
}

export class Footer extends Block {
  constructor() {
    const props: FooterProps = {
      links: [
        { text: 'Вход', url: './index.html' },
        { text: 'Регистрация', url: './sign-up.html' },
        { text: 'Список чатов', url: './chats.html' },
        { text: 'Настройки пользователя', url: './profile.html' },
        { text: '404', url: './404.html' },
        { text: '5**', url: './5**.html' },
      ]
    };

    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}