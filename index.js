//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb://localhost:27017/";


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    database:"drafts",
    user : "root",
    password: ""
});

const port = 3001;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

con.connect(function(err){
    if (err) console.log(err);
    console.log("Connected");

    app.listen(port, ()=>{
        console.log(`Listening on port ${port}`);
    });

    app.get('/', (req, res)=>{
        res.sendFile(__dirname + '/home.html');
    })


    app.get('/artists' , (req, res)=>{
        var arr = {}
        con.query("SELECT * FROM ARTISTS", function(err, s){
            if (err) console.log(err);
            arr["records"] = s;
            return res.send(arr);
        });
    });

    app.get('/artists/:id' , (req, res)=>{
        var id = req.params.id;
        con.query("SELECT * FROM ARTISTS WHERE ID = " + id, function(err, s){
            if (err) console.log(err);
            return res.send(s);
        });
    });

    app.post('/artists', (req, res)=>{
        var params = req.body;
        console.log(params["nume"] );
        con.query("INSERT INTO ARTISTS(nume, genMuzical, ratingSpotify) values ('" + params["nume"] + "','" + params["genMuzical"] + "'," + params["ratingSpotify"] + ")", function(err, s){
            if (err) console.log(err);
            return res.send(s);
        });
    });

    app.delete('/artists/:id', (req, res)=>{
        var id = req.params.id;
        con.query("DELETE FROM ARTISTS WHERE id = " + id, function(e,s){
            return res.send(s);
        });
    });

    app.put('/artists/:id', (req, res)=>{
        var id= req.params.id;
        var params = req.body;
        console.log(id);
        console.log(params);
        var sql = "UPDATE ARTISTS set nume='" + params["nume"] + "', genMuzical='"+ params["genMuzical"] + "', ratingSpotify=" + params["ratingSpotify"] +" where id =" +id ;
        console.log(sql);
        con.query(sql, function(e, s){
            if (e) console.log(e);
            return res.send(s);
        });
    });
})



