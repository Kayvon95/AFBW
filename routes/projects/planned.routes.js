/**
 * Created by Kayvon Rahimi on 11-7-2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../../database/db_connector');

router.get('/test', function(req, res){
   res.send("Planned project tested succesfully.");
});

//Endpoint to READ
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


//Endpoint to CREATE
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

//Endpoint to update
router.put('/update/:id', function (req, res){
    var id = req.params.id;
    var project = {
        project_id: req.body.project_id,
        project_name: req.body.project_name,
        location: req.body.location,
        x_cord : req.body.x_cord,
        y_cord : req.body.y_cord,
        z_cord : req.body.z_cord,
        create_date: req.body.create_date,
        comment : req.body.comment
    };


    var query_str;



});

//Endpoint to DELETE
router.delete('/delete/:id', function(req, res){
   var id = req.params.id;
   var query_str;


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

//add comment to project
router.post('/addComment/:id', function(req, res){
   var id = req.params.id;
   var plannedproj = {

   };
   var query_str;

    if (id) {
        query_str = "DELETE FROM plannedproject WHERE ID = " + id + ";";
    } else {
        res.status(404);
        res.json({"description " : "The project ID you submitted wasn't found. Check the ID and try again." });
    }


});


//Endpoint to convert a planned project to a current project.
router.post('/planned-to-curr/:id', function(req, res){
   var id = req.params.id;
   var query_str1, query_str2;

   var plannedproj = {
       project_id: req.body.project_id,
       project_name: req.body.project_name,
       location: req.body.location,
       x_cord : req.body.x_cord,
       y_cord : req.body.y_cord,
       z_cord : req.body.z_cord,
       create_date: req.body.create_date,
       comment : req.body.comment
   };


   query_str1 = "INSERT INTO currentproject (project_name, location, x_cord, y_cord, z_cord, create date) " +
                "VALUES ('" + plannedproj.project_name + "', '"
                        +  plannedproj.location + "', '"
                        + plannedproj.x_cord + "', '"
                        + plannedproj.y_cord + "', '"
                        + plannedproj.z_cord + "', '"
                        + plannedproj.create_date + "');";

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str1, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
        });
    });

});



module.exports = router;