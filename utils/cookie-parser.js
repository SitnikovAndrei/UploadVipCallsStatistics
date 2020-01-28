function Cookie(cookie) {
    let result = cookie.reduce((acc, str) =>  { 
        let element = str.split(';')[0].split('=');
        acc[element[0]] = element[1];
        return acc;
     },{});

    return result;
}


module.exports = Cookie;