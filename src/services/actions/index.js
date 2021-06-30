import * as api from './api';
import axios from 'axios';
import { UserConstants } from '../../constants/UserConstants';
axios.defaults.paramsSerializer = function (params) {
  let str = '';
  Object.keys(params).forEach((key, index) => {
    if (index) {
      str += '&';
    }
    str += key + '=' + params[key];
  });
  return str;
};
export const ActionNames = {
  SEND_INITIAL_EMAIL: 'SEND_INITIAL_EMAIL',
  SET_NOTIFICATION_READ: 'SET_NOTIFICATION_READ',
  ADMIN_CONTACT_GET: 'ADMIN_CONTACT_GET',
  ADMIN_CONTACT_DELETE: 'ADMIN_CONTACT_DELETE',
  ADMIN_CONTACT_LIST: 'ADMIN_CONTACT_LIST',
  ADMIN_NOTIFICATION_SEARCH: 'ADMIN_NOTIFICATION_SEARCH',
  SOCIAL_LOGIN: 'SOCIAL_LOGIN',
  ADMIN_UPDATE_REVIEW_STATUS: 'ADMIN_UPDATE_REVIEW_STATUS',
  ADMIN_REVIEW_DELETE: 'ADMIN_REVIEW_DELETE',
  ADMIN_REVIEW_SEARCH: 'ADMIN_REVIEW_SEARCH',
  ADMIN_REVIEW_UPDATE: 'ADMIN_REVIEW_UPDATE',
  ADMIN_USER_DELETE: 'ADMIN_USER_DELETE',
  ADMIN_USER_LIST: 'ADMIN_USER_LIST',
  ADMIN_USER_UPDATE: 'ADMIN_USER_UPDATE',
  USER_CHANGE_PASSWORD: 'USER_CHANGE_PASSWORD',
  ADMIN_USER_DELETE: 'ADMIN_USER_DELETE',
  ADMIN_USER_LIST: 'ADMIN_USER_LIST',
  BLOG_DETAIL_API: 'BLOG_DETAIL_API',
  BLOG_LIST: 'BLOG_LIST',
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD',
  ADMIN_LOGIN: 'ADMIN_LOGIN',
  USER_RESET_PASSWORD: 'USER_RESET_PASSWORD',
  USER_FORGET_PASSWORD: 'USER_FORGET_PASSWORD',
  BLOG_COMMENT_ADD: 'BLOG_COMMENT_ADD',
  SUBSCRIBE_NEWSLETTER: 'SUBSCRIBE_NEWSLETTER',
  USER_CONTACT: 'USER_CONTACT',
  TENANT_REVIEW_SEARCH: 'TENANT_REVIEW_SEARCH',
  QUESTION_LIST: 'QUESTION_LIST',
  NEW_REVIEW: 'NEW_REVIEW',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER_LANDLORD: 'REGISTER_LANDLORD',
  FORGOT: 'FORGOT',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  ADMIN_USER_UPDATE: 'ADMIN_USER_UPDATE',
  ADMIN_REVIEW_GET: 'ADMIN_REVIEW_GET',
  ADMIN_BLOG_SEARCH: 'ADMIN_BLOG_SEARCH',
  ADMIN_BLOG_STATUS_CHANGE: 'ADMIN_BLOG_STATUS_CHANGE',
  ADMIN_BLOG_CATEGORY_SEARCH: 'ADMIN_BLOG_CATEGORY_SEARCH',
  ADMIN_BLOG_ACTION: 'ADMIN_BLOG_ACTION',
  ADMIN_BLOG_DELETE: 'ADMIN_BLOG_DELETE',
  ADMIN_BLOG_GET: 'ADMIN_BLOG_GET',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
  UPLAOD_FILE: 'UPLAOD_FILE',
  ADMIN_USER_GET: 'ADMIN_USER_GET',
  NOTIFICATION_COUNT: 'NOTIFICATION_COUNT',
  // GET_USER_DETAILS: 'GET_USER_DETAILS',
  // LOGOUT_ALL: 'LOGOUT_ALL',
  // GET_NOTES: 'GET_NOTES',
  // ADD_NOTE: 'ADD_NOTE',
  // UPDATE_NOTE: 'UPDATE_NOTE',
  // DELETE_NOTE: 'DELETE_NOTE',
  // GET_CONFIG: 'GET_CONFIG',
  // SEND_OTP: 'SEND_OTP',
  // VERIFY_OTP: 'VERIFY_OTP',
  // SHOW_MESSAGE: 'SHOW_MESSAGE',
  // HIDE_MESSAGE: 'HIDE_MESSAGE',
  // GET_TIPS: 'GET_TIPS',
  // ADD_TIP: 'ADD_TIP',
  // TOGGLE_DRAWER: 'TOGGLE_DRAWER'
};
const actionConfig = {
  SEND_INITIAL_EMAIL: {
    url: api.SEND_INITIAL_EMAIL,
    method: 'POST',
    user_type: 'user',
  },
  SET_NOTIFICATION_READ: {
    url: api.SET_NOTIFICATION_READ,
    method: 'POST',
    user_type: 'admin',
  },

  ADMIN_CONTACT_LIST: {
    url: api.ADMIN_CONTACT_LIST,
    method: 'POST',
    user_type: 'admin',
  },
  ADMIN_CONTACT_DELETE: {
    url: api.ADMIN_CONTACT_DELETE,
    method: 'POST',
    user_type: 'admin',
  },
  ADMIN_CONTACT_GET: {
    url: api.ADMIN_CONTACT_GET,
    method: 'POST',
    user_type: 'admin',
  },
  ADMIN_USER_GET: {
    url: api.ADMIN_USER_GET,
    method: 'POST',
    user_type: 'admin',
  },
  UPLAOD_FILE: {
    url: api.UPLAOD_FILE,
    method: 'POST',
    user_type: 'user',
    form: true
  },
  VERIFY_EMAIL: {
    url: api.VERIFY_EMAIL,
    method: 'POST',
    user_type: 'user'
  },
  SOCIAL_LOGIN: {
    url: api.SOCIAL_LOGIN,
    method: 'POST',
    user_type: 'user'
  },
  USER_CHANGE_PASSWORD: {
    url: api.USER_CHANGE_PASSWORD,
    method: 'POST',
    user_type: 'user'
  },
  REGISTER_LANDLORD: {
    url: api.REGISTER_LANDLORD,
    method: 'POST',
    user_type: 'user'
  },
  LOGIN: {
    url: api.LOGIN,
    method: 'POST',
    user_type: 'user'
  },
  NEW_REVIEW: {
    url: api.NEW_REVIEW,
    method: 'POST',
    user_type: 'user',
    form: true
  },
  QUESTION_LIST: {
    url: api.QUESTION_LIST,
    method: 'POST',
    user_type: 'user'
  },
  TENANT_REVIEW_SEARCH: {
    url: api.TENANT_REVIEW_SEARCH,
    method: 'POST',
    user_type: 'user'
  },
  USER_CONTACT: {
    url: api.USER_CONTACT,
    method: 'POST',
    user_type: 'user'
  },
  SUBSCRIBE_NEWSLETTER: {
    url: api.SUBSCRIBE_NEWSLETTER,
    method: 'POST',
    user_type: 'user'
  },
  BLOG_COMMENT_ADD: {
    url: api.BLOG_COMMENT_ADD,
    method: 'POST',
    user_type: 'user'
  },
  USER_FORGET_PASSWORD: {
    url: api.USER_FORGET_PASSWORD,
    method: 'POST',
    user_type: 'user'
  },
  USER_RESET_PASSWORD: {
    url: api.USER_RESET_PASSWORD,
    method: 'POST',
    user_type: 'user'
  },
  ADMIN_LOGIN: {
    url: api.ADMIN_LOGIN,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_DASHBOARD: {
    url: api.ADMIN_DASHBOARD,
    method: 'POST',
    user_type: 'admin'
  },
  BLOG_LIST: {
    url: api.BLOG_LIST,
    method: 'POST'
  },
  BLOG_DETAIL_API: {
    url: api.BLOG_DETAIL_API,
    method: 'POST',
    user_type: 'admin'
  },
 
  ADMIN_USER_LIST: {
    url: api.ADMIN_USER_LIST,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_USER_DELETE: {
    url: api.ADMIN_USER_DELETE,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_USER_UPDATE: {
    url: api.ADMIN_USER_UPDATE,
    method: 'POST',
    user_type: 'admin',
    form: true
  },

  ADMIN_REVIEW_SEARCH: {
    url: api.ADMIN_REVIEW_SEARCH,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_REVIEW_DELETE: {
    url: api.ADMIN_REVIEW_DELETE,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_REVIEW_UPDATE: {
    url: api.ADMIN_REVIEW_UPDATE,
    method: 'POST',
    user_type: 'admin',
    form: true
  },
  ADMIN_REVIEW_GET: {
    url: api.ADMIN_REVIEW_GET,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_UPDATE_REVIEW_STATUS: {
    url: api.ADMIN_UPDATE_REVIEW_STATUS,
    method: 'POST',
    user_type: 'admin'
  },

  ADMIN_BLOG_SEARCH: {
    url: api.ADMIN_BLOG_SEARCH,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_BLOG_STATUS_CHANGE: {
    url: api.ADMIN_BLOG_STATUS_CHANGE,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_BLOG_CATEGORY_SEARCH: {
    url: api.ADMIN_BLOG_CATEGORY_SEARCH,
    method: 'POST',
    user_type: 'admin'
  },
  ADMIN_BLOG_ACTION: {
    url: api.ADMIN_BLOG_ACTION,
    method: 'POST',
    user_type: 'admin',
    form: true
  },
  ADMIN_BLOG_DELETE: {
    url: api.ADMIN_BLOG_DELETE,
    method: 'POST',
    user_type: 'admin',
  },
  ADMIN_BLOG_GET: {
    url: api.ADMIN_BLOG_GET,
    method: 'POST',
    user_type: 'admin',
  },
  ADMIN_NOTIFICATION_SEARCH: {
    url: api.ADMIN_NOTIFICATION_SEARCH,
    method: 'POST',
    user_type: 'admin',
  },
  NOTIFICATION_COUNT: {
    url: api.NOTIFICATION_COUNT,
    method: 'POST',
    user_type: 'admin',
  },
  
  
};
export function createAction(type, payload, showloadig=true) {
  if(showloadig){
    document.getElementById('loader').classList.remove('loader-hidden');
    document.getElementById('root').classList.add('hide-overflow');
  }

  const config = actionConfig[type];
  if (!config) {
    console.warn('action configuration is absent for' + type);
    return;
  }
  if(config.user_type=='admin'){
    axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('llt_admin');
  }else{
    axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('llt_user');
  }
  config.body = payload;
  const { url, method, body, form } = config;
  let data = { params: payload };
   

  if (form) {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      formData.append(key, payload[key]);
    });
    console.log(formData, 'formData')
    data = { data: formData };
    
  }else{
    if (body) {
      data = { data: payload };
    }
  }
  return {
    type,
    payload: axios({
      method,
      url,
      headers: {
        ...form && {
          'Content-Type': `multipart/form-data`,
        }
      },
      ...data
    }).then((res) => {
      if(showloadig){
        document.getElementById('loader').classList.add('loader-hidden');
        document.getElementById('root').classList.remove('hide-overflow');
      }
     
      return res;
    }).catch(err => {
      const resp = err.response;
      if(resp.status==401){
        // dispatch({
        //   type: UserConstants.LOGOUT,
        //  })
        //  dispatch({
        //   type: UserConstants.ADMIN_LOGOUT,
        //  })
        if(showloadig){
          document.getElementById('loader').classList.add('loader-hidden');
          document.getElementById('root').classList.remove('hide-overflow');
        }
        // alert('problem with auth token')      
        window.location.href = '/';
        if(config.user_type=='admin'){
          localStorage.removeItem('llt_admin');
          localStorage.removeItem('llt_admin_obj');
        }else if(config.user_type=='user'){
          localStorage.removeItem('llt_user');
          localStorage.removeItem('llt_user_obj');
        }
      }

    }),
  };
}
