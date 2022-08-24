import { Block } from '../../modules/block';
import template from './error-page.hbs';

interface ErrorPageProps {
  link: { text: string, url: string };
  message: string;
}
export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
