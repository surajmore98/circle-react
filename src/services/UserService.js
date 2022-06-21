import axios from "axios";

export const getUsers = async () => {
    return await axios.get("api/users");
}

export const getUserByUserName = async (userName) => {
    return await axios.get(`api/user/${userName}`);
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
    return await axios.post(`/api/users/follow/${userId}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}