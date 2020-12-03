<template>
  <div>
    <h1>Administrative Page</h1>
    <div class="box">
      <!-- CLASS AND RACE CONTENT MANAGEMENT -->
      <div class="superManage">
        <div class="heading">
          <h2>Database Management</h2>
        </div>
        <div class="manage">
          <!-- <div class="heading">
            <h2>Database Management</h2>
          </div> -->
          <div class="adding">
            <!-- ADD A CLASS -->
            <div class="addClasses">
              <div class="heading">
                <!-- <div class="circle"></div> -->
                <h2>Add a Class</h2>
              </div>
              <div class="form">
                <input v-model="className" placeholder="Enter a class type to add">
                <button @click="uploadClass">Upload</button>
              </div>
            </div>
            <!-- ADD A RACE -->
            <div class="addRaces">
              <div class="heading">
                <!-- <div class="circle"></div> -->
                <h2>Add a Race</h2>
              </div>
              <div class="form">
                <input type="file" name="photo" @change="fileChanged">
                <input v-model="raceName" placeholder="Enter a race type to add">
                <button @click="uploadRace">Upload</button>
                <div class="upload">
                  <div v-if="addRace">
                    <!-- <h2>{{addRace.race}}</h2> -->
                    <img :src="addRace.path" />
                    <!-- <p>{{addRace.description}}</p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- REMOVAL -->
          <div class="removing">
            <!-- REMOVE A CLASS -->
            <div class="removeContent">
              <div class="heading">
                <!-- <div class="circle"></div> -->
                <h2>Remove a Class</h2>
              </div>
              <div class="form">
                <input v-if="removeClass" v-model="removeClass.class" placeholder="Remove class" readonly>
                <input v-else placeholder="Select a class from the list" readonly>
                <button @click="deleteClass(removeClass)">Remove</button>
              </div>
            </div>
            <!-- REMOVE A RACE -->
            <div class="removeContent">
              <div class="heading">
                <!-- <div class="circle"></div> -->
                <h2>Remove a Race</h2>
              </div>
              <br>
              <div class="form">
                <input v-if="removeRace" v-model="removeRace.race" placeholder="Remove race" readonly>
                <input v-else placeholder="Select a race from the list" readonly>
                <button @click="deleteRace(removeRace)">Remove</button>
              </div>
            </div>
            <!-- REMOVE A CHARACTER -->
            <div class="removeContent">
              <div class="heading">
                <!-- <div class="circle"></div> -->
                <h2>Remove a Character</h2>
              </div>
              <br>
              <div class="form">
                <input v-if="removeCharacter" v-model="removeCharacter.name" placeholder="Remove characer" readonly>
                <input v-else placeholder="Select a character from the list" readonly>
                <button @click="deleteCharacter(removeCharacter)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LIST OF RACES AND CLASSES -->
      <div class="superList">
        <div class="heading">
          <h2>Database Content</h2>
        </div>
        <div class="list">
          <div class="classes">
            <div class="heading">
              <h2>Classes</h2>
            </div>
            <div>
              <div v-for="_class in classes" :key="_class._id">
                <ul>
                  <li @click="selectClass(_class)">{{_class.class}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="races">
            <div class="heading">
              <h2>Races</h2>
            </div>
            <div>
              <div v-for="race in races" :key="race._id">
                <ul>
                  <li @click="selectRace(race)">{{race.race}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="characters">
            <div class="heading">
              <h2>Characters</h2>
            </div>
            <div>
              <div v-for="character in characters" :key="character._id">
                <ul>
                  <li @click="selectCharacter(character)">{{character.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Admin',
    data() {
      return {
        className: "",
        raceName: "",
        file: null,
        file2: null,
        fileChosen: false,
        addRace: null,
        removeClass: null,
        removeRace: null,
        removeCharacter: null,
        findRaceName: "",
        findClassName: "",
        findRace: null,
        findClass: null,
        classes: [],
        races: [],
        characters: []
      }
    },
    created() {
      this.getClasses();
      this.getRaces();
      this.getCharacters();
    },
    methods: {
      fileChanged(event) {
          this.file = event.target.files[0]
          this.$forceUpdate();
      },
      selectRace(race) {
        // console.log("Selected " + race.race);
        this.findRaceName = "";
        this.removeRace = race;
      },
      selectClass(_class) {
        // console.log("Select " + _class.class);
        this.findClassName = "";
        this.removeClass = _class;
      },
      selectCharacter(character) {
        // console.log("Select " + character.name);
        this.findCharacterName = "";
        this.removeCharacter = character;
      },
      async uploadClass() {
        try {
          let c1 = await axios.post('/api/classes', {
            class: this.className
          });
          this.addClass = c1.data;
          this.className = "";
          this.getClasses();
        } catch (e) {
          // console.log(e);
        }
      },
      async uploadRace() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/races', {
            race: this.raceName,
            path: r1.data.path,
          });
          this.addRace = r2.data;
          this.raceName = "";
          this.getRaces();
        } catch (error) {
          // console.log(error);
        }
      },
      async getClasses() {
        try {
          let response = await axios.get("/api/classes");
          this.classes = response.data;
          return true;
        } catch (error) {
          // console.log(error);
        }
      },
      async getRaces() {
        try {
          let response = await axios.get("/api/races");
          this.races = response.data;
          return true;
        } catch (error) {
          // console.log(error);
        }
      },
      async getCharacters() {
        try {
          let response = await axios.get("/api/characters");
          this.characters = response.data;
          return true;
        } catch (error) {
          // console.log(error);
        }
      },
      async deleteClass(_class)
      {
        // console.log(_class);
        try {
          await axios.delete("/api/classes/" + _class._id);
          this.removeClass = null;
          this.getClasses();
          return true;
        } catch (e) {
          // console.log(e);
        }
      },
      async deleteRace(race) {
        try {
          await axios.delete("/api/races/" + race._id);
          this.removeRace = null;
          this.getRaces();
          return true;
        } catch (e) {
          // console.log(e);
        }
      },
      async deleteCharacter(character) {
        try {
          await axios.delete("/api/characters/" + character._id);
          this.removeCharcter = null;
          this.getCharacters();
          return true;
        } catch (e) {
          // console.log(e);
        }
      },
    }
  }
