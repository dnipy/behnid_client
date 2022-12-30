import axios from 'axios'
import { usersession } from './localStorage';

console.log({usersession})
const ApiRequest = axios.create({
    baseURL: 'https://behnid.com/api',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
}); 


const AuthorizedApiRequest = axios.create({
    baseURL: 'https://behnid.com/api',
    timeout: 10000,
    headers: {'Authorization': `bearer ${usersession as string}`  }
}); 

const AuthorizedApiRequestImage = axios.create({
    baseURL: 'https://behnid.com/api',
    timeout: 20000,
    headers: {'Authorization': `bearer ${usersession as string}` , "Content-Type" : "multipart/form-data" }
});

export {ApiRequest,AuthorizedApiRequest,AuthorizedApiRequestImage}