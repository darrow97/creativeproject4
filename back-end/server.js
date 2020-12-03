const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/fantasyCreation', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/', ///var/www/museum.nerdxlife.net/images/
  limits: {
    fileSize: 10000000
  }
});

const characterSchema = new mongoose.Schema({
  name: String,
  race: String,
  class: String,
  path: String,
});

const classSchema = new mongoose.Schema({
  class: String
});

const raceSchema = new mongoose.Schema({
  race: String,
  path: String
});

// Create a model for items in the museum.
const Character = mongoose.model('Character', characterSchema);
const Class = mongoose.model('Class', classSchema);
const Race = mongoose.model('Race', raceSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/characters', async (req, res) => {
  const character = new Character({
    name: req.body.title,
    race: req.body.race,
    class: req.body.class,
    path: req.body.path
    // description: req.body.description
  });
  try {
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/classes', async (req,res) => {
  const _class = new Class({
    class: req.body.class
  });
  try {
    await _class.save();
    res.send(_class);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post('/api/races', async (req,res) => {
  const _race = new Race({
    race: req.body.race,
    path: req.body.path
  });
  try {
    await _race.save();
    res.send(_race);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get('/api/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/classes', async (req,res) => {
  try {
    let classes = await Class.find();
    res.send(classes);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get('/api/races', async (req,res) => {
  try {
    let race = await Race.find();
    res.send(race);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.delete('/api/characters/:id', async (req,res) => {
  try {
    await Character.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.delete('/api/classes/:id', async (req,res) => {
  try {
    await Class.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.delete('/api/races/:id', async (req,res) => {
  try {
    await Race.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.put('/api/characters/:id', async (req,res) => {
  try {
    let character = await Character.findOne({
      _id : req.params.id
    });
    character.name = req.body.name;
    // item.description = req.body.description;
    character.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


app.listen(8080, () => console.log('Server listening on port 8080!'));
