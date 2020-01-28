const rp = require('request-promise');

let _transform = (body, response) => { return { 'headers': response.headers, 'body': body, 'status': response.statusCode } };


class LkRestService {
    reqAuth(username, password) {
        let options = {
            method: 'POST',
            uri: 'https://auth.mango-office.ru/auth/vpbx',
            formData: {
                'username': username,
                'password': password,
                'app': 'ics'
            },
            json: true,
            transform: _transform
        };
        return rp(options);
    }

    reqSessionAuth(authDTO) {
        let options = {
            method: 'POST',
            uri: 'https://lk.mango-office.ru/auth/create-session',
            formData: {
                'auth_token': authDTO.auth_token,
                'refresh_token': authDTO.refresh_token,
                'username': authDTO.username,
                'app': 'ics'
            },
            json: true,
            transform: _transform
        };
        return rp(options);
    }
}


module.exports = LkRestService;