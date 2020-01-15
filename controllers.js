const { Todo, User } = require("./models");
module.exports = {
  logInController: (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
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

    User.findOrCreate({
      where: {
        username: username,
        email: email,
        password: password
      }
    })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send("email exists");
        }
        return res.status(201).send(user);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  },
  todoPageContoroller: (req, res) => {
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
  myPageContoroller: (req, res) => {
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
  todoEdit: (req, res) => {
    //TODO: todo 변경
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
  }
  //
};
