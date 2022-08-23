import { Block } from '../../modules/block';
import template from './paragraph.hbs';

export class Paragraph extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}