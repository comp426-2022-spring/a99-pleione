const express = require('express'); // server software
//const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization

const User = require('./user.js'); // User Model


const app = express();

// Configure Sessions Middleware
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Configure More Middleware
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
  });
  
  // Route to Login Page
  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
  });
  
  // Route to Dashboard
  app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname+'/frontend/home.html')
    
  });
  
  // Route to Log out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
  
  // Post Route: /login
  app.post('/login', passport.authenticate('local', { failureRedirect: '/register' }),  function(req, res) {
      console.log(req.user)
      res.redirect('/dashboard');
  });

  app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/static/registration.html');
});

    app.post('/register', (req, res)=>{
        User.register({ username: req.body.username, active: false }, req.body.password);
        req.logout();
    res.redirect('/login');
    })
  
  // assign port
  const port = 5000;
  app.listen(port, () => console.log(`This app is listening on port ${port}`));