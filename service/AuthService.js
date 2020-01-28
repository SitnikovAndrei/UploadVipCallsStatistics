const rp = require('request-promise');
const cookieParser = require('../utils/cookie-parser');
const _ = require('lodash');
let AuthDTO = require('../dto/AuthDTO');
let SessionAuthDTO = require('../dto/SessionAuthDTO');
let LkRestService = require('./LkRestService');



let convertToAuthDTO = (status, body, username) => {
    let auth_token = _.get(body, 'auth_token');
    let refresh_token = _.get(body, 'refresh_token');
    return new AuthDTO(true, auth_token, refresh_token, username);
};


let convertToSessionAuthDTO = (response) => {
    let cookie = _.get(response, 'headers.set-cookie');
    let issa7 = cookieParser(cookie)['issa7'];
    return new SessionAuthDTO(true, issa7);
};



class AuthService {

    constructor() {
        this.lkRestService = new LkRestService();
        this.cache = {};
    }


    async getCacheSessionAuthDTO(username, password, expired) {
        let key = username + ":" + password;
        let currenTime = Date.now();

        let isExpired = (authDTO, currenTime, expired) => {
            return ((currenTime - authDTO.date) > expired * (3600 * 1000))
        }

        let checkAuth = (authDTO) => {
            return !authDTO.isAuth
        }

        if (typeof this.cache == 'undefined' || typeof this.cache[key] == 'undefined') {
            this.cache[key] = await this.getSessionAuth(username, password);
            return this.cache[key];
        }

        if (isExpired(this.cache[key], currenTime, expired)) {
            console.info("AUTH TIME IS EXPIRED");
            this.cache[key] = await this.getSessionAuth(username, password);
            return this.cache[key];
        }

        if (checkAuth(this.cache[key])) {
            console.info("AUTH IS FAILED");
            this.cache[key] = await this.getSessionAuth(username, password);
            return this.cache[key];
        }

        return this.cache[key];
    }


    async getAuth(username, password) {
        try {
            let response = await this.lkRestService.reqAuth(username, password);
            let { status, body } = response;

            let result = (status == 200) ? _.get(body, 'result') : null;
            let isAuth = status == 200 && result === 1000;

            if (isAuth) {
                return convertToAuthDTO(status, body, username);
            }

            console.error("ERROR_AUTHORIZATION: STATUS_CODE " + status + ", RESULT " + result);
        } catch (e) {
            console.error("ERROR AUTHORIZATION: ", e.error);
        }

        return new AuthDTO(false);
    }


    async getSessionAuth(username, password) {
        console.info("UPDATE AUTH");
        let authDTO = await this.getAuth(username, password);
        if (authDTO.isAuth) {
            try {
                let response = await this.lkRestService.reqSessionAuth(authDTO);
                return convertToSessionAuthDTO(response);
            } catch (e) {
                console.error("ERROR_SESSION_AUTHORIZATION: ");
                console.error(e.error);
            }
        }

        return new SessionAuthDTO(false);;
    }
}


module.exports = AuthService;