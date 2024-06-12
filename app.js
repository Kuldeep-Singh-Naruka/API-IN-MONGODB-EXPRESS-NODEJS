const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const settings = require('./config/settings');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/student.routes")(app);
require("./routes/teacher.routes")(app);
require("./routes/classes.routes")(app);

app.listen(settings.port, '0.0.0.0', function () {
    console.log('Server running on port ' + settings.port);
});
