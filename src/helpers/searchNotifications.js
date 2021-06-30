import { useCallback } from "react";
import { UserConstants } from "../constants/UserConstants";
import { ActionNames, createAction } from "../services";

export const searchNotification = (user_type) => (dispatch) => {  
    try {
        let search = {limit: 3};
        if(user_type=='user'){
            let user_ = localStorage.getItem('llt_user_obj');
            user_ = JSON.parse(user_)
            search.landlord_id = user_.landlord_id;
        }

        const fetching = createAction(ActionNames.ADMIN_NOTIFICATION_SEARCH, search, false);
        const resp_data = fetching.payload;
        resp_data.then((resp) => {
            if(user_type=='user'){
                dispatch({
                    type: UserConstants.SET_USER_NOTIFICATION_DATA,
                    payload: resp.data
                });
            }else if(user_type=='admin'){
                dispatch({
                    type: UserConstants.SET_ADMIN_NOTIFICATION_DATA,
                    payload: resp.data
                });
            }

        })

    } catch (e) {
        console.log(e);
        return [];
    }
  };