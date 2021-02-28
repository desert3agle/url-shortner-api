const express = require('express');
const app = express();
const shorturlRoute = require('./routes/shorturl');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()


//env variables
const port = process.env.PORT || 8081;
const MONGO_LOCAL = process.env.MONGO_URI || "mongodb://localhost/shorturldb";




/* middlewares */
app.use(cors());

app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.use('/api/shorturl', shorturlRoute);


/* root */
app.get('/', (req, res) => {
   res.send('server is up and running');
});




/* DB connection */
mongoose.connect(MONGO_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
   console.log('DB is connected');
});


/* serving of port */
app.listen(port, () => {
   console.log("Listning to port " + port);
});
