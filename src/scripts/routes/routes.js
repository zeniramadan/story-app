import HomePage from '../pages/home/home-page';
import HomePresenter from '../pages/home/home-presenter';
import AboutPage from '../pages/about/about-page';
import AboutPresenter from '../pages/about/about-presenter';
import AddPage from '../pages/add/add-page';
import AddPresenter from '../pages/add/add-presenter';
import LoginPage from '../pages/login/login-page';
import LoginPresenter from '../pages/login/login-presenter';
import RegisterPage from '../pages/register/register-page';
import RegisterPresenter from '../pages/register/register-presenter';
import DetailPage from '../pages/detail/detail-page';
import DetailPresenter from '../pages/detail/detail-presenter';

const homePage = new HomePage();
const homePresenter = new HomePresenter(homePage);
const aboutPage = new AboutPage();
const aboutPresenter = new AboutPresenter(aboutPage);
const addPage = new AddPage();
const addPresenter = new AddPresenter(addPage);
const loginPage = new LoginPage();
const loginPresenter = new LoginPresenter(loginPage);
const registerPage = new RegisterPage();
const registerPresenter = new RegisterPresenter(registerPage);
const detailPage = new DetailPage();
const detailPresenter = new DetailPresenter(detailPage);

const routes = {
  '/': {
    render: () => homePage.render(),
    afterRender: () => homePresenter.afterRender(),
  },
  '/about': {
    render: () => aboutPage.render(),
    afterRender: () => aboutPresenter.afterRender(),
  },
  '/add': {
    render: () => addPage.render(),
    afterRender: () => addPresenter.afterRender(),
  },
  '/login': {
    render: () => loginPage.render(),
    afterRender: () => loginPresenter.afterRender(),
  },
  '/register': {
    render: () => registerPage.render(),
    afterRender: () => registerPresenter.afterRender(),
  },
  '/detail/:id': {
    render: () => detailPage.render(),
    afterRender: () => detailPresenter.afterRender(),
  },
};

export { addPresenter };
export default routes;
