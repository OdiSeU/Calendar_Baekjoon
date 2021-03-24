const Mongodb = require('./mongo');

class LoginException {
    constructor(code, msg) {
        this.code = code;
        this.message = msg;
    }
}

class LoginCtrl {
    static signUp(db_name, collection, doc) {
        return Mongodb.isExist(db_name, collection, {'email': doc['email']})
        .then((res) => {
            if(res.payload) throw new LoginException(400, 'sign up error: id already exist');
            else return Mongodb.insert(db_name, collection, doc);
        })
    }
    static signIn(db, collection, doc, session) {
        return Mongodb.find(db, collection, {'email': doc['email']})
        .then((res) => {
            if(res.payload.length == 0) throw new LoginException(400, 'sign in error : id does not exist');
            if(res.payload[0]['password'] != doc['password']) new LoginException(400, 'sign in error : password does not match');
            session.email = res.payload[0]['email'];
            return {code: 200, payload: res.payload[0]['email']};
        })
    }
    static signSecede(db, collection, doc, session) {
        return this.signOut(session)
        .then(()=>Mongodb.delete(db, collection, doc));
    }

    static signCheck(session) {
        return new Promise((resolve) => {
            resolve(session.email);
        });
    }
    static signOut(session) {
        return new Promise((resolve) => {
            resolve(session.email);
            delete session.email;
        });
    }
}

module.exports = LoginCtrl;