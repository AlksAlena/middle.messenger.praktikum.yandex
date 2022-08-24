import { Block } from '../../modules/block';
import template from './base-page.hbs';
import Header from '../../components/header';
import Footer from '../../components/footer';

export class BasePage extends Block {
  constructor(props: { content: Block }) {
    const header = new Header();
    const footer = new Footer();
    super({ ...props, header, footer });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
