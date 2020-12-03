<template>
  <div>
    <h1>Creation Page</h1>
    <div class="builder">
      <div class="races">
        <div class="heading">
          <div class="circle"/>
          <h2>Races</h2>
          </div>
          <div v-for="race in races" :key="race._id">
            <ul>
              <li @click="selectRace(race)">{{race.race}}</li>
            </ul>
        </div>
      </div>
      <div class="appearance">
        <img v-if="selectedRace" :src="selectedRace.path" alt="Your character will appear here">
        <input type="text" placeholder="Enter your character's name">
        <input v-if="selectedRace" v-model="selectedRace.race">
        <input v-else placeholder="Select a race from the left">
        <input v-if="selectedClass" v-model="selectedClass.class">
        <input v-else placeholder="Select a class from the right">
      </div>
      <div class="classes">
        <div class="heading">
          <div class="circle"/>
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
        selectedClass: null,
        selectedRace: null,
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
          console.log(error);
        }
      },
      async getRaces() {
        try {
          let response = await axios.get("/api/races");
          this.races = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      selectClass(_class) {
        console.log(_class.class);
        this.selectedClass = _class;
      },
      selectRace(race) {
        console.log(race.race + " " + race.path);
        this.selectedRace = race;
      },
    }
  }
</script>

<style scoped>
  /* .creator {
    border: 2px solid black;
  } */

  .builder {
    border: 2px solid black;
    display: flex;
    flex-direction: row;
    height: 700px;
  }

  .races {
    border: 2px solid pink;
    width: 20%;
  }

  .appearance {
    border: 2px solid green;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .appearance img {
    width: 350px;
    height: 450px;
  }

  .classes {
    border: 2px solid yellow;
    width: 20%;
  }

  .heading {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .heading h2 {
    margin-top: 8px;
    margin-left: 10px;
  }

  input {
    text-align: center;
    width: 340px;
    height: 25px;
  }

  .circle {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 8px;
    background: #333;
    color: #fff;
    text-align: center
  }
</style>
