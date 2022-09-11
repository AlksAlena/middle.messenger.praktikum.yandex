import { Block } from '../../modules/block';
import template from './base-page.hbs';
import Header from '../../components/header';
import Footer from '../../components/footer';

type BasePageProps = {
  header?: Header;
  footer?: Footer;
  content?: Block<any>;
  events?: Record<string, Function>;
};


export class BasePage extends Block<BasePageProps> {

  constructor(props: { content?: Block<any> }) {
    const header = new Header();
    const footer = new Footer();
    const events = {
      click: (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const target: HTMLElement = e.target as HTMLElement;
        const isLink: boolean = target.hasAttribute('href');
        const isNavLink: boolean = target.classList.contains('navigation');

        if (isLink && isNavLink) {
          const url: string | null = target.getAttribute('href') || '';
          window['router'].go(url);
        }
      }
    };

    super({ ...props, header, footer, events });
  }

  protected render(): DocumentFragment {
    // @ts-ignore
    return this.compile(template, {...this.props});
  }
}
