import Cookies from 'js-cookie';

function CheckAuthorization() {
    const JWT = Cookies.get('Token');
    return JWT !== undefined;
}

export default CheckAuthorization;