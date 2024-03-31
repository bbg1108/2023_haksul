module.exports = (app) => {
  const devices = require('./device.controller.js');  //contact.controller.js를 로딩
  const calenders = require('./calender.controller.js');  //contact.controller.js를 로딩
  const logins = require('./login.controller.js');

  const authenticateUser = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('인증 성공');
        next();
    } else {
      console.log('인증 실패');
      res.send({code:2});
    }
  };

  app.get('/devices', authenticateUser, devices.findAll); // 모든 편의시설 검색
  app.get('/devices/:deviceId', devices.findOne); // 특정 편의시설 검색
  app.post('/devices', authenticateUser, devices.create); // 새 편의시설 추가
  app.put('/devices/:deviceId', devices.update); // 특정 편의시설 수정
  app.delete('/devices/:deviceId', devices.delete); // 특정 편의시설 삭제

  app.get('/calenders', authenticateUser, calenders.findAll ); // 모든 스케줄 정보 검색
  app.post('/calenders', calenders.create); // 새 스케줄 정보 추가
  app.put('/calenders/:calenderId', calenders.update ); // 특정 스케줄 정보 수정
  app.delete('/calenders/:calenderId', calenders.delete ); // 특정 스케줄 정보 삭제

  app.get('/logins', logins.findAll);      //모든 Id 검색
  app.get('/logins/:Id', logins.findOne);  //특정 Id 검색
  app.post('/logins', logins.create);      //새로운 유저 추가, 회원 가입
}
