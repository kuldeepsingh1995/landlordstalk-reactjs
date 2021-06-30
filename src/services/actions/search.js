import axios from 'axios';
import {BASE_URL} from './api';


export const callAxios = ({ method, url, form, data }) => {
    return axios({
        method,
        url,
        headers: {
          ...form && {
            'Content-Type': `multipart/form-data`,
          }
        },
        ...data
      })
};


export const searchFilter = (payload) => (dispatch) => {
    try {
        const response = await callAxios({ method: 'GET', url: BASE_URL+payload.url, form: payload.form, data: payload.data });
        console.log(response, 'response');
        return response;
    } catch(err) {
        console.log(err);
    }
}