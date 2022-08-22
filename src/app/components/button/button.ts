import { Block } from '../../modules/block';
import template from './tmpl.hbs';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  text: string;
  class?: string;
  type?: ButtonType;
  events?: {
    click?: () => void
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  // p.button-wrapper
  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    return oldProps.text !== newProps.text;
  }
}
