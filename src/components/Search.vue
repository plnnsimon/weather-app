<template>
  <div @click="closeSearch" class="search" ref="search">
      <div class="search-wrap" ref="searchWrap">
          <label for="city-name">Enter Location: </label>
          <input type="text" name="city-name" placeholder="search city" v-model="cityInput">
          <button @click="addCity">Add</button>
      </div>
  </div>
</template>

<script>
import axios from "axios"
import db from "../firebase/firebase"

export default {
    name: "Search",
    props: ['APIkey', 'cities'],
    data () {
        return {
            cityInput: ''
        }
    },
    methods: {
        closeSearch(e) {
            if (e.target === this.$refs.search) this.$emit('close-modal')
            
        },
        async addCity() {
            function isContains (arr, el) {
                if (arr != null && arr.length > 0) {
                    for(let i = 0; i < arr.length; i++) {
                        if (arr[i].city === el) {
                            return true
                        }
                    }
                }
            }

            if (this.cityInput === "") {
                alert("Field cannot be empty")
            } else if (isContains(this.cities, this.cityInput)) {
                alert("City already added")
            } else {
                try {
                    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput}&units=imperial&APPID=${this.APIkey}`);
                    this.cities.forEach(el => console.log(el.city === this.cityInput))
                    const data = await res.data;
                    console.log(data);
                        db.collection('cities')
                        .doc()
                        .set({
                            city: this.cityInput,
                            currentWeather: data
                        })
                        .then(() => {
                        this.$emit('close-modal')
                        });
                    
                    this.cityInput = ''
                } catch {
                    alert(`${this.cityInput} does not exist. Please try again or try to write currect city name...`)
                }
                
            }
            
        }
    },
}
</script>

<style scoped>
.search {
    position: fixed;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.search label {
    color: #fff;
    margin-bottom: 15px;
}

.search-wrap {
    max-width: 500px;
    display: flex;
    width: 100%;
    border-radius: 10px;
    flex-direction: column;
    padding: 20px;
    background: rgb(51, 51, 51);
}

.search-wrap input {
    color: white;
    border: none;
    background: transparent;
    padding: 6px 4px;
    width: 100%;
    outline: none;
    border-bottom: 1px solid rgb(0, 0, 0);
}

.search-wrap button {
    width: 50px;
    margin-top: 20px;
    background: darkgrey;
    border: none;
    border-radius: 10px;
    padding: 5px 0;
    cursor: pointer;
}
.search-wrap button:hover {
    background: rgb(255, 255, 255);
    
}


</style>