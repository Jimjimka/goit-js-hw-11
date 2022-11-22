import {PixabayAPI} from '../src/js/api'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import {createGallary} from './gallary';


const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');


const pixabayAPI = new PixabayAPI();

const lightbox = new SimpleLightbox('.photo-card a')

const onSearchFormSubmit = async event =>{
    event.preventDefault();
    console.log(pixabayAPI);
    pixabayAPI.searchQuery = event.currentTarget.elements.searchQuery.value;
    pixabayAPI.page = 1;
    loadMoreBtnEl.classList.add('is-hiden');

        try {
            const { data } = await pixabayAPI.fetchPhoto()
            console.log(data);
        
            galleryEl.innerHTML = createGallary(data.hits);
            lightbox.refresh();

            if (data.totalHits > pixabayAPI.per_page) {
                loadMoreBtnEl.classList.remove('is-hiden');
                loadMoreBtnEl.addEventListener('click', onloadMoreBtnElClick);
                
            } 

            if (data.totalHits === 0) { 
                galleryEl.innerHTML = '';
                 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                return 
            }      
            
                 Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)

     } catch (err) { 
console.log(err)


}
}


const onloadMoreBtnElClick = async event => {
    
    try {
        pixabayAPI.page += 1;
        const { data } = await pixabayAPI.fetchPhoto()

        galleryEl.insertAdjacentHTML('beforeend', createGallary(data.hits));
              lightbox.refresh();

        if (data.hits.length === 0) { 
              
                 loadMoreBtnEl.classList.add('is-hiden');  
                 loadMoreBtnEl.removeEventListener('click', onloadMoreBtnElClick);  
                 Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                 return
        }         
     } catch (err) { 
console.log(err)
    }

}

formEl.addEventListener('submit', onSearchFormSubmit)


