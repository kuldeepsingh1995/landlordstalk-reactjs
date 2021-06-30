import { UserConstants } from '../../constants/UserConstants';
import axios from 'axios';

let user = localStorage.getItem('llt_user');
let user_obj = false;
if(localStorage.getItem('llt_user_obj')){
  user_obj = JSON.parse(localStorage.getItem('llt_user_obj'));
}

let admin = localStorage.getItem('llt_admin');
let admin_obj = false;
if(localStorage.getItem('llt_admin_obj') && localStorage.getItem('llt_admin_obj')!='undefined'){
  admin_obj = JSON.parse(localStorage.getItem('llt_admin_obj'));
}


const initialState =  {
  user: user ? { loggedIn: true, user, user_obj } : {},
  admin: admin ? { loggedIn: true, admin, admin_obj } : {} 
};

console.log(initialState, 'initialState')

export function authentication(state = initialState, action) {
  switch (action.type)  {
    // case UserConstants.LOGIN_REQUEST:
    //   return {
    //     loggingIn: true,
    //     user: action.user
    //   };
    
    case UserConstants.ADMIN_LOGIN_SUCCESS:
      axios.defaults.headers.Authorization = 'Bearer ' + action.payload.admin;
      // axios.defaults.params = 
      // {
      //    access_token:user
      // }
      return {
       ...state,
       admin: {
        loggedIn: true,
        admin: action.payload.admin,
        admin_obj: action.payload.admin_obj
       }
      };
    case UserConstants.LOGIN_SUCCESS:
      // axios.defaults.headers.Authorization = 'Bearer ' + action.payload.user;
      // axios.defaults.params = 
      // {
      //    access_token:user
      // }
      return {
        ...state,
        user: {
          loggedIn: true,
          user: action.payload.user,
          user_obj: action.payload.user_obj
        }
      };

      case UserConstants.UPDATE_USER:
       
        return {
          ...state,
          user: {
            ...state.loggedIn,
            ...state.user,
            user_obj: action.payload.user_obj
          }
        };
    case UserConstants.LOGIN_FAILURE:
      return {};

      
    case UserConstants.ADMIN_LOGOUT:
      localStorage.removeItem('llt_admin');
      localStorage.removeItem('llt_admin_obj');
      return {
        ...state,
        admin: {
          loggedIn: false,
          admin: null,
          admin_obj: null
        }
      };
    case UserConstants.LOGOUT:
      localStorage.removeItem('llt_user');
      localStorage.removeItem('llt_user_obj');
      return {
        ...state,
        user: {
          loggedIn: false,
          user: null,
          user_obj: null
        }
      };
    default:
      return state
  }
}