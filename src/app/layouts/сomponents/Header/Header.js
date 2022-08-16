import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './header.tmpl';

export default class Header extends Block {
  constructor(props) {
    super('header', props);
    this.getContent().classList.add('header');
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
