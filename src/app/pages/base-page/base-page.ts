import { Block } from '../../modules/block';
import template from './base-page.hbs';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { routes } from '../../utils/routes';

export class BasePage extends Block {
  private readonly _routes = { ...routes };

  constructor(props: { content: Block }) {
    const header = new Header();
    const footer = new Footer();
    const events = {
      click: (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target;
        const isLink = target.hasAttribute('href');
        const navLink = target.classList.contains('navigation');

        if (isLink && navLink) {
          const url = target.getAttribute('href');
          this.goToPage(url);
        }
      }
    };

    super({ ...props, header, footer, events });
  }

  private goToPage(url: string): void {
    this.setProps({ content: this._routes[url] });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
