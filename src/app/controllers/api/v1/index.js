const express = require('express');
const fs = require('fs');
const path = require('path');
const keys = require('../../../models/apikey');

const router = express.Router();
const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const fileName = file.substr(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`).registerRouter());
  });

router.get('/', (req, res) => {
  keys.find({userID: 1}, function(err, it){
    if(it[0] === undefined){
      res.render('homepage', {apikey: "Unknown"});
    } else {
      res.render('homepage', {apikey: it[0].apikey});
    }
  });
});

module.exports = router;
