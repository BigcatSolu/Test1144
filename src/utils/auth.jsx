import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
    return Cookies.get('token');
};

export const setToken = (token) => {
    Cookies.set('token', token);
}

export const clearToken = () => {
    Cookies.remove('token');
}

export const getTokenExpirationTime = (token) => {
    if (!token) {
        console.error('Token is undefined');
        return 0;
    }
    // const payload = JSON.parse(atob(token.split('.')[1]));
    const payload = jwtDecode(token);
    // console.log(payload)
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    console.log(expirationTime - currentTime)
    return expirationTime - currentTime;
};

export function logout() {
    clearToken();
    window.location.href = "/login"; // Adjust the URL to your login page
}
