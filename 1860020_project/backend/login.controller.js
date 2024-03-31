const Login = require('./login.model.js');

// 새로운 연락처 만들기
exports.create = (req, res) => {
  const login = new Login({
    username: req.body.username,
    password: req.body.password
  });
  
  //데이터베이스에 새로운 연락처 저장하기 
  login.save()
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};


//모든 연락처 검색
exports.findAll = (req, res) => {
  Login.find()
  .then( logins => { 
	res.send(logins);
	console.log(logins)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

//특정한 연락처 검색
exports.findOne = (req, res) => {
  Login.find({_id : req.params._id})
  .then( login => {
    if(!login){
      return res.status(404).send({
        message: req.params._id + "에 해당하는 장치가 없습니다." }); 
    }
    res.send(login);
  }).catch(err => { 
    return res.status(500).send({ message: req.params._id +" 로 검색 중 에러 발생" });
  });  
};

//업데이트
/*exports.update = (req, res) => {
    Login.findOneAndUpdate( {_id:req.params._id}, 
        { Id: req.body.Id, username: req.body.username, password:req.body.password }, 
        {new:true}
    )
    .then( (login) => { 
        if(!login) {
        return res.status(404).send({ message: req.params.Id +
            "에 해당하는 장치가 발견되지 않았습니다." })
        }
        res.send(login);
    }).catch(err => { 
        return res.status(500).send({ message: err.message });
    });
};

//삭제
exports.delete = (req, res) => {
  Login.findOneAndDelete({Id:req.params.Id})
  .then(login => {
    if(!login) {
      return res.status(404).send({ message: req.params.Id +"에 해당하는 Id가 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.Id + " Id가 삭제되었습니다." })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message }); 
  });
};*/