import './css/styles.css';
import axios from "axios";
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

let page = 1;
let isVisible = 0;

loadMoreBtn.style.display = 'none';

searchForm.addEventListener('submit', onSearchQuery);
loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() { 
  loadMoreBtn.style.display = 'none';
    page += 1;
    const name = searchForm.querySelector('input').value.trim();
    pixabayGallaryAPI(name, page);
    loadMoreBtn.style.display = 'flex';

}


searchForm.querySelector('input');
function onSearchQuery(evt) { 
    evt.preventDefault();
    isVisible = 0;
    galleryContainer.innerHTML = '';

    const name = searchForm.querySelector('input').value.trim();

    if (name !== '') {
      pixabayGallaryAPI(name);
    } else { 
      loadMoreBtn.style.display = 'none';
      return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    }
}

async function pixabayGallaryAPI(name, page) { 
    const URL = 'https://pixabay.com/api/';

    const options = {
        params: { 
            key: '34989371-d98b3f165afd7d2509d6f9eb9',
            q: name, 
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: page,
            per_page: 40,
        },
    };

    try {
        const response = await axios.get(URL, options);
        isVisible += response.data.hits.length;

        message(
            response.data.hits.length,
            isVisible,
            options.params.per_page,
            response.data.total
        );

        createGalleryMarkup(response.data);
    } catch (error) { 
        console.log(error);
    }
}

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


function createGalleryMarkup(items) { 
    const renderMarkup = items.hits.map(item =>
        `<a href="${item.largeImageURL}">
            <div class="photo-card">
            <div>
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
            </div>
                    <div class="card-info">
                        <p class="card-item">
                            <b>Likes</b>
                            ${item.likes}
                        </p>
                        <p class="card-item">
                            <b>Views</b>
                            ${item.views}
                        </p>
                        <p class="card-item">
                            <b>Comments</b>
                            ${item.comments}
                        </p>
                        <p class="card-item">
                            <b>Downloads</b>
                            ${item.downloads}
                        </p>
                    </div>
            </div>
        </a>`).join('');
        galleryContainer.insertAdjacentHTML('beforeend', renderMarkup);
    simpleLightBox.refresh();
}


function message(length, isVisible, per_page, total) { 
    if (!length) { 
        Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    }
    if (length >= isVisible) { 
      loadMoreBtn.style.display = 'flex';
        Notify.info(
            `Hooray! We found ${total} images.`
        );
    }
    if (isVisible >= total) { 
        Notify.info(
            "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtn.style.display = 'none';
    }
}