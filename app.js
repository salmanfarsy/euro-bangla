//packages
const express = require('express'),
mongoose      = require('mongoose'),
bodyParser    = require('body-parser'),
seriesRoute   = require('./routes/series'),
commentRoute  = require('./routes/comment'),
authRoute  = require('./routes/auth'),
orderRoute  = require('./routes/order'),
methodOverride = require('method-override'),
Series         = require('./models/series'),
Comment         = require('./models/comment'),
User         = require('./models/user'),
passport        = require('passport'),
local          = require('passport-local'),
session        = require('express-session'),
flash          = require('connect-flash'),
app           = express();

//mongoose config
mongoose.connect('mongodb://localhost/series', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//express config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
	secret:'Watch attack on titan',
	resave:false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//global variables
app.use((req, res, next)=>{
res.locals.user = req.user;
res.locals.error = req.flash('error');
res.locals.done = req.flash('done');
	next();
})
//passport config
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use( new local(User.authenticate()));
//routes
app.get('/', (req, res)=>{
	res.render('home')
});
app.use(authRoute);
app.use(seriesRoute);
app.use(commentRoute);
app.use(orderRoute);


//port
app.listen(3000, ()=>{
	console.log('Your server is up and running')
});
