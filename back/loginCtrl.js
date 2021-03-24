const Mongodb = require('./mongo');

class LoginException {
    constructor(code, msg) {
        this.code = code;
        this.message = msg;
    }
}

class LoginCtrl {
    /**
     * 
     * @param {string} db document가 저장될 db이름
     * @param {string} collection document가 저장될 collection이름
     * @param {object} doc 저장할 document
     * @returns code: 상태, payload: 삽입된 document의 _id 배열
     */
    static signUp(db, collection, doc) {
        return Mongodb.isExist(db, collection, {'email': doc['email']})
        .then((res) => {
            if(res.payload) throw new LoginException(400, 'sign up error: id already exist');
            else return Mongodb.insert(db, collection, doc);
        })
    }
    /**
     * 
     * @param {string} db document를 찾을 db이름
     * @param {string} collection  document를 찾을 collection이름
     * @param {object} doc { email: '123@gmail.com', password: '1234' }
     * @param {*} session req.session
     * @returns code: 상태, payload: 로그인 된 id
     */
    static signIn(db, collection, doc, session) {
        return Mongodb.find(db, collection, { email: doc['email'] })
        .then((res) => {
            if(res.payload.length == 0) throw new LoginException(400, 'sign in error : id does not exist');
            if(res.payload[0]['password'] != doc['password']) new LoginException(400, 'sign in error : password does not match');
            session.email = res.payload[0]['email'];
            return {code: 200, payload: res.payload[0]['email']};
        })
    }
    /**
     * 
     * @param {string} db document를 삭제할 db이름
     * @param {string} collection document를 삭제할 collection이름
     * @param {object} doc { email: '123@gmail.com', password: '1234' }
     * @param {*} session req.session
     * @returns code: 상태, payload: { query: query, count: 삭제된 document 수 }
     */
    static signSecede(db, collection, doc, session) {
        return this.signOut(session)
        .then(()=>Mongodb.delete(db, collection, doc));
    }
    /**
     * 
     * @param {*} session req.session
     * @returns code:200, payload: '1234@gmail.com'
     */
    static signCheck(session) {
        return new Promise((resolve) => {
            let res = { code:200, payload: session.email };
            resolve(res);
        });
    }
    /**
     * 
     * @param {*} session req.session
     * @returns code:200, payload: '1234@gmail.com'
     */
    static signOut(session) {
        return new Promise((resolve) => {
            let res = { code:200, payload: session.email };
            resolve(session.email);
            delete session.email;
        });
    }
}

module.exports = LoginCtrl;