
import axios from 'axios';

const movie_annual2018_base_url = `/fakeApi/ithil_j/activity/movie_annual2018`

export const api_movie2018 = axios.create({
  baseURL: movie_annual2018_base_url,
  // headers: {}
})
