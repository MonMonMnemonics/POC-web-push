const express = require("express");
const path = require("path");
const app = express();
const webpush = require("web-push");
const bodyparser = require("body-parser");

app.use(bodyparser.json());
let clientList = [];

const VKey = webpush.generateVAPIDKeys();
/*
const VKey = {
    publicKey: 'BPGE9ENYMZHXl0BoZRFTasBe4RFokmqbW6dTLkgfB27gP63Meg7GuQZMHmV8wcnSpBotOUuG5fkcEA2_yUc9xZI',
    privateKey: 'ixlDyjScE4pxULDBd7zxCu2x1qHxdPaa-mrGc09Bgd8'
};
*/
webpush.setVapidDetails("https://test.3mworkshop.com", VKey.publicKey, VKey.privateKey);

app.get("/vapid", (req, res) => {
    return res.status(200).send(VKey.publicKey);
});

app.post("/register", (req, res) => {
    clientList.push(req.body);
    return res.sendStatus(201);
});

app.post("/sendSignal", (req, res) => {
    const payload = {
      msg: req.body.payload,
      url: "https://3mworkshop.com"
    };
    const options = {
      TTL: req.body.ttl,
    };

    setTimeout(() => {
      clientList.forEach(e => {
        webpush.sendNotification(e, JSON.stringify(payload), options).then(() => {
          res.sendStatus(201);
        }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
      })
    }, req.body.delay * 1000);
});

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/pusher", (req, res) => {
    return res.sendFile(path.join(__dirname + "/pusher.html"));
})

app.get("/testicon.jpg", (req, res) => {
    return res.sendFile(path.join(__dirname + "/icon.jpg"));
})

app.get("/service-worker.js", (req, res) => {
    return res.sendFile(path.join(__dirname + "/service-worker.js"));
})

app.listen(3000, () => {
    console.log("Server Ready");
})