const { Router } = require("express");

const Users = require("../controllers/Users");
const Incomes = require("../controllers/Incomes");
const Expenses = require("../controllers/Expenses");
const Savings = require('../controllers/Savings')
const Reminders = require('../controllers/Reminders')
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
app.route('/users/:userId/incomes/:incomeId')
  .delete(Incomes.delete)
  .put(Incomes.updateBy)
  .get(Incomes.findBy)
app.route("/users/:userId/incomes")
  .post(Incomes.create)
  .get(Users.findincomesBy);

//Route Expenses
app.get('/expenses', Expenses.index)
// app.get('/expenses/:expenseId', Expenses.findBy)
app.route('/users/:userId/expenses/:expenseId')
  .delete(Expenses.delete)
  .put(Expenses.updateBy)
  .get(Expenses.findBy);
app.route("/users/:userId/expenses")
  .post(Expenses.create)
  .get(Users.findexpenseBy);

//Router Saving
app.get('/savings', Savings.index)
app.route('/users/:userId/savings/:savingId')
  .get(Savings.findBy)
  .delete(Savings.delete)
  .put(Savings.updateBy)
app.route("/users/:userId/savings")
  .post(Savings.create)
  .get(Users.findsavingBy);

// Router Reminders
app.get('/reminders', Reminders.index)
app.route('/users/:userId/expenses/:expenseId/reminders/:reminderId')
  .put(Reminders.updateBy)
  .get(Reminders.findBy)
  .delete(Reminders.delete)
app.route("/users/:userId/expenses/:expenseId/reminders")
  .post(Reminders.create)
  .get(Expenses.findreminderBy);


module.exports = app;
