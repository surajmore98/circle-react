import axios from "axios";

export const createComment = async({id, data, token}) => {
    return await axios.post(`/api/comments/add/${id}`,
    { 
        commentData: data
    },
    {
        headers: {
            authorization: token
        }
    });
}

export const upvotePostComment = async({id, postId, token}) => {
    return await axios.post(`api/comments/upvote/${postId}/${id}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const downvotePostComment = async({id, postId, token}) => {
    return await axios.post(`api/comments/downvote/${postId}/${id}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const removePostComment = async({id, postId, token}) => {
    return await axios.post(`api/comments/delete/${postId}/${id}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
} 