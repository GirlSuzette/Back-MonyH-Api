const { Router } = require("express");

const Users = require("../controllers/Users");
const Incomes = require("../controllers/Incomes");
const Expenses = require("../controllers/Expenses");
const Savings = require('../controllers/Savings')
const isAuthenticated = require('../../services/Auth');


const app = Router();

//Route User
app.route("/users")
  .get(Users.index);

app.route("/users/:userId")
  .get(isAuthenticated, Users.findBy)
  .put(isAuthenticated, Users.updateBy)
  .delete(isAuthenticated, Users.delete);
//Route aute
app.post('/auth/signup', Users.signup)
app.post('/auth/login', Users.login)

//Route Incomes
app.get('/incomes', Incomes.index)
app.route("/users/:userId/incomes")
  .post(Incomes.create)
  .get(Users.findincomesBy);

//Route Expenses
app.get('/expenses', Expenses.index)
app.route("/users/:userId/expenses")
  .post(Expenses.create)
  .get(Users.findexpenseBy);

//Router Saving
app.get('/saving', Expenses.index)
app.route("/users/:userId/saving")
  .post(Savings.create)
  .get(Users.findsavingBy);


module.exports = app;
