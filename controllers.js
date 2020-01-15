//const { user } = require('./models');
module.exports = {
  logInController: (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
    const { email, password } = req.body;
    const session = req.session;

    user
      .findOne({
        where: {
          email: email,
          password: password
        }
      })
      .then(data => {
        if (!data) {
          return res.status(404).send('invalid user');
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
    // TODO : 로그인 및 인증 부여 로직 작성 // 노시
  },

  signUpController: (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성 // 노시
  },

  todoPageContoroller: (req, res) => {
    // TODO : 유저 todolist 요청 // 상훈노시
    
  },

  myPageContoroller: (req, res) => {
    // TODO : 유저 회원정보 요청 로직 작성 //상훈
  },

  todoAdd: (req, res) => {
    //TODO: todo 추가 // 상훈
  },

  todoEdit: (req, res, next) => {
    //TODO: todo 변경 //엄
    const { todoid, todoitem } = req.body;
    Todo.update({
      todoid: todoid,
      todiitem: todoitem,
      status: "incomplete"
    },
    {where : req.params.userid})
    .then(function(rowsUpdated) {
      res.json(rowsUpdated)
    })
    .catch(next)
  },
  // Book.update(
  //   {title: req.body.title},
  //   {where: req.params.bookId}
  // )
  // .then(function(rowsUpdated) {
  //   res.json(rowsUpdated)
  // })
  // .catch(next)


  todoDelete: (req, res) => {
    //TODO: todo삭제 //노시
  }
    //inFoContoroller: (req, res) => {
    // TODO : 유저 todolist 요청
  //}
};