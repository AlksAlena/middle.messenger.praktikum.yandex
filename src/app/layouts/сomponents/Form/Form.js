import Handlebars from 'handlebars';
import template from './form.tmpl';
import Block from '../../../services/Block';

export default class Nav extends Block {
  constructor(tag, props) {
    super(tag, props);
    // this.getContent().classList.add('navigation');
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
