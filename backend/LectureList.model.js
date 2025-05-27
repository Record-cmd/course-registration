const mongoose = require('mongoose');

var ContactSchema = mongoose.Schema({   
  lectureId: {type: Number, require:true}, //등록된 강의의 ID
  title: { type: String, require: true}, //강의명
  introduction: { type: String, require: true},
  professor:{type: String, require: true}, //강의교수명
});

module.exports = mongoose.model('LectureList', ContactSchema); 
//-----------------------------------주의 LectureList는 신청가능한 강의 DB임 신청한강의 DB는 Contact임 사용주의------------------------------------