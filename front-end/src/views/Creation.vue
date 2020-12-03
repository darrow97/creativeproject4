<template>
  <div>
    <h1>Creation Page</h1>
    <div class="builder">
      <div class="races">
        <div class="heading">
          <h2>Races</h2>
          </div>
          <div v-for="race in races" :key="race._id">
            <ul>
              <li @click="selectRace(race)">{{race.race}}</li>
            </ul>
        </div>
      </div>
      <div class="appearance">
        <div v-if="buildMessage.length > 0">
          {{this.buildMessage}}
        </div>
        <!-- IMAGE -->
        <img v-if="selectedRace" :src="selectedRace.path" alt="Your character will appear here">
        <div v-else class="imageSpace"/>
        <!-- NAME -->
        <input v-model="characterName" placeholder="Enter your character's name">
        <!-- RACE -->
        <input v-if="selectedRace" v-model="selectedRace.race" readonly>
        <input v-else placeholder="Select a race from the left" readonly>
        <!-- CLASS -->
        <input v-if="selectedClass" v-model="selectedClass.class" readonly>
        <input v-else placeholder="Select a class from the right" readonly>
        <div v-if="isCharacterReady">
          <button  @click="createCharacter">Create the character!</button>
        </div>
        <!-- <button v-else >Build your character</button> -->
      </div>
      <div class="classes">
        <div class="heading">
          <h2>Classes</h2>
        </div>
        <div v-for="_class in classes" :key="_class._id">
          <ul>
            <li @click="selectClass(_class)">{{_class.class}}</li>
          </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Creation',
    data() {
      return {
        races: [],
        classes: [],
        path: "",
        characterName: "",
        buildMessage: "",
        selectedClass: null,
        selectedRace: null,
        createdCharacter: null,
        raceSelected: false,
        classSelected: false,
        isCharacterReady: false
      }
    },
    created() {
      this.getClasses();
      this.getRaces();
    },
    methods: {
      async getClasses() {
        try {
          let response = await axios.get("/api/classes");
          this.classes = response.data;
          // console.log(this.classes);
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
      selectClass(_class) {
        // console.log(_class.class);
        this.selectedClass = _class;
        this.classSelected = true;
        this.characterReady();
      },
      selectRace(race) {
        // console.log(race.race + " " + race.path);
        this.selectedRace = race;
        this.raceSelected = true;
        this.characterReady();
      },
      characterReady() {
        if(this.selectedRace && this.selectedClass) this.isCharacterReady = true;
        else this.isCharacterReady = false;
        this.$forceUpdate();
      },
      async createCharacter() {
        // console.log(this.characterName);
        try {
          let character = await axios.post('/api/characters', {

            race: this.selectedRace.race,
            name: this.characterName,
            class: this.selectedClass.class,
            path: this.selectedRace.path
          });

          // console.log(character);

          this.addCharacter = character.data;
          this.buildMessage = "Last character created was " + this.characterName;
          this.characterName = "";
          this.selectedRace = null;
          this.selectedClass = null;
          this.isCharacterReady = false;
          this.$forceUpdate();

          // console.log("Created!");
        } catch (e) {
          // console.log(e);
        }

      }
    }
  }
</script>

<style scoped>
  /* .creator {
    border: 2px solid black;
  } */
  h1 {
    background: #AF6B58;
    text-align: center;
    border: 3px solid black;
  }



  .builder {
    border: 3px solid black;
    display: flex;
    flex-direction: row;
    height: 700px;
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

  .races {
    width: 20%;
    background-color: #CBBCB1;
    border-right: 1px solid black;
    text-decoration: none;
  }

  .appearance {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F2EFEA;

  }

  .appearance input {
    margin: 10px;
  }

  .appearance img {
    width: 350px;
    height: 450px;
    /* object-fit: contain; */
    object-fit: scale-down;
  }

  .imageSpace {
    width: 350px;
    height:450px;
  }

  .classes {
    width: 20%;
    background-color: #CBBCB1;
    border-left: 1px solid black;
  }

  .heading {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 4%;
    margin-right: 4%;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background: white;
    opacity: .8;
    font-weight: bolder;
    justify-content: center;
  }

  .heading h2 {
    margin: 5px;
  }

  input {
    text-align: center;
    width: 340px;
    height: 25px;
  }
</style>
