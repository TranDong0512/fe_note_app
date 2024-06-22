import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { RefToken } from "../service/userService";

let axiosJWT = axios.create();
let token = Cookies.get("TokenUser");
axios.defaults.withCredentials = true;

axiosJWT.interceptors.request.use(
    async (config) => {
        if (!token || typeof token !== 'string') {
            console.error('Token is not valid or not a string');
            return config;
        }
        let date = new Date();
        let decodeToken;
        try {
            decodeToken = jwtDecode(token);
        } catch (error) {
            console.error('Invalid token specified:', error);
            return config;
        }
        if (decodeToken.exp < date.getTime() / 1000) {
            try {
                const data = await RefToken();
                let cleanToken = data.data.newAccessToken.replace(/"/g, '');
                Cookies.set('TokenUser', cleanToken)
                config.headers['Authorization'] = `Bearer ${cleanToken}`;
            } catch (error) {
                console.log(error);
            }
        } else {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const axiosCustom = axiosJWT;