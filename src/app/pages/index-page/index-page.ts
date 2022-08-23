import { Block } from '../../modules/block';
import template from './index-page.hbs';
import { Button } from '../../components/button/button';

interface IndexPageProps {
  title: string;
  fields: { [key: string]: string }[];
  button: Block;
}

export class IndexPage extends Block {
  constructor() {
    const button = new Button({
      class: 'button',
      text: 'Click me!',
      type: 'reset',
      events: { click: () => console.log('click!') }
    });

    const props: IndexPageProps = {
      title: 'Регистрация',
      fields: [
        { name: 'first_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Имя'},
        { name: 'second_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Фамилия'},
      ],
      button: button
    };

    super(props);
  }

  // можно создать необязательный метод initChildren();
  // protected initChildren(), который будет вызываться в Block.constructor()

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
