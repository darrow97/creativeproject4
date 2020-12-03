<template>
  <div>
    <h1>Administrative Page</h1>
    <div class="box">
      <!-- CLASS AND RACE CONTENT MANAGEMENT -->
      <div class="manage">
        <!-- ADD A CLASS -->
        <div class="addClasses">
          <div class="heading">
            <div class="circle"></div>
            <h2>Add a Class</h2>
          </div>
          <div class="form">
            <input v-model="className" placeholder="Enter a class type to add">
            <button @click="uploadClass">Upload</button>
          </div>
        </div>
        <!-- REMOVE A CLASS -->
        <div class="removeContent">
          <div class="heading">
            <div class="circle"></div>
            <h2>Remove a Class</h2>
          </div>
          <input v-if="removeClass" v-model="removeClass.class" placeholder="Remove class">
          <input v-else placeholder="Select a class from the list">
          <button @click="deleteClass(removeClass)">Remove</button>
        </div>
        <!-- ADD A RACE -->
       <div class="addRaces">
         <div class="heading">
           <div class="circle"></div>
           <h2>Add a Race</h2>
         </div>
         <div class="form">
           <input type="file" name="photo" @change="fileChanged">
           <input v-model="raceName" placeholder="Enter a race type to add">
           <button @click="uploadRace">Upload</button>
           <div class="upload">
             <div v-if="addRace">
               <h2>{{addRace.race}}</h2>
               <img :src="addRace.path" />
             <!-- <p>{{addRace.description}}</p> -->
           </div>
           </div>
         </div>
       </div>
       <!-- REMOVE A RACE -->
       <div class="removeContent">
         <div class="heading">
           <div class="circle"></div>
           <h2>Remove a Race</h2>
         </div>
         <br>
         <input v-if="removeRace" v-model="removeRace.race" placeholder="Remove race">
         <input v-else placeholder="Select a race from the list">
         <!-- <div class="suggestions" v-if="suggestions.length > 0">
           <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRace(s)">{{s.race}}
           </div>
         </div> -->
         <button @click="deleteRace(removeRace)">Remove</button>
         <div class="upload">
          <div v-if="removeRace">
           <h2>{{removeRace.race}}</h2>
           <img :src="removeRace.path" />
           <!-- <p>{{addRace.description}}</p> -->
         </div>
         </div>

       </div>
      </div>
       <!-- LIST OF RACES AND CLASSES -->
       <div class="list">
         <div class="classes">
           <div class="heading">
             <div class="circle"></div>
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
             <div class="circle"></div>
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
       </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Admin',
    // components: {
    //   admin
    // },
    data() {
      return {
        className: "",
        raceName: "",
        file: null,
        addRace: null,
        removeClass: null,
        removeRace: null,
        findRaceName: "",
        findClassName: "",
        findRace: null,
        findClass: null,
        classes: [],
        races: [],
        // items: [],
        // findTitle: "",
        // findItem: null,
      }
    },
    // computed: {
    //   suggestions() {
    //     // let races = this.races.filter(race => race.raceName.toLowerCase().startsWith(this.findRaceName.toLowerCase()));
    //     // return races.sort((a, b) => a.race > b.race);
    //   }
    // },
    created() {
      this.getClasses();
      this.getRaces();
    },
    methods: {
      fileChanged(event) {
          this.file = event.target.files[0]
      },
      selectRace(race) {
        console.log("Selected " + race.race);
        this.findRaceName = "";
        this.removeRace = race;
      },
      selectClass(_class) {
        console.log("Select " + _class.class);
        this.findClassName = "";
        this.removeClass = _class;
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
          console.log(e);
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
            // description: this.description
          });
          this.addRace = r2.data;
          this.raceName = "";
          this.getRaces();
        } catch (error) {
          console.log(error);
        }
      },
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
      async deleteClass(_class)
      {
        console.log(_class);
        try {
          await axios.delete("/api/classes/" + _class._id);
          this.removeClass = null;
          this.getClasses();
          return true;
        } catch (e) {
          console.log(e);
        }
      },
      async deleteRace(race) {
        try {
          await axios.delete("/api/races/" + race._id);
          this.removeRace = null;
          this.getRaces();
          return true;
        } catch (e) {
          console.log(e);
        }
      }
      // selectItem(item) {
      //   this.findTitle = "";
      //   this.findItem = item;
      // },
      // async deleteItem(item) {
      //   try {
      //     await axios.delete("/api/items/" + item._id);
      //     this.findItem = null;
      //     this.getItems();
      //     return true;
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
      // async editItem(item) {
      //   try {
      //     await axios.put("/api/items/" + item._id, {
      //       title: this.findItem.title,
      //       description: this.findItem.description
      //     });
      //     this.findItem = null;
      //     this.getItems();
      //     return true;
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    }
  }
</script>


<style scoped>
  .box {
    display: flex;
    border: 2px solid black;
    /* flex-flow: row; */
  }

  .manage {
    border: 2px solid pink;
    width: 50%;
    display: flex;
    flex-wrap: wrap;
  }

  .addClasses {
    border: 2px solid orange;
    width: 49%; /*change to 40 for production*/
  }

  .addRaces {
    border: 2px solid red;
    width: 49%;
  }

  /* Uploaded images */
  .upload {
    border: 2px solid green;
    width: 300px;
    height: 400px;
    justify-content: center;
  }

  .upload img {
    max-width: 300px;
  }

  .removeContent {
    border: 2px solid blue;
    width: 50%;
  }

  .edit {
    display: flex;
  }

  .list {
    /* float: left; */
    display: flex;
    border: 2px solid green;
    width: 50%;
    /* margin-right: 0; */
    /* flex-flow: row; */
  }

  ul {
    list-style-type: none;
  }

  li {
    display: block;
  }

  .classes {
    border: 2px solid orange;
    width: 50%;
    /* float: left;
    clear: left; */
  }

  .races {
    border: 2px solid red;
    width: 50%;
    /* float: left; */
  }

  /* .image h2 {
    font-style: italic;
    font-size: 1em;
  } */

  .heading {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .heading h2 {
    margin-top: 8px;
    margin-left: 10px;
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



  /* Form */
  input,
  textarea,
  select,
  button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }

  .form {
    margin-right: 50px;
  }



  /* Suggestions */
  .suggestions {
    width: 200px;
    border: 1px solid #ccc;
  }

  .suggestion {
    min-height: 20px;
  }

  .suggestion:hover {
    background-color: #5BDEFF;
    color: #fff;
  }
</style>
