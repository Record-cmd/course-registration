const mongoose = require('mongoose');

var ContactSchema = mongoose.Schema({   
  lectureId: {type: Number, require:true}, //등록된 강의의 ID
  title: { type: String, require: true}, //강의명
  professor:{type: String, require: true}, //강의교수명
});

module.exports = mongoose.model('Contact', ContactSchema); 
//----------------주의 Contact는 신청한 강의 DB임 신청가능한 강의 DB는 LectureList임 사용주의------------------------