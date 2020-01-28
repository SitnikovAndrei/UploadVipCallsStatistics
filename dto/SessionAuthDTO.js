class SessionAuthDTO {
    constructor(isAuth, issa7){
        this.isAuth = isAuth;
        this.issa7 = issa7;
        this.date = Date.now();
    }
}

module.exports = SessionAuthDTO;