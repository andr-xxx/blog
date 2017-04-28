const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();

const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/usersdb";
app.set('view engine', 'pug');

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  renderAllPosts(req, res);
});

app.get('/home', (req, res) => {
  renderAllPosts(req, res);
});

app.get('/contact', (req, res) => {
  res.render(__dirname + `/public/contact/contact.pug`, {
    title: 'Contacts',
    author: 'Andrey',
    phone: '(050) 71 39 416',
    menu: ['home', 'contact', 'about', 'registration']
  })
});

app.get('/about', (req, res) => {
  res.render(__dirname + `/public/about/about.pug`, {
    title: 'About',
    textAbout: 'My first NodeJS application',
    menu: ['home', 'contact', 'about', 'registration']
  })
});

app.post('/api/addPost', (req, res) => {
  const post = req.body;

  mongoClient.connect(url, (err, db) => {
    db.collection("posts").insertOne(post, (err, result) => {

      if(err) return res.status(400).send();

      renderAllPosts(req, res);
      db.close();
    });
  });
});

app.delete('/api/deletePost', (req, res) => {
  const id = new objectId(req.body.id);
  mongoClient.connect(url, (err, db) => {
    db.collection("posts").findOneAndDelete({_id: id}, (err, result) => {

      if (err) return res.status(400).send();
      renderAllPosts(req, res);
      db.close();
    });
  });
});
app.listen(9002);

app.get('/registration', (req, res) => {
  res.render(__dirname + `/public/registration/index.pug`)
});

function renderAllPosts(req, res) {
  mongoClient.connect(url, (err, db) => {
    db.collection("posts").find({}).toArray((err, posts) => {
      res.render(__dirname + `/public/main/index.pug`, {
        menu: ['home', 'contact', 'about'],
        posts: posts,
      });
      // res.send('hello')
      db.close();
    });
  });
}