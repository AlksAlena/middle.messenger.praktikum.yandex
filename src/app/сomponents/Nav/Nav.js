import Handlebars from 'handlebars';
import template from './nav.tmpl';
import Block from '../../services/Block';

export default class Nav extends Block {
  constructor(tag, props) {
    super(tag, props);
    this.getContent().classList.add('navigation');
  }

  render() {
    const compiled = Handlebars.compile(template);
    return compiled(this.props);
  }
}
