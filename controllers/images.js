const express = require('express');
const router = express.Router();
const Image = require('../models/images');

router.get('/', (req, res) => {
  Image.find({}, (err, foundImages) => {
    if(err){
      res.send(err);
    } else {
      console.log(foundImages)

      res.render('images/index.ejs', { //-------------------------------
        images: foundImages
      });
    }
  })

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
	res.render('new.ejs')
});

//show params inside routing docs in express
//localhost:3000/cars/0
router.get('/:id', (req, res) => {
	console.log(req.params, "<-- req.params");
	console.log('/images/:id')
	Image.findById(req.params.id, (err, image) => {
			if(err) {
				res.send(err);
			} else {
				res.render('show.ejs', {
					image: image
			});
		}
	});
});





module.exports = router;