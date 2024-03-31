const calenderData = require('./calender.model.js');

function emitCreateData(req) {      // 새로운 데이터를 클라이언트에 전달하는 함수
  $socket.emit('liveCreateData',{   // 소켓으로 클라이언트에 전달
    calenderId:req.body.calenderId,
    date:req.body.date,
    text:req.body.text
});
};
function emitDeleteData(data) {     // 삭제할 데이터를 클라이언트에 전달하는 함수
  console.log("server: ", data)
  $socket.emit('liveDeleteData',{   // 소켓으로 클라이언트에 전달
    calenderId:data.calenderId
});
};

// 새로운 연락처 만들기
exports.create = (req, res) => {
    const sample = new calenderData({ 
        calenderId: req.body.calenderId,
        date: req.body.date,
        text: req.body.text
    });
    console.log("data update")
    emitCreateData(req); // 소켓으로 새로운 데이터를 클라이언트에 전달
    //데이터베이스에 새로운 연락처 저장하기 
    sample.save()
    .then(data => { 
      res.send(data);
    })
    .catch(err => { 
        res.status(500).send({ message: err.message}); 
    });
};


//모든 연락처 검색
exports.findAll = (req, res) => {
  calenderData.find()
  .then( samples => { 
	res.send(samples);
	console.log(samples)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

// 특정 연락처 업데이트
exports.update = (req, res) => {
  calenderData.findOneAndUpdate({ calenderId: req.params.calenderId }, {
    calenderId: req.body.calenderId,
    date: req.body.date,
    text: req.body.text
  }, { new: true })
    .then(updatedData => {
      if (!updatedData) {
        return res.status(404).send({
          message: req.params.calenderId + "에 해당하는 장치가 없습니다."
        });
      }
      emitDeleteData(updatedData) // 소켓으로 삭제할 데이터를 클라이언트에 전달
      emitCreateData(req); // 소켓으로 새로운 데이터를 클라이언트에 전달
      res.send(updatedData);
    })
    .catch(err => {
      return res.status(500).send({
        message: "업데이트 중 에러 발생: " + err.message
      });
    });
};

// 특정 연락처 삭제
exports.delete = (req, res) => {
  calenderData.findOneAndDelete({ calenderId: req.params.calenderId })
    .then(deletedData => {
      if (!deletedData) {
        return res.status(404).send({
          message: req.params.calenderId + "에 해당하는 장치가 없습니다."
        });
      }
      emitDeleteData(deletedData) // 소켓으로 삭제할 데이터를 클라이언트에 전달
      res.send({ message: "장치가 성공적으로 삭제되었습니다." });
    })
    .catch(err => {
      return res.status(500).send({
        message: "삭제 중 에러 발생: " + err.message
      });
    });
};
