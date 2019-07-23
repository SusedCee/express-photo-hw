const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('./db/db')

const imagesController = require('./controllers/images');

app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', imagesController);

// landing page we don't need a controller
// app.get('/', (req, res) => {
//   res.render('index.ejs');
// });

app.listen(3000, () => {
	console.log('listening to port 3000')
});