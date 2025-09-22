const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose'); // MongoDB
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo'); // Production session store

// Custom middleware
const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

// Controllers
const newPostController = require('./controllers/newPostController');
const homeController = require('./controllers/homeController');
const storePostController = require('./controllers/storePostController');
const getPostController = require('./controllers/getPostController');
const newUserController = require('./controllers/newUserController');
const storeUserController = require('./controllers/storeUserController');
const loginController = require('./controllers/loginController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');

const app = express();
app.set('view engine', 'ejs'); // Use EJS templates

// Hardcoded MongoDB URI (replace with your actual URI)
const MONGO_URI = 'mongodb+srv://sharonrosesiyanata7:VICEgDztKhvISLKu@cleanblogpost.q79mm.mongodb.net/blog_db';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGO_URI }) // Hardcoded URI here
}));

app.use(flash());
app.use('/posts/store', validateMiddleware); // validation for post creation

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// Health check route for Render
app.get('/health', (req, res) => res.send('OK'));

// Routes
app.get('/', homeController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/post/:id', getPostController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.post('/posts/store', authMiddleware, storePostController);

// 404 page
app.use((req, res) => res.render('notfound'));

// Start server (Render-compatible)
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}`);
});
