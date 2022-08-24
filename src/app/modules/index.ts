import { render } from '../utils/render';
import BasePage from '../pages/base-page';
import IndexPage from '../pages/index-page';

document.addEventListener('DOMContentLoaded', () => {
  const indexPage = new IndexPage();
  const basePage = new BasePage({ content: indexPage });
  render('#app', basePage);
});
