import Handlebars from 'handlebars';
import Block from '../../../services/Block';
import template from './footer.tmpl';

export default class Footer extends Block {
  constructor(props) {
    super('footer', props);
    this.getContent().classList.add('footer');
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
