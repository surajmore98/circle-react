const TOKEN = "token";
const USER = "user";

export const setLocalStorageToken = (token) => localStorage.setItem(TOKEN, token);

export const setLocalStorageUser = (user) => localStorage.setItem(USER, JSON.stringify(user));

export const removeLocalStorageData = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
}

export const getLocalStorageToken = () => localStorage.getItem(TOKEN);

export const getLocalStorageUser = () => localStorage.getItem(USER);