// cookieOperations.js
import Cookies from 'js-cookie';

const getMyUserIdCookie = () => {
  return Cookies.get('myUserIdCookie');
};

export { getMyUserIdCookie };
