const express = require('express');
const mongoose = require("mongoose");
const fileUpLoad = require('express-fileupload');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const expressSession = require('express-session');
const flash = require('connect-flash');


const authMiddleware = require('./middleware/authMiddleware');
const redirectlfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

const homeController = require('./controllers/home');
const searchController = require('./controllers/search')
const getPostController = require('./controllers/getPost');
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');


mongoose.connect('mongodb+srv://lapqqq12345:q7Sfweg5FjZ5eDmG@cluster0.uzkps.mongodb.net', {
    autoIndex: true // Bật tự động tạo chỉ mục
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


const app = express();


app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpLoad());

app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(flash());
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})


app.get('/', homeController);

app.get('/search', searchController);

app.get('/post/:id', getPostController);

app.get('/posts/new',authMiddleware ,newPostController);

app.post('/posts/store',authMiddleware ,storePostController);

app.get('/auth/register', redirectlfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectlfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login', redirectlfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectlfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController);

app.use((req, res) => res.render('notfound'));


let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => {
  console.log('App listening on port ' + port);
});


