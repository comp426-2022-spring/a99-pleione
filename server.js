const express = require('express'); // server software
const min = require('minimist')
let args = min(process.argv.slice(2))
//const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session'); // session middleware
const passport = require('passport'); // authentication
const connectEnsureLogin = require('connect-ensure-login'); // authorization

const User = require('./user.js'); // User Model

const app = express();
const logdb = require('./database');

// Configure Sessions Middleware
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

//Interaction database
app.use((req, res, next)=>{
    let logdata = {
      remoteaddr: req.ip,
      remoteuser: req.user,
      time: Date.now(),
      method: req.method,
      url: req.url,
      protocol: req.protocol,
      httpversion: req.httpVersion,
      status: res.statusCode,
      referer: req.headers['referer'],
      useragent: req.headers['user-agent']
    }
    const stmt = logdb.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
    next()
  })  

// Configure More Middleware
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
// Passport Local Strategy
passport.use(User[0].createStrategy());

// To use with sessions
passport.serializeUser(User[0].serializeUser());
passport.deserializeUser(User[0].deserializeUser());

// Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

app.use(express.static("frontend"));


// Route to Dashboard
// app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   res.sendFile(__dirname+'/frontend/home.html')

// });

// Route to Log out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/home', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

    res.sendFile(__dirname + '/frontend/home.html');
});
app.get('/covid', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

    res.sendFile(__dirname + '/frontend/covid.html');
});
app.get('/hiv', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

    res.sendFile(__dirname + '/frontend/hiv.html');
});
app.get('/mers', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

    res.sendFile(__dirname + '/frontend/mers.html');
});
app.get('/lassa', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

    res.sendFile(__dirname + '/frontend/lassa.html');
});
app.get('/yellowfever', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/frontend/yellowfever.html');
});
app.get('/blackfungus', connectEnsureLogin.ensureLoggedIn(), (req, res) => {

    res.sendFile(__dirname + '/frontend/blackfungus.html');
});

// Post Route: /login
app.post('/login', passport.authenticate('local', { failureRedirect: '/wrongPW' }), function(req, res) {
    console.log(req.user)
    res.redirect('/home');
});
app.get('/wrongPW', (req, res) => {
    res.sendFile(__dirname + '/static/wrongPW.html');
});
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/static/registration.html');
});
app.get('/error', (req, res) => {
    res.sendFile(__dirname + '/static/usernameExist.html');
});

// Async function to handle registratuion  and throw errors if they occur.
async function handle(req, res) {
    try {
        await User[0].register({ username: req.body.username, active: false }, req.body.password);
        req.logout();
        res.redirect('/login');
    } catch (error) {
        console.log(error)
        res.redirect('/error');

    }
}
app.post('/register', (req, res) => {
    handle(req, res)
})

// assign port
const port = 5000;
app.listen(port, async () => {
    console.log(`This app is listening on port ${port}`);
    let connected = false
    User[1].connection.on('open', () => {
        console.log("MongoDB connected");
        if (args["test"]) {
            console.log("Test successful. Exiting...")
            process.exit();
        }
    });
});