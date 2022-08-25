import { Block } from '../../modules/block';
import template from './form.hbs';
import Button from '../button';

interface FormProps {
  title: string;
  fields: { [key: string]: string | RegExp | boolean }[];
  button?: Button;
  link?: { text: string, url: string, class?: string };
  events?: {
    submit?: (e) => void,
    click?: (e) => void
  }
}

export class Form extends Block {
  static events = {
    submit: Form.submitHandler,
    click: Form.clickHandler
  }

  constructor(props: FormProps) {
    const events = props.events || Form.events;
    super({ ...props, events });
  }

  protected init(): void {
    super.init();
    const inputs: NodeListOf<HTMLInputElement> = this.getContent().querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', Form.focusHandler);
      input.addEventListener('blur', Form.blurHandler);
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }

  static submitHandler(e): void {
    const form: HTMLFormElement = e.currentTarget;
    const formValue: { [key: string]: string | number } = {};
    const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');

    inputs.forEach(input => {
      formValue[input.name] = input.value;
      Form.checkInputValidity(input);
    });

    console.log('form value: ', formValue);
    console.log('form valid: ', form.reportValidity());
  }

  static clickHandler(e): void {
    e.preventDefault();
    e.stopPropagation();
    const target: HTMLElement = e.target;

    const isButton: boolean = target.tagName === 'BUTTON';
    const isSubmitButton: boolean = isButton && target.getAttribute('type') === 'submit';
    if (isSubmitButton) {
      Form.events.submit(e);
      return;
    }
  }

  static blurHandler(e): void {
    const input: HTMLInputElement = e.target;
    Form.checkInputValidity(input);
  }

  static focusHandler(e): void {
    const input: HTMLInputElement = e.target;
    Form.checkInputValidity(input);
  }

  static checkInputValidity(input: HTMLInputElement): void {
    const { patternMismatch, valueMissing, valid } = input.validity;
    const errorMsg: HTMLElement = document.querySelector(`[data-input="input-name-${input.name}"]`);
    errorMsg.style.display = valid ? 'none' : 'inline-block';
    if (valueMissing) {
      errorMsg.innerText = 'Поле обязательное';
    }

    if (patternMismatch) {
      errorMsg.innerText = `Некорректный формат, паттерн: ${input.pattern}`;
    }
  }
}
