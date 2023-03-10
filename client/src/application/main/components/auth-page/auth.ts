import './auth.scss';
import './auth-form/auth-form.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import CloseAuth from './close/close';
import ButtonElement from '../../../shared/components/base-elements/button-element';
import ImageElement from '../../../shared/components/base-elements/image-element';
import SVG from '../../../shared/components/svg-icons';
import AuthForm from './auth-form/auth-form';

export default class Auth extends DOMElement {
  private wrapper: DOMElement;

  private container: DOMElement;

  private close: CloseAuth;

  private navigation: DOMElement;

  private loginNav: ButtonElement;

  private regNav: ButtonElement;

  private logo: ImageElement;

  private formContainer: DOMElement;

  private authForm: AuthForm;

  constructor(parentNode: HTMLElement) {
    super(parentNode, { tagName: 'div', classList: ['auth'] });

    this.wrapper = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['auth__wrapper'],
    });

    this.close = new CloseAuth(this.wrapper.node);

    this.container = new DOMElement(this.wrapper.node, {
      tagName: 'div',
      classList: ['auth__container'],
    });

    this.logo = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['auth__logo'],
    });
    this.logo.node.innerHTML = SVG.authLogo;

    this.navigation = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['auth__nav'],
    });

    this.loginNav = new ButtonElement(this.navigation.node, {
      tagName: 'button',
      classList: ['auth__nav-login', 'active'],
      content: 'Войти',
    });

    this.regNav = new ButtonElement(this.navigation.node, {
      tagName: 'button',
      classList: ['auth__nav-reg'],
      content: 'Зарегистрироваться',
    });

    this.formContainer = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['auth__form-container'],
    });
    this.authForm = new AuthForm(this.formContainer.node);

    this.loginNav.node.addEventListener('click', () => {
      this.regNav.node.classList.remove('active');
      this.loginNav.node.classList.add('active');
      this.authForm.changeMode(false);
    });

    this.regNav.node.addEventListener('click', () => {
      this.regNav.node.classList.add('active');
      this.loginNav.node.classList.remove('active');
      this.authForm.changeMode(true);
    });
  }
}
