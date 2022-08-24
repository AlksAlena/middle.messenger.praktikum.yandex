import { Block } from '../../modules/block';
import template from './profile-page.hbs';
import Button from '../../components/button';

interface ProfilePageProps {
  title: string;
  fields: { [key: string]: string }[];
  button: Block;
}

export class ProfilePage extends Block {
  constructor() {
    const button = new Button({
      text: 'Сохранить',
      events: {
        click: () => console.log('click!')
      }
    });

    // title: Настройки пользователя | Zoo-Chat
    const props: ProfilePageProps = {
      title: 'Настройки пользователя',
      fields: [
        { name: 'first_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Имя'},
        { name: 'second_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Фамилия'},
        { name: 'login', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Логин'},
        { name: 'display_name', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Отображать имя'},
        { name: 'email', inputClass: 'input', type: 'email', labelClass: 'label', labelText: 'Почта'},
        { name: 'phone', inputClass: 'input', type: 'phone', labelClass: 'label', labelText: 'Телефон'},
        { name: 'avatar', inputClass: 'input', type: 'text', labelClass: 'label', labelText: 'Аватар'},
        { name: 'oldPassword', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Старый пароль'},
        { name: 'newPassword', inputClass: 'input', type: 'password', labelClass: 'label', labelText: 'Новый пароль'},
      ],
      button: button
    };

    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
