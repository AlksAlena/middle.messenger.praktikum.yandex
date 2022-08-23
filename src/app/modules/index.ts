import { render } from '../utils/render';
import IndexPage from '../pages/index-page';
import BasePage from '../pages/base-page';

document.addEventListener('DOMContentLoaded', () => {
  const indexPage = new IndexPage();
  const basePage = new BasePage({ content: indexPage });
  render('#app', basePage);
});
