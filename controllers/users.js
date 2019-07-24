const express = require('express');
const router = express.Router();
const User = require('../models/users');

//going to home page
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

//showing the list of authors
router.get('/users', (req, res) => {
  User.find({}, (err, foundUsers) => {
  	// console.log(req.params, '<--- array of users')
      if(err){
      res.send(err);
    } else {
      // console.log(foundUsers)
      res.render('users/show.ejs', { 
        users: foundUsers
      });
    }
   // res.send('working');
  });
});

//ADD NEW listens for post requests to add user
router.post('/', (req, res) => {
	console.log(req.body, "<--- content of form");
	User.create(req.body, (err, addUser) => {
		console.log(addUser, "<-- post route images, addedImage")
		if(err){
			res.send(err)
			} else {
				res.redirect('/users')
		}
	});
});

//POST NEW - send new username
router.get('/new', (req, res) => {
	res.render('./users/new.ejs')
});

//go to individual user show page
router.get('/:id/', (req, res) => {
  User.findById(req.params.id, (err, foundIndividual) => {
  	// console.log(req.params, '<--- array of users')
      if(err){
      res.send(err);
    } else {
      // console.log(foundUsers)
      res.render('users/show.ejs', { 
        users: foundIndividual
      });
    }
   // res.send('working');
  });
});


//edit the user
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, image) => {
    if(err){
      console.log(err);
    }else {
      res.render('./users/edit.ejs', {
        user: user
      });
    };
  });
});

//put the edited user in list of users(all users show page)
router.put('/:id', (req, res) => {
  console.log(req.body, ' in put route')
  console.log('/users/:id')

  User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) =>
  	{ 
  		if(err){
  			console.log(err);
  		} else {
  			res.redirect('/users')
  		};
  	//callback function
  	});
});



module.exports = router;