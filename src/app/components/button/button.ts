import { Block } from '../../modules/block';
import template from './button.hbs';

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
    props = props?.text ? props : { text: 'Click me', type: 'button' };
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  protected componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
    const { text: oldText, class: oldClass } = oldProps;
    const { text: newText, class: newClass } = newProps;

    return oldText !== newText || oldClass !== newClass;
  }
}
