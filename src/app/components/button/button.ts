import { Block } from '../../modules/block';
import template from './button.hbs';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonProps = {
  text: string;
  cssClass?: string;
  type?: ButtonType;
  events?: {
    click?: (e: Event) => void
  }
};

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    const { text = 'Click me', type = 'button', cssClass = 'button', events = {} } = props || {};
    super({ text, type, cssClass, events });
  }

  protected render(): DocumentFragment {
    // @ts-ignore
    return this.compile(template, { ...this.props });
  }

  protected componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
    const { text: oldText, cssClass: oldClass } = oldProps;
    const { text: newText, cssClass: newClass } = newProps;

    return oldText !== newText || oldClass !== newClass;
  }
}
