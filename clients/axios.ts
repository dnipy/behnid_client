import axios from 'axios'
import { usersession, BACK_END } from './localStorage';

console.log({usersession})
const ApiRequest = axios.create({
    baseURL: `${BACK_END}/api`,
    timeout: 15000,
    headers: {},
}); 

process.env.BACK_END

const AuthorizedApiRequest = axios.create({
    baseURL: `${BACK_END}/api`,
    timeout: 15000,
    headers: {'Authorization': `bearer ${usersession as string}`  }
}); 

const AuthorizedApiRequestImage = axios.create({
    baseURL: `${BACK_END}/api`,
    timeout: 20000,
    headers: {'Authorization': `bearer ${usersession as string}` , "Content-Type" : "multipart/form-data" }
});

export {ApiRequest,AuthorizedApiRequest,AuthorizedApiRequestImage}