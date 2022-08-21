import { render } from '../utils/render';
import { Paragraph } from '../components/paragraph';

document.addEventListener('DOMContentLoaded', () => {
  const content = new Paragraph('p', { title: 'Hello, моя умница! ))'});
  render('.app', content);
});