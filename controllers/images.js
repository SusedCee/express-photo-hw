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


//edit the list
router.get('/:id/edit', (req, res) => {
  Image.findById(req.params.id, (err, image) => {
    if(err){
      console.log(err);
    }else {
      res.render('edit.ejs', {
        image: image
      })
    }
  })
});

router.put('/:id', (req, res) => {
  console.log(req.body, ' in put route')
  console.log('/images/:id')
})

//delete
router.delete('/:id', (req, res) => {
	Image.findOneAndDelete(req.params.id, (err, deleteImage) => {
		if(err){
			res.send(err);
		} else {
		res.redirect('/images');
		};
	});
});



module.exports = router;