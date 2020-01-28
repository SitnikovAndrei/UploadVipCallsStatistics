module.exports = { 
    getCurrentDate: function() {
        let date = new Date();
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();
        return result = dd+"."+mm+"."+yy;
    },

    ts: function(timestamp) {

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };

        let date = new Date(timestamp*1000);
        var dd = addZero(date.getDate());
        var mm = addZero(date.getMonth() + 1);
        var yyyy = date.getFullYear();

        var hours = addZero(date.getHours());
        var minutes = addZero(date.getMinutes());
        var seconds = addZero(date.getSeconds());
        let result = `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;

        return result;
    },
    db: function(time){
        let time_sql = time.split('.')
        time_sql = time_sql[2] + '-' + time_sql[1] + '-' + time_sql[0];
        return time_sql;
    }
};