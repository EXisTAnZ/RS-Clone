class ApiServiceKinopoisk {
  private apiKey = '1eed0f50-3f3b-49f1-b171-1547c878ae42';

  private baseUrl: string = 'https://kinopoiskapiunofficial.tech/api';

  private filmData: string = `${this.baseUrl}/v2.2/films`;

  private filmStaff: string = `${this.baseUrl}/v1/staff?filmId=`;

  // Выбор топ фильмов TOP_100_POPULAR_FILMS, TOP_250_BEST_FILMS, TOP_AWAIT_FILMS
  // Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
  private topFilms: string = `${this.filmData}/top?type=TOP_100_POPULAR_FILMS&page=`;

  public async getFilmData(id: number): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  // Данный эндпоинт возвращает изображения связанные с фильмом с пагинацией.
  // Каждая страница содержит не более чем 20 фильмов.
  // Доступные изображения:
  // STILL - кадры
  // SHOOTING - изображения со съемок
  // POSTER - постеры
  // FAN_ART - фан-арты
  // PROMO - промо
  // CONCEPT - концепт-арты
  // WALLPAPER - обои
  // COVER - обложки
  // SCREENSHOT - скриншоты
  public async getFilmImages(id: number, page = 1): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/images?type=POSTER&page=${page}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmReviews(id: number): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/reviews`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmVideos(id: number): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/videos`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmBoxOffice(id: number): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/box_office`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmStaff(id: number): Promise<void> {
    const response = await fetch(`${this.filmStaff}${id}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getTopData(page = 1): Promise<void> {
    const response = await fetch(`${this.topFilms}${page}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }
}

const apiKinopoisk = new ApiServiceKinopoisk();
export default apiKinopoisk;