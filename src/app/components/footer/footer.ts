import { Block } from '../../modules/block';
import template from './footer.hbs';

type FooterProps = {
  links: { text: string, url: string }[];
  events?: { click?: (e: Event) => void };
};

export class Footer extends Block<FooterProps> {
  constructor() {
    const props: FooterProps = {
      links: [
        { text: 'Вход', url: '/' },
        { text: 'Регистрация', url: '/sign-up' },
        { text: 'Список чатов', url: '/chats' },
        { text: 'Настройки пользователя', url: '/profile' },
        { text: '404', url: '/404' },
        { text: '5**', url: '/5**' },
      ],
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const target: HTMLElement = e.target as HTMLElement;
          const isLink: boolean = target.hasAttribute('href');
          if (!isLink) {
            e.stopPropagation();
            return false;
          }
        }
      }
    };

    super(props);
  }

  protected render(): DocumentFragment {
    // @ts-ignore
    return this.compile(template, { ...this.props });
  }
}
