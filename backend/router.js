module.exports = (app) => {
  const contacts = require('./Lecture.controller.js');
  //==============학생입장=================
  app.get('/lecture/', contacts.findAll);
  app.get('/lecture/:id', contacts.findOne);  
  app.post('/lecture',contacts.create);
  app.put('/lecture/:id', contacts.correction);
  app.delete('/lecture/:id', contacts.delete);
  app.post('/check_lecture/:id', contacts.check_lecture);
  
  //=============관리자입장=====================
  app.post('/lectureList/',contacts.Listcreate);
  app.get('/lectureList/', contacts.findListAll);
  app.put('/lectureList/:id', contacts.ListUpdata);
  app.get('/lectureList/:id', contacts.findListOne);
  app.delete('/lectureList/:id', contacts.Listdelete);
  app.post('/check_List/:id', contacts.check_List);

  const pollution = require('./pollutionController.js')
  app.get('/airkorea/:region',pollution.read);

  app.get('/crawling', contacts.crawling);
}
