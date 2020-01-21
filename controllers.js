const { Todo, User } = require('./models');
const { Op } = require('sequelize');

module.exports = {
	logInController: (req, res) => {
		//app.post('/user/login', logInController);
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
				session.userid = data.id;
				res.status(200).json({
					id: session.userid
				});
			})
			.catch(err => {
				res.status(404).send(err);
			});
	},

	logOutController: (req, res) => {
		// TODO : 로그아웃  세션 제거해주기;
		// app.get('/user/logout', logOutController);

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
		//app.post('/user/signup', signUpController);

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
					return res.status(409).send('user already exists');
				}
				return res.status(201).send(user);
			})
			.catch(error => {
				console.log(error);
				res.sendStatus(500);
			});
	},

	todoPageController: (req, res) => {
		//app.get('/user/todopage', todoPageController);

		// TODO : 유저 todolist 요청
		const session = req.session;
		if (session.userid) {
			Todo.findAll({ where: { userid: session.userid } })
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
		//app.get('/user/mypage', myPageController);

		// TODO : 유저 회원정보 요청 로직 작성 //상훈
		// TODO : 유저 회원정보 요청 로직 작성
		const session = req.session;
		User.findOne({ where: { id: session.userid } })
			.then(userData => {
				Todo.count({ where: { userid: session.userid } }).then(todoCount => {
					Todo.count({
						where: { userid: session.userid, status: true }
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
		//app.post('/todo/add', todoAdd);

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
		// app.delete('/todo/delete', todoDelete);

		//TODO: todo삭제
		const { todoid, todoitem } = req.body;
		const { userid } = req.session;
		Todo.destroy({ where: { todoid: todoid, userid: userid, todoitem: todoitem } })
			.then(result => {
				console.log(result);
				res.json({});
			})
			.catch(err => {
				console.error(err);
			});
	},
	todoInfo: (req, res) => {
		//app.post('/todo/info', todoInfo);

		// TODO: todoid를 받아오면 해당 데이터를 보내주는 api
		const { todoid } = req.body;
		const { userid } = req.session;
		Todo.findOne({
			where: {
				userid: userid,
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
		// app.post('/todo/status', todoStatusEdit);
		// 받아온 새로운 값을 업데이트 해주는  todoapi
		const { todoid, status } = req.body;

		Todo.update({ status: status }, { where: { todoid: todoid } })
			.then(res => {
				res.status(200).send('info status  update!');
			})
			.catch(err => {
				console.log(err);
			});
	},
	myPageUserInfoEdit: (req, res) => {
		// app.put('/user/edit', myPageUserInfoEdit);
		let id = req.session.userid;

		const { username, email, password } = req.body;
		if (username) {
			User.update({ username: username }, { where: { id: id } })
				.then(res => {
					res.status(200).send('username info updated!');
				})
				.catch(err => {
					console.log(err);
				});
		} else if (email) {
			User.update({ email: email }, { where: { id: id } })
				.then(res => {
					res.status(200).send('email info updated!');
				})
				.catch(err => {
					console.log(err);
				});
		} else if (password) {
			User.update({ password: password }, { where: { id: id } })
				.then(res => {
					res.status(200).send('password info updated!');
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	calendarController: (req, res) => {
		//app.post('/calendar', calendarController);

		console.log('reqbody is: ', req.body);
		const { createdAt } = req.body;
		console.log('createdAt is: ', createdAt);
		Todo.findAll({
			attributes: ['userid', 'todoid', 'todoitem', 'status', 'createdAt', 'updatedAt'],
			where: { createdAt: { [Op.startsWith]: createdAt } }
		})
			.then(datas => {
				res.json(datas);
			})
			.catch(err => {
				console.log(err);
			});
	},

	todoPagePlusController: (req, res) => {
		//app.post('/user/getid', todoPagePlusController);
		// TODO : 유저 todolist 요청
		const session = req.session;
		if (session.userid) {
			User.findOne({ where: { id: session.userid } })
				.then(datas => {
					return res.status(200).json(datas);
				})
				.catch(err => {
					console.log(err);
					res.sendStatus(500);
				});
		}
	}
};
