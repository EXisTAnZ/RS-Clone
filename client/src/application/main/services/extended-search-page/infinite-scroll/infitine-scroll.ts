import apiHelpers from '../../../../shared/services/api/api-helpers.service';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import state from '../../../../shared/services/state';
import SearchListCard from '../../../components/common/card/card';
import SearchExtendedCard from '../../../components/common/extended-card/extended-card';

class InfiniteScroll {
  public checkPosition() {
    const height = document.body.scrollHeight;
    const screenHeight = window.innerHeight;

    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 3;
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      apiHelpers.throttle(this.createNewCards)();
    }
  }

  public scrollListener() {
    this.checkPosition();
  }

  private async createNewCards() {
    state.setSearchNextPage();
    const page = state.getSearchNextPage();
    const container = document.querySelector('.extended-search-list') as HTMLElement;
    if (page <= state.getSearchMaxPages()) {
      const status = state.getSearchStatus();
      if (status === 'search') {
        const currentParams = state.getSearchFilterOptions();
        const newState = await apiKinopoisk.searchByFilter(currentParams, page);
        if (newState.items.length > 0) {
          newState.items.forEach((item, index) => new SearchExtendedCard(container, item, index + 1));
        }
      } else if (status === 'yearSearch') {
        const currentYear = state.getFilterYearTo().toString();
        const newState = await apiKinopoisk.searchByYear(currentYear, page);
        if (newState.items.length > 0) {
          newState.items.forEach((item, index) => new SearchExtendedCard(container, item, index + 1));
        }
      } else {
        const topStatus = state.getSearchTopStatus();
        const newState = await apiKinopoisk.searchTopFilms(topStatus, page);
        if (newState.films.length > 0) {
          newState.films.forEach((item, index) => new SearchListCard(container, item, index + 1));
        }
      }
    }
  }
}

const extendedInfiniteScroll = new InfiniteScroll();
export default extendedInfiniteScroll;
