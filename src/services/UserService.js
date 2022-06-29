import axios from "axios";
import { removeImage, uploadImage } from "./MediaService";

export const getUsers = async () => {
    return await axios.get("/api/users");
}

export const getUserByUserName = async (userName) => {
    return await axios.get(`/api/user/${userName}`);
}

export const addBookmark = async({id, token}) => {
    return await axios.post(`/api/users/bookmark/${id}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const removeBookmark = async({id, token}) => {
    return await axios.post(`/api/users/remove-bookmark/${id}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const getBookmarks = async({token}) => {
    return await axios.get("/api/users/bookmark",
    {
        headers: {
            authorization: token
        }
    });
}

export const followUser = async({userId, token}) => {
    return await axios.post(`/api/users/follow/${userId}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const unfollowUser = async({userId, token}) => {
    return await axios.post(`/api/users/unfollow/${userId}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const editUser = async(request) => {
    let imageResult;
    if(request.deleteToken && request.isImageChanged) {
        imageResult = await removeImage(request.deleteToken);
    }

    if(request.profileImage) {
        imageResult = await uploadImage(request.profileImage);
    }

    const userData =  {
        firstName: request.firstName,
        lastName: request.lastName,
        bio: request.bio,
        profileImage: imageResult ? imageResult.secure_url : "",
        deletetoken: imageResult ? imageResult.delete_token : ""
    };
    
    return await axios.post("/api/users/edit",
    { 
        userData
    },
    {
        headers: {
            authorization: request.token
        }
    });
}