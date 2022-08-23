import { render } from '../utils/render';
import IndexPage from '../pages/index-page';

document.addEventListener('DOMContentLoaded', () => {
  const indexPage = new IndexPage();
  render('#app', indexPage);
});
