<<<<<<< HEAD
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();
const port = 4000;
const {
  logInController,
  logOutController,
  signUpController,
  myPageController,
  todoPageController,
  todoAdd,
  todoEdit,
  todoDelete
} = require("./controllers");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
=======
const express = require('express');

require('./models');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 4000;
const {
	logInController,
	logOutController,
	signUpController,
	myPageController,
	todoPageController,
	todoAdd,
	todoEdit,
	todoDelete
} = require('./controllers');

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true
	})
>>>>>>> ff75f174ca709fa19964dca985490a0ca13f1011
);
//세션을 사용하는 형식임

app.use(bodyParser.json());
//바디파서를 사용하는 형식

app.use(morgan("dev"));
//모건을 사용하는 형식

app.use(
<<<<<<< HEAD
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
//코어스를 사용하는 형식

app.get("/user", () => {
  console.log("helloworld");
=======
	cors({
		origin: ['http://localhost:3000'],
		method: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true
	})
);
//코어스를 사용하는 형식

app.get('/user', () => {
	console.log('helloworld');
>>>>>>> ff75f174ca709fa19964dca985490a0ca13f1011
});

/*
app.post('/user/login', logInController);
app.post('/user/signup', signUpController);
app.get('/user/logout', logOutController);
<<<<<<< HEAD
=======
app.get('/user/mypage', myPageController);
app.get('/user/todopage', todoPageController);
app.post('/todo/add', todoAdd);
>>>>>>> ff75f174ca709fa19964dca985490a0ca13f1011
app.put('/todo/edit', todoEdit);
app.delete('/todo/delete', todoDelete);
*/
app.get("/user/mypage", myPageController);
app.get("/user/todopage", todoPageController);
app.post("/todo/add", todoAdd);

app.listen(port, () => {
<<<<<<< HEAD
  console.log(`server listen on ${port}`);
=======
	console.log(`server listen on ${port}`);
>>>>>>> ff75f174ca709fa19964dca985490a0ca13f1011
});

module.exports = app;
