import axios from 'axios'

const serverApi = axios.create({
    baseURL: 'https://genkai.rinafira.my.id'
  });

export default serverApi