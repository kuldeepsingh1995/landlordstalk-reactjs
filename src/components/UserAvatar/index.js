import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import user from "../../assets/images/avatar.png";
import { BASE_PATH_USERS } from '../../helpers/UploadDirectory';
const UserAvatar = () => {
    
    const { user_obj } = useSelector((state) => {
        return {
          user_obj: state.authentication.user?.user_obj,
        };
      });
    return (
        <>
        <img src={user_obj ? ( user_obj.profile_photo!=null ?  BASE_PATH_USERS+user_obj.profile_photo : user) : user} />
        <p>{user_obj?.fname}</p>
        </>
    )
};
// Main.displayName = "Loading";
export default UserAvatar;
