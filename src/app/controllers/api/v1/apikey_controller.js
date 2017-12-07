const express = require('express');
const Key = require("../../../models/apikey");
const hat = require('hat');

module.exports = {
  registerRouter(){
    const router = express.Router();

    router.post('/', this.newapikey);

    return router;
  },
  newapikey(req, res){
    let uid = req.body.userID;

    //Check if the user already has a key, if so then just update
    Key.find({userID: uid}, function(err, key){
      if(key[0] === undefined)
      {
        console.log("User not found");
        //User was not found
        //Create a new instance of key
        var newkey = new Key();

        //Set the Properties
        newkey.apikey=hat();
        newkey.totalRequests = 0;
        newkey.totalPosts = 0;
        newkey.userID=uid;

        //Save the data
        newkey.save(function (err) {
          if(err){
            res.render('homepage', {apikey: "Error generating a key"});
          }
            res.render('homepage', {apikey: newkey.apikey});
        });

      } else {
        //User was found
        console.log("User found");
        //Create a new API key
        let newAPIKEY = hat();
        key[0].apikey = newAPIKEY;
        key[0].save(function(err){
          if(err){
            res.render('homepage', {apikey: err});
          } else {
            res.render('homepage', {apikey: newAPIKEY});
          }
        });
      }
    });
  },
};
