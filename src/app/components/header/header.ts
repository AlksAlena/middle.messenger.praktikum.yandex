import { Block } from '../../modules/block';
import template from './header.hbs';

export class Header extends Block {
  constructor() {
    super();
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
