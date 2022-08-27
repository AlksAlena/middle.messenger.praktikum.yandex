import IndexPage from '../pages/index-page';
import ChatsPage from '../pages/chats-page';
import ErrorPage from '../pages/error-page';
import ProfilePage from '../pages/profile-page';
import SignUpPage from '../pages/sign-up-page';

export const routes: Record<string, Function> = {
  'index.html': () => new IndexPage(),
  'chats.html': () => new ChatsPage(),
  '404.html': () => new ErrorPage({
    link: { text: 'На главную', url: 'index.html'},
    message: '404. Страница не существует'
  }),
  '5**.html': () => new ErrorPage({
    link: { text: 'На главную', url: 'index.html'},
    message: '5**. Ошибка сервера'
  }),
  'profile.html': () => new ProfilePage(),
  'sign-up.html': () => new SignUpPage()
};
