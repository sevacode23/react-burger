import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-zvp-burger.firebaseio.com/'
})

export default instance;