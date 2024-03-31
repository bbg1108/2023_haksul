const mongoose = require('mongoose');

var CalenderSchema = mongoose.Schema({   //스키마(Schema) 설정
  calenderId: {type: Number, require:true},
  date: { type: String, require: true},
  text: { type: String, require: true}
});

module.exports = mongoose.model('Calender', CalenderSchema);