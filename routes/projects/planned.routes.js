/**
 * Created by Kayvon Rahimi on 11-7-2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('database/db_connector');

router.get('/id/:id', function(req, res){
    var id = req.params.id;
    var query_str;

    if (id){
        query_str = "SELECT FROM plannedproject WHERE ID = " + id + ";";
    } else if (!id) {
        query_str = "SELECT * FROM plannedproject;";
    } else {
        res.status(404);
        res.json({"description" : "The project ID you submitted is invalid. Please check the ID and try again."})
    }

    pool.getConnection(function (err, conn){
        if (err) {
            throw err;
        }
        conn.query(query_str, function (err, rows, fields){
            conn.release();
            if (err) {
                throw err
            }
            res.status(200).json({"items" :rows});
        });
    });
});


//Endpoint voor de registratie van nieuwe gebruikers/klanten
router.post('/create', function (req, res){
    var plannedproj = {
        project_id: null,
        project_name: req.body.project_name,
        location: req.body.location,
        x_cord : req.body.x_cord,
        y_cord : req.body.y_cord,
        z_cord : req.body.z_cord,
        create_date: req.body.create_date,
        comment : req.body.comment
    };

    var query_str = "INSERT INTO plannedproject VALUES ('" +
        plannedproj.project_name+ "', '" +
        plannedproj.location + "', '" +
        plannedproj.x_cord + "', '" +
        plannedproj.y_cord + "', '" +
        plannedproj.z_cord + "');";


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
        });
    });
});

router.delete('/delete/:id', function(req, res){
   var id = req.params.id;
   var query_str;

   console.log(query_str);

   if (id) {
       query_str = "DELETE FROM plannedproject WHERE ID = " + id + ";";
   } else {
       res.status(404);
       res.json({"description " : "The project ID you submitted wasn't found. Check the ID and try again." });
   }
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
        });
   });
});




module.exports = router;