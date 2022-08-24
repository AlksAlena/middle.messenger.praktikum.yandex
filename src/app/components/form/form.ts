import { Block } from '../../modules/block';
import template from './form.hbs';
import Button from '../button';

interface FormProps {
  title: string;
  fields: { [key: string]: string }[];
  button?: Button;
  link?: { text: string, url: string };
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
