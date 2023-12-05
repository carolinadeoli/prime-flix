import axios from 'axios';
//base da url: https://api.themoviedb.org/3/
//url da api: https://api.themoviedb.org/3/movie/now_playing?api_key=1d926f5a9bfdd6391523177e55567010&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;