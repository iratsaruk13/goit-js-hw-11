import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPictures from './fetchImages';

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
  evt.target.reset();
};

function clearMarkup() {
  gallery.innerHTML = '';
};



function createGalleryMarkup(items) {
page +=1;
totalHits = items.data.totalHits;

if (items.data.hits.length === 0) {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

// const createdGalleryItem = items.data.hits.map(({ comments,
//   downloads,
//   largeImageURL,
//   webformatURL,
//   views,
//   tags,
//   likes }) => {
//   return `
//   <a class="gallery-link href="${largeImageURL}"
//   <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${downloads}</b>
//     </p>
//   </div>
// </div>
// </a>`;
// })
// .join('');

const createdGalleryItem = pictures.data.hits.map(el => {
  const createdElement = `
  <a class="gallery-link href="${el.largeImageURL}"
//   <div class="photo-card">
//   <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${el.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${el.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${el.comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${el.downloads}</b>
//     </p>
//   </div>
// </div>
// </a>
  `;
  return createdElement;
}).join('');

gallery.insertAdjacentHTML('afterbegin', createdGalleryItem);

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
      
      createGalleryMarkup(response);
  
  } catch (error) {
  onFetchError(error);
  }
}