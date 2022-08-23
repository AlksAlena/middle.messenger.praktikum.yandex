import { render } from '../utils/render';
import BasePage from '../pages/base-page';
import IndexPage from '../pages/index-page';
import SignUpPage from '../pages/sign-up-page';

document.addEventListener('DOMContentLoaded', () => {
  const indexPage = new IndexPage();
  const signUpPage = new SignUpPage();
  const basePage = new BasePage({ content: signUpPage });
  render('#app', basePage);

  // не сработало обновление пропса
  // setTimeout(() => {
  //   console.log('timeout work!');
  //   basePage.setProps({ content: '<div>new content</div>'});
  // }, 2000);
});
