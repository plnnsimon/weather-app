<template>
  <div class="add-city-container">
    <div v-if="cities.length === 0" class="no-cities">
      <p>No cities added, try to add a new one...</p>
      <button @click="addCity">Add City</button>
    </div>
    <div class="flex">
      <div class="city-link" v-for="(city, index) in cities" :key="index">
        <City :city="city" />
      </div>
    </div>
  </div>
</template>

<script>
import City from "../components/City"

export default {
  name: 'AddCity',
  props: ['cities'],
  created() {
    // console.log(this.cities + " from AddCity");
  },
  methods: {
    addCity() {
        this.$emit("add-city")
    }
  },
  components: {
    City
  }
}
</script>

<style scoped>
.add-city-container {
  min-height: 100vh;
  max-width: 1024px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  color: white;
  align-items: center;
}
.no-cities {
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
.no-cities button {
  padding: 5px;
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0);
  cursor: pointer;
}
.no-cities button:active {
  padding: 3px;
}
.no-cities button:hover {
  background: rgb(129, 129, 129);
  transition: ease all .3s;
}
.no-cities p {
  font-size: 24px;
  margin-bottom: 20px;
}

.flex {
  display: flex;
  max-width: 1024px;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 60px;
  background: rgb(111 111 111);
}

.city-link {
  max-width: 300px;
  width: 100%;
  margin: 20px;
  height: 300px;
  background-color: darkgray;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  border-radius: 5px;
  overflow: hidden;
}
</style>