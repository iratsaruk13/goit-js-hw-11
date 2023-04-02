const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34989371-d98b3f165afd7d2509d6f9eb9';

export default async function fetchPictures(searchQuery) {
  try {
      const response = await axios.get(`${BASE_URL}`, {
          params: {
              key: API_KEY,
              q: searchQuery,
              per_page: maxI,
              page: maxItemOnPage,
              safesearch: true,
              orientation: 'horizontal',
              image_type: 'photo',
          },
      });
      
return response;  
  } catch (error) {
    throw new Error(error.message);
  }
}
