import { UserConstants } from '../../constants/UserConstants';
import axios from 'axios';

const initialState =  {
   user: null,
   admin: null,
 };

 
export function notifications(state = initialState, action) {
  switch (action.type)  {
    case UserConstants.SET_USER_NOTIFICATION_DATA:
      return {
       ...state,
       user: action.payload,
      };
    
    case UserConstants.SET_ADMIN_NOTIFICATION_DATA:
        return {
         ...state,
         admin: action.payload,
        };
    default:
      return state
  }
}