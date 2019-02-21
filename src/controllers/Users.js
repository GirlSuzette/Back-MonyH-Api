const ODM = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Income = require('../models/Income')
const Expense = require('../models/Expense')
const Saving = require('../models/Saving')
const Balances = require('../models/Balance')
const jwt = require('jsonwebtoken')

const Users = {
  index: (request, response) => {
    User.find()
      .exec()
      .then(users => {
        response.status(200).json({
          total: users.length,
          data: users
        })
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  signup: (req, res) => {
    User.find({ email: req.body.email })
      .exec()
      .then(users => {
        if (users.length < 1) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({ message: err })
            }

            const newUser = new User({
              _id: new ODM.Types.ObjectId(),
              fullName: req.body.fullName,
              email: req.body.email,
              phoneNumber: req.body.phoneNumber,
              password: hash
            })
            newUser
              .save()
              .then(saved => {
                res.status(200).json({
                  message: 'User created successfully',
                  data: saved
                })
              })
              .catch(err => {
                console.log(`error create users: ${err} `)
              })
          })
        } else {
          res
            .status(422) // ya existe ese obj
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
              return res.status(401).json({
                message: 'Autentication Failed'
              })
            }
            if (result) {
              const token = jwt.sign(
                {
                  fullName: user[0].fullName,
                  email: user[0].email
                },
                process.env.JWT_SECRETKEY,
                {
                  expiresIn: '1hr'
                }
              )
              return res.status(200).json({
                message: 'Authentication Successfull',
                token
              })
            }
            res.status(401).json({
              message: 'Authentication'
            })
          })
        } else {
          res.status(422).json({
            message: 'Authentication Failed'
          })
        }
      })
  },

  findBy: (req, res) => {
    User.findById(req.params.userId)
      .exec()
      .then(data => {
        res
          .json({
            type: 'Found User by Id',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err ${err}`)
        return res.status(500).json(err)
      })
  },

  findincomesBy: (req, res) => {
    Income.find({ user: req.params.userId })
      // .populate()
      .exec()
      .then(data => {
        res
          .json({
            type: 'Finding the Incomes',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  findexpenseBy: (req, res) => {
    Expense.find({ user: req.params.userId })
      // .populate()
      .exec()
      .then(data => {
        res
          .json({
            type: 'Finding the Expense',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  findsavingBy: (req, res) => {
    Saving.find({ user: req.params.userId })
      // .populate()
      .exec()
      .then(data => {
        res
          .json({
            type: 'Finding the Saving',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  findbalanceBy: (req, res) => {
    Balances.find({ user: req.params.userId })
      // .populate()
      .exec()
      .then(data => {
        res
          .json({
            type: 'Finding the Balance',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  updateBy: (req, res) => {
    const fullName = req.body.fullName
    const email = req.body.email
    const password = req.body.password
    const phoneNumber = req.body.phoneNumber

    User.findOne({ _id: req.params.userId })
      .then(function (user) {
        // console.log(user)
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            user.fullName = fullName
            user.email = email
            user.phoneNumber = phoneNumber

            user.save().then(saved => {
              res.status(201).json({
                message: 'user update successfully',
                user: saved
              })
            })
          } else {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  message: error
                })
              }
              user.fullName = fullName
              user.email = email
              user.phoneNumber = phoneNumber
              user.password = hash
              console.log(user)
              user.save().then(saved => {
                res.status(201).json({
                  message: 'user update succeefully',
                  user: saved
                })
              })
            })
          }
        })
      })
      .catch(err => {
        console.log(`caugt the error: ${err}`)
        return res.status(404).json({ type: 'Not Found' })
      })
  },

  // updateBy: (req, res) => {
  //   const fullName = req.body.fullName
  //   const email = req.body.email
  //   const phoneNumber = req.body.phoneNumber
  //   const password = req.body.password

  //   User.findOne({ _id: req.params.userId })
  //     .then(function (user) {
  //       // console.log(user)
  //       bcrypt.compare(password, user.password, (err, result) => {
  //         if (result) {
  //           user.fullName = fullName
  //           user.email = email
  //           user.phoneNumber = phoneNumber

  //           user.save().then(saved => {
  //             res.status(201).json({
  //               message: 'User update successfully',
  //               user: saved
  //             })
  //           })
  //         } else {
  //           bcrypt.hash(password, 10, (err, hash) => {
  //             if (err) {
  //               return res.status(500).json({
  //                 message: error
  //               })
  //             }
  //             user.fullName = fullName
  //             user.email = email
  //             user.phoneNumber = phoneNumber
  //             user.password = hash
  //             console.log(user)
  //             user.save().then(saved => {
  //               res.status(201).json({
  //                 message: 'User update succeefully',
  //                 user: saved
  //               })
  //             })
  //           })
  //         }
  //       })
  //     })
  //     .catch(err => {
  //       console.log(`caugt the error: ${err}`)
  //       return res.status(404).json({ type: 'Not Found' })
  //     })
  // },

  delete: (req, res) => {
    User.findById(req.params.userId, function (err, user) {
      if (!err) {
        Expense.deleteMany({ user: { $in: [user._id] } }, function (err) {})
        Income.deleteMany({ user: { $in: [user._id] } }, function (err) {})
        user.remove().then(() => {
          res.status(200).json({
            message: 'User was deleted'
          })
        })
      }
    }).catch(err => {
      console.log(`caugth err: ${err}`)
      return res.status(500).json({ message: 'You do not have permission' })
    })
  }
}

module.exports = Users
