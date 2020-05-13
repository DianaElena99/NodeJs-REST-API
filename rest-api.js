
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Repo = require('./repo');

class RestAPI
{
    constructor()
    {
        this.app = express();
        this.repo = new Repo();
        this.initApp(); 
    }

    initApp()
    {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(bodyParser.json());

        this.app.listen(3001, ()=>{
            console.log(`Listening on port 3001`);
        });

        this.app.get("/artists", (req, res)=>
            {
                
                console.log("Extracting resources from DB");
                this.repo.getAll(function(result){
                    var arr  = result;
                    return res.send(arr);
                });
                
            }
        );

        this.getOne();
        this.delete();
        this.add();
        this.update();
    }


    getOne()
    {
        this.app.get("/artists/:id", (req, res)=>
            {
                var id = req.params.id;
                this.repo.getOne(id, function(result){
                    return res.send(result);
                });
                
            });
    }

    delete()
    {   
        this.app.delete("/artists/:id", (req, res)=>
            {
                var id = req.params.id;
                
                this.repo.delete(id, function(deleted){
                    return res.send(deleted);
                });
            });
    }

    add()
    {
        this.app.post("/artists", (req, res)=>
            {
                var params = req.body;

                var nume = params['nume'];
                var genMuzical=params['genMuzical'];
                var ratingSpotify = params['ratingSpotify'];

                console.log(nume, " ", genMuzical, " ", ratingSpotify);

                var id;
                this.repo
                    .insert(nume, genMuzical, ratingSpotify, function(inserted){
                        id = inserted;
                        var arr = {"id":id, "nume": nume, "genMuzical":genMuzical, "ratingSpotify":ratingSpotify};
                        return res.send(arr);
                    });
                
                });
    }

    update()
    {
        this.app.put("/artists/:id", (req, res)=>
            {
                var params = req.body;
                var id = req.params.id;

                var nume = params['nume'];
                var genMuzical=params['genMuzical'];
                var ratingSpotify = params['ratingSpotify'];

                var arr = {"id":id, "nume":nume, "genMuzical":genMuzical, "ratingSpotify":ratingSpotify};
                console.log(nume, " ", genMuzical, " ", ratingSpotify);

                this.repo.update(id, nume, genMuzical, ratingSpotify,  function(updated){
                  return res.send(arr);
                });
            });
    }
    
}

module.exports = RestAPI;
