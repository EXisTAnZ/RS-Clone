import menuObserver from '../../../core/services/menu/menu-observer.service';
import authService from '../../../main/services/auth-page/auth.service';
import fullscreenObserver from '../../../main/services/auth-page/fullsrceen/fullscreen-observer';
import DOMElement from '../../components/base-elements/dom-element';
import { RouterOptions } from '../../models/router-options';
import state from '../state';
import mainRoutes from './routes';

export default class Router extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['router-container'],
    });
    this.enableRouteChange();
    const id = this.getCurrentPageId();
    this.renderNewPage(id);
    if (id === 'account' && !state.allData.account.userData.logged) window.location.hash = '#auth';
    if (id === 'wallpapers') {
      this.setWallpapers(window.location.hash);
      setTimeout(() => this.renderNewPage(id), 1500);
    }
  }

  public async renderNewPage(pageID: string) {
    this.node.innerHTML = '';
    menuObserver.setPage();
    const element = this.findNewtemplate(pageID);
    const newPage = element.length !== 0 ? element[0].template().node : mainRoutes[0].template().node;
    this.node.append(newPage);
  }

  private findNewtemplate(pageID: string): RouterOptions[] {
    return mainRoutes.filter((route) => route.id === pageID);
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', async () => {
      await authService.authorization();
      const id = this.getCurrentPageId();
      if (id === 'movie') {
        await this.setMoviePage(window.location.hash);
      }
      if (id === 'wallpapers') {
        await this.setWallpapers(window.location.hash);
      }
      if (id === 'account' && !state.allData.account.userData.logged) window.location.hash = '#auth';
      if (id === 'account' && state.getUserRole() === 'admin') {
        state.setUserList();
      }
      this.renderNewPage(id);
    });
  }

  private getPageID(path: string) {
    return path.split('/')[1];
  }

  private async setMoviePage(pageID: string) {
    const filmID = this.getPageID(pageID);
    state.setMoviePageID(filmID);
    await state.setMoviePageCurrentData();
  }

  private getCurrentPageId() {
    const { hash } = window.location;
    const id = hash.slice(1).split('/')[0];
    if (id !== 's') state.setDefaultFilter();
    this.setPrevPage(hash, id);
    this.checkStyles(id);
    return id;
  }

  private setPrevPage(hash: string, id: string) {
    const prevData = state.getPreviousPageInfo();
    state.setPreviousPageInfo({
      previousPageHash: prevData.currentPageHash,
      previousPageID: prevData.currentPageID,
      currentPageHash: hash,
      currentPageID: id,
    });
  }

  private checkStyles(id: string) {
    if (id === 'auth') {
      fullscreenObserver.addFullscreen();
    } else {
      fullscreenObserver.removeFullscreen();
    }
  }

  private async setWallpapers(hash: string) {
    const filmID = this.getPageID(hash);
    state.setMoviePageID(filmID);
    await state.setMoviePagePosters();
  }
}
