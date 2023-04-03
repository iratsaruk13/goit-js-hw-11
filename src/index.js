import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPictures from './fetchImages';
import createGalleryMarkup from './createGalleryMarkup';

const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34989371-d98b3f165afd7d2509d6f9eb9';

let searchQuery = '';
let totalHits = 40;
let page = 1;
const maxItemOnPage = 40
const lightboxImage = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 200,
});

searchForm.addEventListener('submit', onSearchQuery);
buttonLoadMore.addEventListener('click', makeLoadMore);


function onSearchQuery(evt) {
  evt.preventDefault();
  searchQuery = evt.target.elements.searchQuery.value.trim('');

  clearMarkup();

  if(!searchQuery) {
    return;
  };
  fetchPictures(searchQuery)
  evt.target.reset();
};

function clearMarkup() {
  gallery.innerHTML = '';
};



function createGallery(items) {
page +=1;
totalHits = items.data.totalHits;

if (items.data.hits.length === 0) {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

gallery.insertAdjacentHTML('afterbegin', createGalleryMarkup);

buttonLoadMore.classList.remove('is-hidden');

lightboxImage.refresh();

if (items.data.hits.length < 40) {
  buttonLoadMore.classList.add('is-hidden')
}

};


function onFetchError() {
  Notiflix.Notify.failure('Error 404');
};

function makeLoadMore() {
  buttonLoadMore.classList.add('is-hidden');

  fetchPictures(searchQuery);
  searchQuery = '';

  if ((totalHits - page * maxItemOnPage) > 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits - page * maxItemOnPage} images.`)
  } else if ((totalHits - page * maxItemOnPage) <40) {
    Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results. :( )`)
  }


  
};

async function fetchPictures(searchQuery) {
  try {
      const response = await axios.get(`${BASE_URL}`, {
          params: {
              key: API_KEY,
              q: searchQuery,
              per_page: maxItemOnPage,
              page: page,
              safesearch: true,
              orientation: 'horizontal',
              image_type: 'photo',
          },
      });
      
      createGallery(response);
  
  } catch (error) {
  onFetchError(error);
  }
}