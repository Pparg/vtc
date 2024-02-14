import Cookies from "js-cookie";


export function setCookies (token) {
  Cookies.set('token', token, {expires: 7, path: '/'})
}

export function getCookies (name) {
  Cookies.get(name)
}