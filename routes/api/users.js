const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Load User model
const User = require('../../schemas/Users')
const key = require('../../config/key_path')

//@route  GET /api/users/test
//@desc   Test url users
//@access public

router.get('/test',(req,res) => res.json({msg : 'welcome to user page'}));

//@route  POST /api/users/register
//@desc   Register User
//@access public
//

router.post('/register', (req, res) => {
    User.findOne({email:req.body.email}).then(user => {
      if(user){
        return res.status(400).json( 'Email already exist');
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          password2: req.body.password2,
        });
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password ,salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
  }
);

//@route  POST /api/users/login
//@desc   Login User
//@access public

router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    //Find user by email
    User.findOne({email})
      .then(user => {
        //check for user
        if (!user) {
          // email = 'User not found'
          return res.status(404).json('User not found');
        }
        //check for password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch){
              //Matched
              //create JWT paylod
              const payload = {id:user.id, name:user.name};
              //Sign Token
              jwt.sign(
                payload,
                key.secretOrKey,
                {expiresIn: '30d'},
                (err, token) => {
                  res.json({
                    success: true,
                    token : 'Bearer ' + token
                  });
                }
              );
            } else {
              return res.status(400).json( 'password is incorrect');
            }
          })
      })
  }
);


module.exports = router;