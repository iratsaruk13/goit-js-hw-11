import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34989371-d98b3f165afd7d2509d6f9eb9';

export default class GalleryApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PER_PAGE = 40;
  }
  async fetchImages() {
    const options = {
      method: 'get',
      url: BASE_URL,
      params: {
        key: API_KEY,
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
      },
    };
    try {
      const response = await axios(options);

      const data = response.data;

      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  resetEndOfHits() {
    this.endOfHits = false;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

