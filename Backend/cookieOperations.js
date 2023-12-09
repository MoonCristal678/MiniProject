// cookieOperations.js
import * as Cookies from 'js-cookie';

const getMyUserIdCookie = () => {
  return Cookies.get('myUserIdCookie');
};

export { getMyUserIdCookie };
