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