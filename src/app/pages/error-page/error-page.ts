import { Block } from '../../modules/block';
import template from './error-page.hbs';

type ErrorPageProps = {
  link: { text: string, url: string };
  message: string;
};


export class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    // @ts-ignore
    return this.compile(template, {...this.props});
  }
}
