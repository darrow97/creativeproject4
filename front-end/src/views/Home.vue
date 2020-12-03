<template>
  <div>
    <h1>Characters</h1>
    <div class="home">
      <section class="image-gallery">
        <div class="characterSlot" v-for="character in characters" :key="character.id">
          <img :src="character.path"/>
          <div class="name">
            <h2>{{character.name}}</h2>
            <h5>NAME</h5>
          </div>
          <div class="race">
            <h4>{{character.race}}</h4>
            <h5>RACE</h5>
          </div>
          <div class="class">
            <h4>{{character.class}}</h4>
            <h5>CLASS</h5>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     characters: [],
    }
  },
  created() {
   this.getCharacters();
  },
  methods: {
    async getCharacters() {
      try {
        let response = await axios.get("/api/characters");
        this.characters = response.data;
        return true;
      } catch (error) {
        // console.log(error);
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

  .home {
    display: flex;
    margin-bottom: 50px;
  }

  .image-gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .characterSlot {
    border: 3px solid black;
    display: flex;
    flex-direction: column;
    height: 550px;
    width: 400px;
    align-items: center;
    justify-content: center;
    margin: 10px;
    background-color: #CBBCB1;
    background-blend-mode: hue;
  }

  .characterSlot img {
    width: 350px;
    height: 400px;
    object-fit: scale-down;
  }

  h2, h3, h4, h5 {
    margin: 0;
    text-align: center;
  }

  h2, h4 {
    border-bottom: 1px solid black;
  }

  h5 {
    font-size: 11px;
  }

  .name {
    /* border: 2px solid green; */
    margin: 3px;
    width: 80%;
  }

  .race {
    /* border: 2px solid pink; */
    margin: 3px;
    width: 60%;
  }

  .class {
    /* border: 2px solid blue; */
    margin: 3px;
    width: 60%;
  }

  /* Masonry on large screens */
  @media only screen and (min-width: 1024px) {
    .image-gallery {
      column-count: 4;
    }
  }

  /* Masonry on medium-sized screens */
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .image-gallery {
      column-count: 3;
    }
  }

  /* Masonry on small screens */
  @media only screen and (max-width: 767px) and (min-width: 540px) {
    .image-gallery {
      column-count: 2;
    }
  }
</style>
