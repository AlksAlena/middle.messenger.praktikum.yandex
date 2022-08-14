import Handlebars from 'handlebars';
import template from './button.tmpl';
import Block from '../../services/Block';

export default class Button extends Block {
  constructor(props) {
    super('p', props);
    this.getContent().classList.add('button-wrapper');
  }

  render() {
    const compiled = Handlebars.compile(template);
    return compiled(this.props);
  }
}
