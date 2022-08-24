import { Block } from '../../modules/block';
import template from './form-field.hbs';

interface FormFieldProps {
  name: string;
  inputClass: string;
  type: string;
  labelClass: string;
  labelText: string;
}

export class FormField extends Block {
  constructor(props: FormFieldProps[]) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
