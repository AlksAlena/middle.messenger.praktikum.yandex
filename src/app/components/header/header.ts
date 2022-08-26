import { Block } from '../../modules/block';
import template from './header.hbs';

export class Header extends Block<{}> {
  constructor(props = {}) {
    super(props);
  }
  protected render(): DocumentFragment {
    // @ts-ignore
    return this.compile(template, { ...this.props });
  }
}
