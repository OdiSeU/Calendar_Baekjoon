const express = require('express');
const router = express();
const Mongodb = require('./mongo');
const BjCrawl = require('./crawl');
const LoginCtrl = require('./loginCtrl');
const UserDB = require('./userdb');

const DB_PWD = 'dilab', DB_NAME = 'bj_calendar';
const URL = `mongodb+srv://odiseu:${DB_PWD}@odiseu.lk7jw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
Mongodb.url = URL;

router.get('/', (req, res) => {
    console.log(`access to '${req.url}'`);
    res.send('index.html');
});

router.post('/crawl', (req, res) => {
    console.log(`access to '${req.url}'`);

    BjCrawl.crawl({'problem_id':req.body['problem_id'], 'user_id': req.body['user_id'], 'language_id': req.body['language_id']})
    .then((data) => {
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.post('/sign-up', (req, res) => {
    console.log(`access to '${req.url}'`);
    req.body.results = [];
    LoginCtrl.signUp(DB_NAME, 'userdata', req.body)
    .then((data) => {
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.post('/sign-in', (req, res) => {
    console.log(`access to '${req.url}'`);
    let userdata = '';
    LoginCtrl.signIn(DB_NAME, 'userdata', req.body, req.session)
    // .then((data) => {
    //     userdata = data.payload;
    //     console.log(data);
    //     return UserDB.getLastResult(req.body);
    // })
    // .then((data) => {
    //     console.log('crawl');
    //     console.log(data);
    //     return BjCrawl.crawl({user_id: userdata['bjid'], language_id: 28}, data.payload[0]);
    // })
    // .then((data) => {
    //     console.log('add');
    //     console.log(data);
    //     return UserDB.addResults(userdata, data);
    // })
    // .then((data)=> {
    //     res.json(data);
    // })
    .then((data) => {
        userdata = data.payload;
        console.log(data);
        return UserDB.getResults(req.body, '2021-02-01 03:27:13', '2021-02-07 14:48:16');
    })
    .then((data)=> {
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.post('/sign-secede', (req, res) => {
    console.log(`access to '${req.url}'`);
    LoginCtrl.signSecede(DB_NAME, 'userdata', req.body, req.session)
    .then((data) => {
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.get('/sign-check', (req, res) => {
    console.log(`access to '${req.url}'`);
    LoginCtrl.signCheck(req.session)
    .then((data) => {
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.get('/sign-out', (req, res) => {
    console.log(`access to '${req.url}'`);
    LoginCtrl.signOut(req.session)
    .then((data) => {
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

module.exports = router;