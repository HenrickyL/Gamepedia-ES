import axios from "axios";
import * as request from './Requests'

export const api = axios.create({
    baseURL: process.env.REACT_APP_URL 
    || 'https://localhost:5000',
    headers: {'X-Custom-Header': 'foobar'}
});

export const imgApi = axios.create({
    headers:{
        'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
    }
})

export const uploadImage = (file:any)=>{
    const data = new FormData();
    data.append('image',file, file.name)
    const url = "https://api.imgur.com/3/image"
    const CLIENT_ID = process.env.REACT_APP_IMGUR_CLIENT_ID
    const options = {
        method: 'POST',
        body: data,
        headers:{
            'Authorization': `Client-ID ${CLIENT_ID}`  
        }
    }
    const promiseCallBack = (resolve:any, reject:any)=>{
        fetch(url,options)
            .then(response=> response.json())
            .then(resolve )
            .catch(reject)
    };
    return new Promise(promiseCallBack);
}

export {
    request
}