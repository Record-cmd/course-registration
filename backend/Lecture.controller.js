const Contact = require('./Lecture.model.js');
const LectureList = require('./LectureList.model');
const cheerio = require("cheerio");


exports.create = (req, res) => {
  const contact = new Contact({
    lectureId: req.body.lectureId, 
    title: req.body.title,
    professor: req.body.professor,

  });
  
  contact.save() //DB에 저장함
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};

exports.Listcreate = (req, res) => {
  const contact = new LectureList({
    lectureId: req.body.lectureId, 
    title: req.body.title,
    introduction: req.body.introduction,
    professor: req.body.professor,
  });
  
  contact.save() //DB에 저장함
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};

exports.findAll = (req, res) => {
  Contact.find()
  .then( contacts => { 
	res.send(contacts);
	console.log(contacts)
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

exports.findListAll = (req, res) => {
  LectureList.find()
  .then( contacts => { 
	res.send(contacts);
	console.log(contacts)
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};


exports.findOne = (req, res) => {
  Contact.findOne({lectureId : req.params.id}) //주소 params를 통해 들어온 contactId를 이용해 원하는 데이터를 찾음
  .then( contact => {
    if(!contact){
      return res.status(404).send({
        message: req.params.id + "에 해당하는 강의가 없습니다." }); 
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: req.params.id +" 로 검색 중 에러 발생" }); //params가 정확하지 않거나 에러발생시 출력
  });  
};

exports.findListOne = (req, res) => {
  LectureList.findOne({lectureId : req.params.id}) //주소 params를 통해 들어온 contactId를 이용해 원하는 데이터를 찾음
  .then( contact => {
    if(!contact){ //만약 해당하는 lectureId 없다면 ~에 해당하는 강의가 없습니다 출력
      return res.status(404).send({
        message: req.params.id + "에 해당하는 강의가 없습니다." }); 
    }
    res.send(contact); //해당하는 강의가 있다면 그대로 send
  }).catch(err => { 
    return res.status(500).send({ message: req.params.id +" 로 검색 중 에러 발생" }); //params가 정확하지 않거나 에러발생시 출력
  });  
};


exports.correction = (req, res) => {
  Contact.findOneAndUpdate( {lectureId:req.params.id}, 
    { lectureId: req.body.id, title:req.body.title, professor:req.body.professor}, 
    {new:true}
  )
  .then(contact => { 
    if(!contact) {
      return res.status(404).send({ message: req.params.id +
        "에 해당하는 강의가 발견되지 않았습니다." })
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: err.message });
  });
};

exports.ListUpdata = (req, res) => {
  LectureList.findOneAndUpdate( {lectureId:req.params.id}, 
    { lectureId: req.body.id, title:req.body.title,introduction:req.body.introduction,professor:req.body.professor}, 
    {new:true}
  )
  .then(contact => { 
    if(!contact) {
      return res.status(404).send({ message: req.params.id +
        "에 해당하는 강의가 발견되지 않았습니다." })
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: err.message });
  });
};

exports.delete = (req, res) => {
  Contact.findOneAndDelete({lectureId:req.params.id})
  .then(contact => {
    if(!contact) {
      return res.status(404).send({ message: req.params.id +"에 해당하는 강의가 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.id + " 강의가 삭제되었습니다." })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message }); 
  });
};

exports.Listdelete = (req, res) => {
  LectureList.findOneAndDelete({lectureId:req.params.id})
  .then(contact => {
    if(!contact) {
      return res.status(404).send({ message: req.params.id +"에 해당하는 강의가 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.id + " 강의가 삭제되었습니다." })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message }); 
  });
};

exports.crawling = (req, res) => {
  const getHtml = async () => {
    try {
        return await axios.get("https://cyber.mokwon.ac.kr/Main.do?cmd=viewHome");
    } catch (error) {
        console.error(error);
    }
};

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div#tab1 ul").children("li");

        $bodyList.each(function (i, elem) {
            ulList[i] = {
                title: $(this).find('a').text(),
                value: $(this).find('span:nth-child(2)').text()//attr('href'),
            };
        });

        const data = ulList.filter(n => n.title);
        const Json = JSON.stringify(data); //data를 Json으로 변환
        res.send(Json); //변환된 Json을 send
        return data;
    })
    .then(res =>console.log(res)); 
};

exports.check_lecture = (req, res) => {
  Contact.findOne({lectureId : req.params.id}) //주소 params를 통해 들어온 contactId를 이용해 원하는 데이터를 찾음
  .then( contact => {
    if(!contact){
      return res.json({ duplicated: false });
      }
      // 찾으면 duplicated: true 리턴
    return res.json({ duplicated: true });
  }).catch(err => { 
    return res.status(500).send({ message: req.params.id +" 로 검색 중 에러 발생" }); //params가 정확하지 않거나 에러발생시 출력
  });  
};

exports.check_List = (req, res) => {
  LectureList.findOne({lectureId : req.params.id}) //주소 params를 통해 들어온 contactId를 이용해 원하는 데이터를 찾음
  .then( contact => {
    if(!contact){ //만약 해당하는 lectureId 없다면 ~에 해당하는 강의가 없습니다 출력
      return res.json({ duplicated: false });
      }
      // 찾으면 duplicated: true 리턴
    return res.json({ duplicated: true });
  }).catch(err => { 
    return res.status(500).send({ message: req.params.id +" 로 검색 중 에러 발생" }); //params가 정확하지 않거나 에러발생시 출력
  });  
};