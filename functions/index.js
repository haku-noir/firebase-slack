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
