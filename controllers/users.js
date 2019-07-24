const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req, res) => {
  User.find({}, (err, foundUsers) => {
  	// console.log(req.params, '<--- array of users')
      if(err){
      res.send(err);
    } else {
      // console.log(foundUsers)
      res.render('users/index.ejs', { 
        users: foundUsers
      });
    }
   // res.send('working');
  });
});







module.exports = router;