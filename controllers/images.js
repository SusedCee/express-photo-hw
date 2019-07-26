const express = require('express');
const router = express.Router();
const Image = require('../models/images');
const User = require('../models/users');


router.get('/', (req, res) => {
  Image.find({}, (err, foundImages) => {
      if(err){
      res.send(err);
    } else {
      console.log(foundImages)
      res.render('images/index.ejs', { 
        images: foundImages
      });
    }
  });
});

//listens for post requests to add post
router.post('/', (req, res) => {
	console.log(req.body, "<--- content of form");
	Image.create(req.body, (err, addImage) => {
		console.log(addImage, "<-- post route images, addedImage")
		if(err){
			res.send(err)
			} else {
				res.redirect('/images')
		}
	});
});

//new - send new post
router.get('/new', (req, res) => {
	User.find({}, (err, allTheUsers) => {
	res.render('./images/new.ejs', 
	{
		users: allTheUsers
		})	
  	})

});

//show params inside routing docs in express
//localhost:3000/images/0
router.get('/:id', async (req, res) => {
	const image = await Image.findById(req.params.id);
	console.log(image, "<-- req.params");
	res.render('images/show.ejs', {
		image: image
	});
});






// //go to individual user show page
// router.get('/:id/', async (req, res) => {
// 	const user = await User.findById(req.params.id)
// 	const usersPosts = await Image.find({creator: req.params.id});
// 	console.log(usersPosts)
// 	res.render('users/show.ejs', {
// 		user: user, 
// 		images: usersPosts
//   });
// });












//edit the list
router.get('/:id/edit', (req, res) => {
  Image.findById(req.params.id, (err, image) => {
    if(err){
      console.log(err);
    }else {
      res.render('./images/edit.ejs', {
        image: image
      });
    };
  });
});

router.put('/:id', (req, res) => {
  console.log(req.body, ' in put route')
  console.log('/images/:id')

  Image.findByIdAndUpdate(req.params.id, req.body, (err, updatedImage) =>
  	{ 
  		if(err){
  			console.log(err);
  		} else {
  			res.redirect('/images')
  		};
  	//callback function
  	});
});

//delete
router.delete('/:id', (req, res) => {

	console.log(`DELETE /images/${req.params.id}`);

	Image.findByIdAndDelete(req.params.id, (err, deleteImage) => {
		if(err){
			res.send(err);
		} else {
			res.redirect('/images');
		};
	});
});



module.exports = router;