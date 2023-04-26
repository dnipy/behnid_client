import axios from 'axios'
import { usersession, BACK_END } from './localStorage';

console.log({usersession})
console.log({BACK_END})

const ApiRequest = axios.create({
    baseURL: `${BACK_END}/api`,
    // baseURL: `http://localhost:3001/api`,
    withCredentials : true,
    timeout: 15000,
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});  

// process.env.BACK_END

const AuthorizedApiRequest = axios.create({
    baseURL: `${BACK_END}/api`,
    // baseURL: `http://localhost:3001/api`,
    withCredentials : true,
    timeout: 15000,
    headers: {
        'Authorization': `bearer ${usersession as string}`,
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
}); 

const AuthorizedApiRequestImage = axios.create({
    baseURL: `${BACK_END}/api`,
    // baseURL: `http://localhost:3001/api`,
    withCredentials : true,
    timeout: 20000,
    headers: {
        'Authorization': `bearer ${usersession as string}` ,
        "Content-Type" : "multipart/form-data",
        // 'Access-Control-Allow-Origin': '*',
    },
});

export {ApiRequest,AuthorizedApiRequest,AuthorizedApiRequestImage}