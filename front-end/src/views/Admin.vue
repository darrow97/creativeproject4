<template>
  <div>
    <h1>Administrative Page</h1>
    <div class="heading">
      <div class="circle"></div>
      <h2>Add a Class</h2>
    </div>
    <!-- ADD A CLASS -->
    <div class="add">
      <div class="form">
        <input v-model="className" placeholder="Class">
        <p></p>
        <!-- <input type="file" name="photo" @change="fileChanged"> -->
        <!-- <button @click="upload">Upload</button> -->
        <!-- <textarea v-model="description" rows="8" cols="80"></textarea> -->
      </div>
      <!-- <div class="upload" v-if="addClass">
        <h2>{{addClass.class}}</h2>
        <img :src="addClass.path" />
        <p>{{addItem.description}}</p>
      </div> -->
    </div>
    <!-- ADD A RACE -->
    <div class="heading">
     <div class="circle"></div>
     <h2>Add a Race</h2>
     </div>
     <div class="add">
       <div class="form">
         <input v-model="raceName" placeholder="Race">
         <p></p>
         <input type="file" name="photo" @change="fileChanged">
         <button @click="upload">Upload</button>
         <div class="upload" v-if="addRace">
           <h2>{{addRace.race}}</h2>
           <img :src="addRace.path" />
           <!-- <p>{{addItem.description}}</p> -->
         </div>
         <!-- <div class="suggestions" v-if="suggestions.length > 0">
           <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
           </div>
         </div> -->
       </div>
       <!-- <div class="upload" v-if="findItem">
         <input v-model="findItem.title">
         <p></p>
         <img :src="findItem.path" />
       </div> -->
       <!-- <div class="actions" v-if="findItem">
         <button @click="deleteItem(findItem)">Delete</button>
         <button @click="editItem(findItem)">Edit</button>
         <textarea v-model="findItem.description" rows="8" cols="80"></textarea>
       </div> -->
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
        // description: "",
        file: null,
        addRace: null,
        classes: [],
        races: []
        // items: [],
        // findTitle: "",
        // findItem: null,
      }
    },
    // computed: {
    //   suggestions() {
    //     let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    //     return items.sort((a, b) => a.title > b.title);
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
      async upload() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/races', {
            race: this.race,
            path: r1.data.path,
            // description: this.description
          });
          this.addClass = r2.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getClasses() {
        try {
          let response = await axios.get("/api/classes");
          this.classes = response.data;
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
  .image h2 {
    font-style: italic;
    font-size: 1em;
  }

  .heading {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .heading h2 {
    margin-top: 8px;
    margin-left: 10px;
  }

  .add,
  .edit {
    display: flex;
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

  /* Uploaded images */
  .upload h2 {
    margin: 0px;
  }

  .upload img {
    max-width: 300px;
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
