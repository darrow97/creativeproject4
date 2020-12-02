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

const resourceSchema = new mongoose.Schema({
  class: String,
  race: String,
  path: String
});

// Create a model for items in the museum.
const Character = mongoose.model('Character', characterSchema);
const Resource = mongoose.model('Resource', resourceSchema);

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

app.post('/api/resources', async (req,res) => {
  const resource = new Resource({
    class: req.body.class,
    race: req.body.race,
    path: req.body.path
  });
  try {
    await resource.save();
    res.send(resource);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('api/resources', async (req,res) => {
  try {
    let resources = await Resource.find();
    res.send(resources);
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
