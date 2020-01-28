let nTime = require('../utils/time');

class CallDTO {

    constructor(obj) {
        this.datetime = nTime.ts(obj.time);
        this.time = obj.time;
        this.direction = +obj.direction;
        this.caller = obj.caller;
        this.call_member_id = +obj.call_member_id;
        this.dnis = obj.dnis;
        this.party = JSON.stringify(obj.party);
        this.duration = +obj.duration;
        this.contextId = +obj.contextId;
        this.cost = obj.cost;
        this.billingContextId = +obj.billingContextId;
        this.clir = +obj.clir;
        this.clir_in = +obj.clir_in;
        this.callback_button_id = obj.callback_button_id;
        this.is_answered = obj.is_answered || false;
        this.is_obscure = obj.is_obscure || false;
        this.is_mass = obj.is_mass || false;
    }

    keys(){
        return Object.keys(this);
    }

    values(){
        return Object.values(this);
    }
}


module.exports = CallDTO;