let db = require('../config/database');


class CallDAO {
    constructor() {
        this.pool = db.getPool();
    }

    saveAll(calls) {
        console.info("UPLOAD CALLS DB START");
        let columns = ['datetime','time','direction','caller','call_member_id','dnis','party','duration','contextId','cost','billingContextId','clir','clir_in','callback_button_id','is_answered','is_obscure','is_mass'];
        let sql = 'INSERT IGNORE INTO callhistory_vip(' + columns.join(',') + ') VALUES ?';

        let values = calls.map(i => {
            return i.values();
        });

        this.pool.getConnection(function(err, connection) {
            connection.query(sql, [values], function(err, rows) {
                console.info("UPLOAD CALLS DB END");   
            });
        });
    }


    save(call) {
        let sql = 'INSERT IGNORE INTO callhistory SET ?';

        this.pool.getConnection(function(err, connection) {
            connection.query(sql, call, function(err, rows) {
                console.error(err);   
            });
        });
    }
}




module.exports = CallDAO;