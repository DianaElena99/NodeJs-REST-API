const mysql = require('mysql');
const JSON = require('circular-json');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "drafts"
  });

class Repo
{
    constructor()
    {
        con.connect();
    }  

    getAll(callback)
    {
        con.query("SELECT * FROM ARTISTS", function(err, res)
            {
                console.log("here");
                if (err) throw err;
                return callback(res);
            });
    }


    getOne(id, callback)
    {
        con.query("SELECT * FROM ARTISTS WHERE ID = ?", [id], function(err, res)
            {
            console.log("here");
            if (err) throw err;
            return callback(res);
        });
    }

    delete(id, callback)
    {
        var res = [];      
        this.getOne(id, function(result){
            res = result;
        });

   //     con.connect(function(err){
            var sql = "DELETE FROM ARTISTS WHERE ID = ?";
            con.query(sql, [id], function(err, ok)
                {
                    if (err) console.log(err);
                    return callback(res);
   //             });
            });      
    }

    insert(nume, genMuzical, ratingSpotify, callback)
    {
            var sql = "INSERT INTO ARTISTS(nume, genMuzical, ratingSpotify) values (?,?,?)";

            con.query(sql, [nume, genMuzical, ratingSpotify],  function(err, s){
                if (err) console.log(err);  
                return callback(s.insertId);          
            });

    }

    update(id, nume, genMuzical, ratingSpotify, callback)
    {

            var sql = "UPDATE ARTISTS SET nume = ?, genMuzical = ?, ratingSpotify=? WHERE ID = ?";

            con.query(sql, [nume, genMuzical, ratingSpotify, id], function(err, ok)
                {
                    if (err) console.log(err);
                    return callback(200);
                });

    }
}

module.exports = Repo;
