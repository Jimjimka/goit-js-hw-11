export function createGallary (item){
    return item
    .map(
        ({webformatURL,largeImageURL,tags,likes,views,comments,downloads})=>`
        <div class="photo-card">
        <a href="${largeImageURL}" class="card-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="400" height="210" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>downloads: ${downloads}</b>
          </p>
        </div>
      </div>
        `).join('');
        

}