import axios from 'axios'

const cuisineApi = axios.create({
    baseURL: 'https://genkai.rinafira.my.id'
  });

export default cuisineApi