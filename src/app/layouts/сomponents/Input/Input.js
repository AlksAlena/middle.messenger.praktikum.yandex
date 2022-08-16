import Handlebars from 'handlebars';
import template from './input.tmpl';
import Block from '../../../services/Block';

export default class Input extends Block {
  constructor(props) {
    super('div', props);
    this.getContent().classList.add('form-field');
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
