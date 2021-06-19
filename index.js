const express = require('express');
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const clothes = require('./routes/api/clothesDetails');
const app = express();

//Body parser MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//DB Config
const db = require('./config/connect').mongoURI;

// mongo Db setup
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(
  (error) =>console.log(JSON.stringify(error))
)
console.log('DB Connected!')
// Passport inilization
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

//Define
// app.get('/', (req, res) => res.send(" Starting node server ....."));

//Define Routes
app.use('/api/users', users);
app.use('/api/clothes', clothes);

//Server Static assets if in production
if(process.env.NODE_ENV === 'production'){
  //Set Static Folder
  app.use(express.static('client/build'));
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;
// App listen on local 5000 port
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
