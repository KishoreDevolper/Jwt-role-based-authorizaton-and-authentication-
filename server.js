const express = require('express');

const app = express();

const dbsetup = require('./db/seeds/db-setup');

dbsetup();

app.use(express.urlencoded({extended:true}));

const PORT = 8080;

app.use(express.json());

require('./routes/auth.routes')(app)

app.listen(PORT,console.log(`server looking on the port ${PORT}`));
