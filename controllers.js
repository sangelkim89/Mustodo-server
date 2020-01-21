const { Todo, User } = require('./models');
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
					return res.status(404).send('invalid user');
				}
				session.userid = data.userid;
				res.status(200).json({
					id: data.userid
				});
			})
			.catch(err => {
				res.status(404).send(err);
			});
	},

	logOutController: (req, res) => {
		// TODO : 로그아웃  세션 제거해주기;
		const { session } = req;

		if (session.userid) {
			session.destroy(err => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.redirect('/');
				}
			});
		} else {
			res.redirect('/');
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
					return res.status(409).send('email exists');
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
		// TODO : 유저 회원정보 요청 로직 작성 //상훈
		// TODO : 유저 회원정보 요청 로직 작성
		const session = req.session;
		User.findOne({ where: { id: session.userid } })
			.then(userData => {
				Todo.count({ where: { todoid: session.userid } }).then(todoCount => {
					Todo.count({
						where: { todoid: session.userid, status: 'complete' }
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
		const { userid, todoid, todoitem, status } = req.body;
		Todo.create({
			userid: userid,
			todoid: todoid,
			todoitem: todoitem,
			status: status
		})
			.then(el => {
				res.status(200).send('created');
			})
			.catch(err => {
				console.error(err);
			});
	},
	todoDelete: (req, res) => {
		//TODO: todo삭제
		const { todoid } = req.body;

		Todo.destroy({ where: { todoid: todoid } })
			.then(result => {
				res.json({});
			})
			.catch(err => {
				console.error(err);
			});
	},
	todoInfo: (req, res) => {
		// TODO: todoid를 받아오면 해당 데이터를 보내주는 api
		const { todoid } = req.body;
		Todo.findOne({
			where: {
				todoid: todoid
			}
		})
			.then(data => {
				if (!data) {
					return res.status(404).send('invalid todoData');
				}
				res.status(200).json({
					data: data
				});
			})
			.catch(err => {
				res.status(404).send(err);
			});
	},
	todoStatusEdit: (req, res) => {
		// 받아온 새로운 값을 업데이트 해주는  todoapi
		const { todoid, status } = req.body;

		Todo.update({ status: status }, { where: { todoid: todoid } })
			.then(res => {
				res.status(200).send('info status  update!');
			})
			.catch(err => {
				console.log(err);
			});
	}
};
