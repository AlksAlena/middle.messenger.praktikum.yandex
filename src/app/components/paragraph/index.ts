import Handlebars from 'handlebars/dist/handlebars';
import { Block } from '../../modules/block';
import template from './tmpl';

export class Paragraph extends Block {
  render(): string {
    return Handlebars.compile(template)(this.props);
  }
}
