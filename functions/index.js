const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const app = express();
const cors = require('cors')({origin: true});
app.use(cors);

const anonymousUser = {
  id: "anon",
  name: "Anonymouse",
  avater: ""
};

const chackUser = (req, res, next) => {
  rqq.user = anonymousUser;
};

app.use(chackUser);
