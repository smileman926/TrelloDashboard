require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
//const errorHandler = require('errorhandler');
//const { CLIENT_ORIGIN } = require('./config')

//Configure mongoose.Promise to global Promise
//mongoose.Promise = global.Promise;


const app = express();

//Configure App
var graphqlHTTP = require('express-graphql');
var schema = require('./graphql/boardSchemas');
app.use(cors());
// app.use(cors({
//   origin: CLIENT_ORIGIN
// }))
// app.use(
//   cors({
//     origin: "http://localhost:3000", // allow to server to accept request from different origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true // allow session cookie from browser to pass through
//   })
// );
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))
const google = require('./routes/api/google');

//Configure mongoose
mongoose.connect('mongodb://uim1gczxep9hv8lpgrn0:7IC9RrIIFgoiy3vQu4Aa@boceabjdflttdoe-mongodb.services.clever-cloud.com:27017/boceabjdflttdoe', {useNewUrlParser:true});
mongoose.set('debug', true);

// app.use(require('express-session')({
//     secret: 'chatroom',
//     resave: false,
//     saveUninitialized: false
// }));
  const passport = require('./passport');
  //const LocalStrategy = require('passport-local').Strategy;
  const users = require('./routes/api/users');
  app.use(passport.initialize());
  app.use(passport.session());

  //const User = require('./models/Users');
  //passport.use(new LocalStrategy(User.authenticate()));
  // passport.serializeUser(User.serializeUser());
  // passport.deserializeUser(User.deserializeUser());
// app.use((err, req, res) => {
//   res.status(err.status || 500);
// app.use(function(req,res, next) {
//   res.header("Access-Control-Allow-Origin");
//   res.header("Access-Control-Control-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })
//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

    app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'client','build', 'index.html'));
    });
  // const path = require('path')
  // console.log('YOU ARE IN THE PRODUCTION ENV')
  // app.use('/static', express.static(path.join(__dirname, '../build/static')))
  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../build/'))
  // })

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname,'client','build', 'index.html'));
// });
app.use("/api/users", users);
app.use('/', google)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('Server running on http://localhost:3000/'));