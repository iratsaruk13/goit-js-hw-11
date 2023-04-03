export default function createGalleryMarkup() {
    const createdGalleryItem = items.data.hits.map(({ comments,
        downloads,
        largeImageURL,
        webformatURL,
        views,
        tags,
        likes }) => {
        return `
        <a class="gallery-link href="${largeImageURL}"
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>
      </a>`;
      })
      .join('');
      return createdGalleryItem;
}


