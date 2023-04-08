import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchImages from './fetchImages';
// import createGalleryMarkup from './createGalleryMarkup';

const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

let isShown = 0;
const galleryApi = new GalleryApi();
let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

// const options = {
//   rootMargin: '50px',
//   root: null,
//   threshold: 0.3,
// };

// const observer = new IntersectionObserver(makeLoadMore, options);


searchForm.addEventListener('submit', onSearchQuery);
buttonLoadMore.addEventListener('click', makeLoadMore);

function onSearchQuery(evt) {
  evt.preventDefault();

  gallery.innerHTML = '';
  galleryApi.query =
    evt.currentTarget.elements.searchQuery.value.trim();
    galleryApi.resetPage();

  if (galleryApi.query === '') {
    Notify.warning('Please, fill the main field');
    return;
  }

  isShown = 0;
  fetchImages();
  createGalleryMarkup(hits);
}

function makeLoadMore() {
  galleryApi.incrementPage();
  fetchImages();
}

async function fetchImages() {
  buttonLoadMore.classList.add('is-hidden');

  const result = await galleryApi.fetchImages();
  const { hits, total } = result;
  isShown += hits.length;

  if (!hits.length) {
   Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    buttonLoadMore.classList.add('is-hidden');
    return;
  }

  createGalleryMarkup(hits);
  isShown += hits.length;

  if (isShown < total) {
   Notiflix.Notify.success(`Hooray! We found ${total} images !!!`);
    buttonLoadMore.classList.remove('is-hidden');
  }

  if (isShown >= total) {
   Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function createGalleryMarkup(el) {
  const markup = el
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}