
(function(angular){
    'use strict';
    function ArtistController($scope, $http){
        var ctrl = this;

        ctrl.getAll = function(){
            $http.get("http://localhost:3001/artists").then(function(resp){
                ctrl.list = resp.data;
                console.log(resp.data);
            });
        }

        ctrl.getAll();

        ctrl.delete = function(id){
            var url = "http://localhost:3001/artists/" + id;
            console.log(url);
            $http.delete(url).then(function(response){
                console.log(response);
                location.reload();
            });
        }

        
        ctrl.add = function(nume, genMuzical, rating){
            var url = "http://localhost:3001/artists";

            var params = {"nume":nume, "genMuzical":genMuzical, "ratingSpotify":rating};
            console.log(params);

            var config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }

            $http.post(url, params, config).then(function(){
                location.reload();
            });
        };
    }


    angular.module('myApp').component('artistsList', {
        templateUrl:'artistsList.html',
        controller:ArtistController,
        bindings:{
            artist:'<'
        }
    });
})(window.angular);