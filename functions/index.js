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

const checkUser = (req, res, next) => {
  req.user = anonymousUser;

  if(req.query.auth_token != undefined){
    let idToken = req.query.auth_token;
    admin.auth().verifyIdToken(idToken).then(decodeIdToken => {
      let authUser = {
        id: decodeIdToken.user_id,
        name: decodeIdToken.name,
        avater: decodeIdToken.picture
      };
      req.user = authUser;
      next();
    }).catch(error => {
      next();
    });
  }
};

app.use(checkUser);
