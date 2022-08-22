import { render } from '../utils/render';
import { Paragraph } from '../components/paragraph';
import { Button } from '../components/button/button';

document.addEventListener('DOMContentLoaded', () => {
  const content = new Paragraph({ title: 'Hello, моя умница! ))' });
  const button = new Button({
    class: 'button',
    text: 'Click me!',
    type: 'reset',
    events: { click: () => console.log('click!') }
  });

  render('#app', content);
  render('#app', button);

  setTimeout(() => {
    content.setProps({ title: 'Wow Wow'});
  }, 1000);
});
