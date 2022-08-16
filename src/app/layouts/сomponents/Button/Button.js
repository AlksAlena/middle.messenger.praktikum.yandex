import Handlebars from 'handlebars';
import template from './button.tmpl';
import Block from '../../../services/Block';

export default class Button extends Block {
  constructor(props) {
    super('p', props);
    this.getContent().classList.add('button-wrapper');
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
