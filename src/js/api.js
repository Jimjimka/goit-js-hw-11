'use strict';
import axios from 'axios';
BASE_URL = 'https://pixabay.com/api/'
API_KEY = '31447309-c48142debbc2e62fc86ad26d0'

export class PixabayAPI{
  
    
    constructor(){
        this.page=1;
        this.searchQuery='';
        this.per_page = 40;
    }

    fetchPhoto() {
        const options = {
          key: API_KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: this.page,
          per_page: this.per_page,
        };

        return axios.get(`${BASE_URL}`, { params: options });
    
}

}