</script>


<style scoped>
  h1 {
    border: 3px solid black;
    background: #AF6B58;
    text-align: center;
  }

  .box {
    display: flex;
    border: 3px solid black;
    margin-bottom: 25px;
    background: #CBBCB1;
    font-weight: bold;
  }

  .superManage {
    width: 50%;
    display: flex;
    flex-direction: column;
    border-right: 3px solid black;
  }

  .manage {
    /* border: 2px solid pink; */
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .adding {
    display: flex;
    flex-direction: column;
    width: 49%;
    align-content: center;
    justify-content: center;
  }

  .addClasses {
    width: 100%;
    margin-bottom: 30px;
  }

  .addRaces {
    width: 100%;
  }

  /* Uploaded images */
  .upload {
    width: 300px;
    height: 440px;
    justify-content: center;
    text-align: center;
  }

  .upload img {
    object-fit: scale-down;
    height: 400px;
    width: 300px;
  }

  .removing {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 50%;
    align-content: center;
    border-left: 2px solid black;
  }

  .removeContent {
    width: 100%;
    margin-bottom: 30px;
  }

  .superList {
    display: flex;
    flex-direction: column;
    width: 50%;
    /* align-items: center; */
  }

  .list {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  ul {
    list-style-type: none;
    font-weight: bold;
    margin-left: 4%;
    margin-right: 4%;
  }

  li {
    width: 100%;
    margin-left: -8%;
    text-align: center;
  }

  .classes {
    width: 33%;
    border-right: 2px solid black;
  }

  .races {
    width: 33%;
    border-right: 2px solid black;
  }

  .characters {
    width: 33%;
  }

  .heading {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 4%;
    margin-right: 4%;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background: #F2EFEA;
    opacity: .8;
    font-weight: bolder;
    justify-content: center;
  }

  .heading h2 {
    margin: 5px;
  }

  /* Form */
  input,
  button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  input {
    margin-right: 2px;
  }

  button {
    margin-left: 2px;
  }

  .form {
    margin-left: 13%;
    margin-right: 13%;
    opacity: .9;
  }
</style>
