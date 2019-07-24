const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./db/db')

const imagesController = require('./controllers/images');
const usersController = require('./controllers/users')

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/images', imagesController);
app.use('/users', usersController);

// landing page we don't need a controller
// app.get('/', (req, res) => {
//   res.render('index.ejs');
// });

app.listen(3000, () => {
	console.log('listening to port 3000')
});