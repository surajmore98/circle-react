import axios from "axios";

export const getAllPosts = async () => {
    return await axios.get("api/posts");
}

export const insertPost = async ({ content, image, token}) => {
    let imageResult;
    if(image) {
        imageResult = await uploadImage(image);
    }

    return await axios.post("api/posts" , {
        postData: {
            content: content,
            media: imageResult ? imageResult.secure_url : "",
            deletetoken: imageResult ? imageResult.delete_token : ""
        } 
    },
    {
        headers: {
            authorization: token
        }
    });
}

export const updatePostDetail = async ({ id, content, image, deleteToken, token, isImageChanged}) => {
    let imageResult;
    if(deleteToken && isImageChanged) {
        imageResult = await removeImage(deleteToken);
    }

    if(image) {
        imageResult = await uploadImage(image);
    }

    return await axios.post(`api/posts/edit/${id}` , {
        postData: {
            content: content,
            media: imageResult ? imageResult.secure_url : "",
            deletetoken: imageResult ? imageResult.delete_token : ""
        } 
    },
    {
        headers: {
            authorization: token
        }
    });
}

export const removePost = async({id, token}) => {
    return await axios.delete(`/api/posts/${id}`,
    {
        headers: {
            authorization: token
        }
    });
}

export const addLike = async({id, token}) => {
    return await axios.post(`/api/posts/like/${id}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const removeLike = async({id, token}) => {
    return await axios.post(`/api/posts/dislike/${id}`,
    { },
    {
        headers: {
            authorization: token
        }
    });
}

export const remove = async({id, token}) => {
    return await axios.delete(`/api/user/posts/${id}`, {
        headers: {
            authorization: token
        }
    });
}

export const uploadImage = async (fileData) => {
    const data = new FormData();
    data.append("file", fileData)
    data.append("upload_preset", "circle");
    data.append("cloud_name","breellz");

    const request = {
        method: "POST",
        body: data,
    };
    return fetch("https://api.Cloudinary.com/v1_1/dxe21vniv/image/upload", request).then(res => res.json());
}

export const removeImage = async (deleteToken) => {
    const formData = new FormData();
      formData.append(
        "upload_preset",
        "circle"
      );
      formData.append("token", deleteToken);
      await fetch("https://api.cloudinary.com/v1_1/dxe21vniv/delete_by_token", {
        method: "POST",
        body: formData,
      });
}