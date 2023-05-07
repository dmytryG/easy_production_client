import Cookies from 'js-cookie';

function SaveAuthorization(user, token) {
    Cookies.set('Token', 'JWT ' + token);
    Cookies.set('fullName', user.fullName);
    console.log(`Saving login ${user.fullName}, ${'JWT ' + token}`)
}

export default SaveAuthorization;