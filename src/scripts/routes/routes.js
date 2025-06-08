import HomePage from '../pages/home/home-page';
import HomePresenter from '../pages/home/home-presenter';
import HomeModel from '../pages/home/home-model';
import AboutPage from '../pages/about/about-page';
import AboutPresenter from '../pages/about/about-presenter';
import AddPage from '../pages/add/add-page';
import AddPresenter from '../pages/add/add-presenter';
import AddModel from '../pages/add/add-model';
import LoginPage from '../pages/login/login-page';
import LoginPresenter from '../pages/login/login-presenter';
import LoginModel from '../pages/login/login-model';
import RegisterPage from '../pages/register/register-page';
import RegisterPresenter from '../pages/register/register-presenter';
import RegisterModel from '../pages/register/register-model';
import DetailPage from '../pages/detail/detail-page';
import DetailPresenter from '../pages/detail/detail-presenter';
import DetailModel from '../pages/detail/detail-model';
import SavedataPage from '../pages/savedata/savedata.page';
import NotFoundPage from '../pages/notfound/notfound.page';

const homePage = new HomePage();
const homeModel = new HomeModel();
const homePresenter = new HomePresenter(homePage, homeModel);
const aboutPage = new AboutPage();
const aboutPresenter = new AboutPresenter(aboutPage);
const addPage = new AddPage();
const addModel = new AddModel();
const addPresenter = new AddPresenter(addPage, addModel);
const loginPage = new LoginPage();
const loginModel = new LoginModel();
const loginPresenter = new LoginPresenter(loginPage, loginModel);
const registerPage = new RegisterPage();
const registerModel = new RegisterModel();
const registerPresenter = new RegisterPresenter(registerPage, registerModel);
const detailPage = new DetailPage();
const detailModel = new DetailModel();
const detailPresenter = new DetailPresenter(detailPage, detailModel);

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
  '/savedata': {
    render: () => SavedataPage.render(),
    afterRender: () => SavedataPage.afterRender(),
  },
  '*': {
    render: () => NotFoundPage.render(),
    afterRender: () => NotFoundPage.afterRender(),
  },
};

export { addPresenter };
export default routes;
