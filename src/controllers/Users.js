const ODM = require("mongoose");
const bcrypt = require('bcrypt')
const User = require("../models/User");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const jwt = require('jsonwebtoken');

const Users = {
  index: (request, response) => {
    User
      .find()
      .exec()
      .then(users => {
        response
          .status(200)
          .json({
            total: users.length,
            data: users
          });
      }).catch(err => {
        console.log(`caugth err: ${err}`);
        return res.status(500).json(err)
      })
  },

  signup: (req, res) => {
    User
      .find({ email: req.body.email })
      .exec()
      .then(users => {
        if (users.length < 1) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500)
                .json({ message: err })
            }

            const newUser = new User({
              _id: new ODM.Types.ObjectId(),
              fullName: req.body.fullName,
              email: req.body.email,
              phoneNumber: req.body.phoneNumber,
              password: hash,
            })
            newUser
              .save()
              .then(saved => {
                res.status(200)
                  .json({
                    message: "User created successfully",
                    data: saved
                  })
              })
          })
        } else {
          res.status(422) // ya existe ese obj
            .json({
              message: 'User already exist.'
            })
        }
      })
  },
  login: (req, res) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length > 0) {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401)
                .json({
                  message: "Autentication Failed"
                })
            }
            if (result) {
              const token = jwt.sign({
                fullName: user[0].fullName,
                email: user[0].email,
              }, process.env.JWT_SECRETKEY, {
                  expiresIn: "1hr"
                });
              return res
                .status(200)
                .json({
                  message: 'Authentication Successfull',
                  token
                })
            }
            res.status(401)
              .json({
                message: "Authentication"
              })
          })
        } else {
          res
            .status(422)
            .json({
              message: "Authentication Failed"
            })
        }
      })
  },

  findBy: (req, res) => {
    User
      .findById(req.params.userId)
      .exec()
      .then(data => {
        res.json({
          type: 'Found User by Id',
          data: data
        })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err ${err}`);
        return res.status(500).json(err)
      })
  },

  findincomesBy: (req, res) => {
    Income
      .find({ user: req.params.userId })
      // .populate()
      .exec()
      .then(data => {
        res.json({
          type: 'Finding the treatment',
          data: data
        })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`);
        return res.status(500).json(err)
      })
  },

  findexpenseBy: (req, res) => {
    Expense
      .find({ user: req.params.userId })
      // .populate()
      .exec()
      .then(data => {
        res.json({
          type: 'Finding the treatment',
          data: data
        })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`);
        return res.status(500).json(err)
      })
  },



  delete: (request, response) => {
    const { userId } = request.params;

    User
      .findOneAndDelete(userId)
      .exec()
      .then(deleted => {
        response
          .status(200)
          .json({
            msg: `${deleted.fullName} was deleted.`
          })
      })
  }
};

module.exports = Users;



  // create: (request, response) => {
  //   const newUser = new User({
  //     _id: new ODM.Types.ObjectId(),
  //     fullName: request.body.fullName,
  //     email: request.body.email,
  //     number: request.body.number,
  //     password: request.body.password,

  //   });

  //   console.log(newUser);

  //   newUser
  //     .save()
  //     .then(created => {
  //       Tweet
  //         .findById(request.body.tweetId)
  //         .exec()
  //         .then(tweet => {

  //           console.log(created);

  //           tweet.users.push(created._id);
  //           tweet.save();

  //           // console.log(tweet)

  //           response
  //             .status(200)
  //             .json({
  //               data: created
  //             });
  //         })
  //         .catch();
  //     })
  //     .catch(error => console.log(error));
  // },