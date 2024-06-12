module.exports = app => {
  const student = require("../controllers/student.controller.js");
  const authenticateToken = require('../middleware/authenticateToken');

  const router = require("express").Router();

  router.post('/create', student.create);
  router.post('/login', student.login);
  router.post('/delete', student.delete);
  router.post('/update', authenticateToken, student.updateStudent);
 // router.post('/update', student.updateStudent);

  app.use("/student", router);
};
