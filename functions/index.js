const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const app = express();
const cors = require('cors')({origin: true});
app.use(cors);

app.get('/channels', (req, res) => {
  let channelsRef = admin.database().ref('channels');
  channelsRef.once('value', snapshot => {
    let items = new Array();
    snapshot.forEach(childSnapshot => {
        let cname = childSnapshot.key;
        items.push(cname);
    });

    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({channels: items});
  });
});

app.post('/channels', (req, res) => {
  let cname = req.body.cname;
  createChannel(cname);

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok'});
});

const createChannel = cname => {
  let channelsRef = admin.database().ref('channels');

  let date1 = new Date();
  let date2 = new Date();
  date2.setSeconds(date2.getSeconds() + 1);
  const defaultData = `{
      "messages" : {
          "1" : {
              "body" : "Welcome to #${cname} channel!",
              "date" : "${date1.toJSON()}",
              "user" : {
                  "avatar" : "",
                  "id" : "robot",
                  "name" : "Robot"
              }
          },
          "2" : {
              "body" : "はじめてのメッセージを投稿してみましょう。",
              "date" : "${date2.toJSON()}",
              "user" : {
                  "avatar" : "",
                  "id" : "robot",
                  "name" : "Robot"
              }
          }
      }
  }`;

  channelsRef.child(cname).set(JSON.parse(defaultData));
};
