const { Todo, User } = require("./models");
const { Op } = require("sequelize");
module.exports = {
  logInController: (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
    const { email, password } = req.body;
    const session = req.session;

    User.findOne({
      where: {
        email: email,
        password: password
      }
    })
      .then(data => {
        if (!data) {
          return res.status(404).send("invalid user");
        }
        session.userid = data.id;
        res.status(200).json({
          id: data.id
        });
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },

  logOutController: (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
    const { session } = req;

    if (session.userid) {
      session.destroy(err => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/");
    }
  },

  signUpController: (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성
    const { username, email, password } = req.body;
    console.log("signup reached!");
    User.findOrCreate({
      where: {
        username: username,
        email: email,
        password: password
      }
    })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send("user already exists");
        }
        return res.status(201).send(user);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  },

  todoPageController: (req, res) => {
    // TODO : 유저 todolist 요청
    const session = req.session;
    if (session.userid) {
      Todo.findAll({ where: { todoid: session.userid } })
        .then(datas => {
          return res.status(200).json(datas);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  },

  myPageController: (req, res) => {
    // TODO : 유저 회원정보 요청 로직 작성 //상훈
    // TODO : 유저 회원정보 요청 로직 작성
    const session = req.session;
    User.findOne({ where: { id: session.userid } })
      .then(userData => {
        Todo.count({ where: { todoid: session.userid } }).then(todoCount => {
          Todo.count({
            where: { todoid: session.userid, status: "complete" }
          }).then(completeCount => {
            let data = {
              userinfo: userData,
              todoCount: todoCount,
              completeCount: completeCount
            };
            res.status(200).json(data);
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  todoEdit: (req, res, next) => {
    //TODO: todo 변경 //엄
    const { todoid, todoitem } = req.body;
    Todo.update(
      {
        todoid: todoid,
        todiitem: todoitem,
        status: "incomplete"
      },
      { where: req.params.userid }
    )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated);
      })
      .catch(next);
  },
  // Book.update(
  //   {title: req.body.title},
  //   {where: req.params.bookId}
  // )
  // .then(function(rowsUpdated) {
  //   res.json(rowsUpdated)
  // })
  // .catch(next)

  todoAdd: (req, res) => {
    //TODO: todo 추가
    const { todoid, todoitem } = req.body;
    Todo.create({
      todoid: todoid,
      todoitem: todoitem,
      status: "incomplete"
    }).then(el => {
      res.status(200).send("created");
    });
  },
  todoDelete: (req, res) => {
    //TODO: todo삭제
    const { clickedTodoItem } = req.body;

    Todo.destroy({ where: { todoitem: clickedTodoItem } })
      .then(result => {
        res.json({});
      })
      .catch(err => {
        console.error(err);
      });
  },
  myPageUserInfoEdit: (req, res) => {
    let id = req.session.userid;
    const { username, email, password } = req.body;
    console.log("myPageUserInfoEdit reached!");
    if (username) {
      User.update({ username: username }, { where: { id: id } })
        .then(res => {
          res.status(200).send("username info updated!");
        })
        .catch(err => {
          console.log(err);
        });
    } else if (email) {
      User.update({ email: email }, { where: { id: id } })
        .then(res => {
          res.status(200).send("email info updated!");
        })
        .catch(err => {
          console.log(err);
        });
    } else if (password) {
      User.update({ password: password }, { where: { id: id } })
        .then(res => {
          res.status(200).send("password info updated!");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  calendarController: (req, res) => {
    console.log("reqbody is: ", req.body);
    const { createdAt } = req.body;
    console.log("createdAt is: ", createdAt);
    Todo.findAll({
      attributes: [
        "id",
        "todoid",
        "todoitem",
        "status",
        "createdAt",
        "updatedAt"
      ],
      where: { createdAt: { [Op.startsWith]: createdAt } }
    })
      .then(datas => {
        res.json(datas);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
