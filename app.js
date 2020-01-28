let AuthService = require('./service/AuthService');
let CallService = require('./service/CallService');
let CallDAO = require('./dao/CallDAO');
let {getCurrentDate} = require('./utils/time');
const settings = require('./settings');


let { username, password, product } = settings["lk"];
let authService = new AuthService();
let callService = new CallService();
let callDAO = new CallDAO();


let updateStatistics = async () => {
    let { isAuth, issa7 } = await authService.getCacheSessionAuthDTO(username, password, 1);

    if (isAuth) {
        let calls = await callService.getCallHistory(product,
            issa7,
            getCurrentDate(),
            groups = '["1001634","10812798"]',
            callStatus = 'all'
        );

        if (calls.length) {
            let callsFillStatus = callService.fillStatus(calls, 1001634, 10812798);
            let callsDTO = callService.convertToDTO(callsFillStatus);
            callDAO.saveAll(callsDTO);
        }
};

updateStatistics();
setInterval(updateStatistics, 5 * 60 * 1000);