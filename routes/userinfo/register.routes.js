/**
 * Created by Kayvon Rahimi on 11-7-2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../../database/db_connector.js');

//Test
router.get('/test', function(req, res){
    res.send('Testresults.');
});

//Endpoint for registry of new users
router.post('/register', function (req, res){
    var user = {
        user_id: null,
        user_name: req.body.user_name,
        email: req.body.email,
        create_date: req.body.create_date,
        password: req.body.password
    };

    var query_str = "INSERT INTO user VALUES ('" +
        user.user_id + "', '" +
        user.user_name + "', '" +
        user.email + "', '" +
        //HH:MM DD-MM-YYYY
        user.create_date+ "', '" +
        user.password + "');";


    console.log(query_str);

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
        })
    });
});

module.exports = router;