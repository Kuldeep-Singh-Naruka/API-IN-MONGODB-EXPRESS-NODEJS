module.exports = app => {
  const classes = require("../controllers/classes.controller.js");
  const router = require("express").Router();

  router.post('/create', classes.create);
  router.get('/allClasses', classes.allClasses);
  router.post('/delete', classes.delete);
  router.post('/update', classes.updateClasses);

  app.use("/classes", router);
};
