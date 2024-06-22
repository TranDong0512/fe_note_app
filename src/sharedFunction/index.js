import Cookies from "js-cookie";
const COOKIE_KEY = 'TokenUser'

export const getCurrentToken = () => {

    return Cookies.get(COOKIE_KEY);
};