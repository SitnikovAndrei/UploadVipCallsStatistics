let LkCallRestService = require('./LkCallRestService');
let CallDTO = require('../dto/CallDTO');
const get = require('lodash/get');


class CallService {
    constructor() {
        this.lkCallRestService = new LkCallRestService();
    }

    convertToDTO(calls){
        return calls.map(i => new CallDTO(i));
    }

    fillStatus(calls, ...ids){
        let isTypeGroup = (i) => i.type === "group";
        let isGroupsСontain = (id, ids) => ids.indexOf(id) !== -1;
        
        let filterGroupsIds = (party) => party.filter(i => isTypeGroup(i) && isGroupsСontain(i.id, ids));
        let isCallback = (call) => call.callback_button_id !== "-1";
        let checkDialDuration = (party_group, duration) => party_group.dial_duration <= duration;


        let setStatus = (call) => {
            let partyGroups = filterGroupsIds(call.party);
            let lastPartyGroup = partyGroups.pop();

            call.is_answered = lastPartyGroup.isAnswer;

            if (!lastPartyGroup.isAnswer) {
                if (checkDialDuration(lastPartyGroup, 10) || isCallback(call)) call.is_obscure = true;
            };

            return call;
        }

        return calls.map(call => setStatus(call));
    }

    async getCallHistory(product, issa7, date, groups, status) {
        try {
            let _getHash = await this.lkCallRestService.getHash(product, issa7, date, groups, status);
            let hash = get(_getHash, 'body.hash');

            let _responseStats = await this.lkCallRestService.requestStats(product, issa7, hash);
            return get(_responseStats, 'data');
        } catch(e) {
            console.error("ERROR GET_CALL_HISTORY");
            return [];
        }
    }

}

module.exports = CallService;