module.exports = app => {
  const teacher = require("../controllers/teacher.controller.js");
  const router = require("express").Router();

  router.post('/create', teacher.create);
  router.get('/allTeacher', teacher.allTeacher);
  router.post('/delete', teacher.delete);
  router.post('/update', teacher.updateTeacher);
  app.use("/teacher", router);
};
