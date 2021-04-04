const Mongodb = require('./mongo');

const DB_PWD = 'dilab', DB_NAME = 'bj_calendar', COLL_NAME = 'userdata';
const URL = `mongodb+srv://odiseu:${DB_PWD}@odiseu.lk7jw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

class UserDBException {
    constructor(code, msg) {
        this.code = code;
        this.message = msg;
    }
}

class UserDB {
    static getLastResult(userdata) {
        let query = { email: userdata['email'] };
        return Mongodb.find(DB_NAME, COLL_NAME, query, { _id: 0, results: 1 })
        .then((res) => {
            let results = res.payload[0]['results'];
            if(!results.length) return { code: 300, payload: [0] };
            return { code: res.code, payload: results[0] };
        });
    }

    static addResults(userdata, docs) {
        let query = { email: userdata['email'] };
        console.log(query);
        return Mongodb.find(DB_NAME, COLL_NAME, query, { _id: 0, results: 1 })
        .then((res) => {
            let data = [...docs, ...res.payload[0]['results']];
            return Mongodb.update(DB_NAME, COLL_NAME, userdata, { results: data });
        });
    }

    static getResults(userdata, date_from, date_to) {
        let query = { email: userdata['email'] };
        return Mongodb.find(DB_NAME, COLL_NAME, query, { _id: 0, results: 1 })
        .then((res) => {
            let results = res.payload[0]['results'];
            let picks = [];
            for(let i=0; i<results.length; i++) {
                if(date_from < results[i][8] && results[i][8] < date_to) {
                    picks.push(results[i]);
                }
            }
            return { code: res.code, payload: picks };
        });
    }
}

module.exports = UserDB;