import { UserConstants } from '../../constants/UserConstants';
import axios from 'axios';

const initialState =  {
    dashboard_data: null,
 };

 
export function dashboard_data(state = initialState, action) {
  switch (action.type)  {
    case UserConstants.SET_DASHBOARD_DATA:
      return {
       ...state,
       dashboard_data: action.payload,
      };
    
    default:
      return state
  }
}