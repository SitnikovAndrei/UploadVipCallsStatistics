const rp = require('request-promise');
const request = require('request');
const get = require('lodash/get');

let _transform = (body, response) => { return { 'headers': response.headers, 'body': body, 'status': response.statusCode } };

class LkCallRestService {
    getHash(product, issa7, date, groups, status) {
        let options = {
            method: 'POST',
            uri: 'https://lk.mango-office.ru/' + product + '/stats/calls',
            formData: {
                'perpage': '400',
                'type': 'calls',
                'period': 'arbitrary',
                'startDate': date,
                'endDate': date,
                'whoCalledType': 'client_or_member',
                'whoCalled': 'any',
                'clientNumber': '',
                'line': 'any',
                'groups': groups,
                'phones': '["",""]',
                'offset': '0',
                'sorting': '',
                'fromLine': '',
                'members': '[""]',
                'callStatus': status,
                'filterParty': 'listany',
            },
            headers: {
                'Cookie': 'issa7=' + issa7
            },
            json: true,
            transform: _transform
        };
        return rp(options);
    }

    requestStats(product, issa7, hash) {
        let poll = (timeout, interval = 5000) => {
            let endTime = Date.now() + (timeout || 120000);

            let checkStatus = function(resolve, reject) {
                function callback(err, res, body) {
                    let status = get(body, 'status');
                    console.log("RESPONSE STATS STATUS: " + status);

                    if (status === 'complete') {
                        resolve(body);
                    } else if ((Date.now() < endTime) && (status === 'work')) {
                        setTimeout(checkStatus, interval, resolve, reject);
                    } else {
                        console.error('GET CALL_HISTORY IS TIMEOUT EXPIRED');
                        reject();
                    }

                }
                request(options, callback);
            }

            return new Promise(checkStatus);
        }

        let options = {
            method: 'POST',
            uri: 'https://lk.mango-office.ru/' + product + '/stats/response-stats',
            formData: {
                'hash': hash
            },
            headers: {
                'Cookie': 'issa7=' + issa7
            },
            json: true,
            transform: _transform
        };

        return poll()
    }
}


module.exports = LkCallRestService;