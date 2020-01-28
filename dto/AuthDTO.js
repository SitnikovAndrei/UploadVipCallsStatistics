class AuthDTO {
    constructor(isAuth, auth_token, refresh_token, username){
        this.isAuth = isAuth;
        this.auth_token = auth_token;
        this.refresh_token = refresh_token;
        this.username = username;
        this.date = Date.now();
    }
}

module.exports = AuthDTO;