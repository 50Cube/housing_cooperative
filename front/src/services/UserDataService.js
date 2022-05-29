import Cookies from 'js-cookie';

export const saveToCookies = (key, value) => {
    Cookies.set(key, value, { path: '/' });
}

export const getFromCookies = (key) => {
    const valueCookies = Cookies.get(key);
    if (valueCookies) return valueCookies;
    else return null;
}

export const deleteFromCookies = (key) => {
    Cookies.remove(key, { path: '/' });
}

export const getLanguage = () => {
    return window.localStorage.lang ? window.localStorage.lang : "pl";
}

export const getCurrentAccessLevel = () => {
    return sessionStorage.getItem("role");
}