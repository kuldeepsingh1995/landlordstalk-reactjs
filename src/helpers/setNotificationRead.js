import { useCallback } from "react";
import { UserConstants } from "../constants/UserConstants";
import { ActionNames, createAction } from "../services";
import { searchNotification } from "./searchNotifications";

export const setNotificationRead = (id, user_type) => (dispatch) => {  
    try {
    
        let search = {id: id}
        const fetching = createAction(ActionNames.SET_NOTIFICATION_READ, search, false);
        const resp_data = fetching.payload;
        resp_data.then((resp) => {
            dispatch(searchNotification(user_type));
        })

    } catch (e) {
        console.log(e);
        return [];
    }
  };