<template>
  <div
    class="main"
  >
    <div v-if="isLoading" class="loading">
      <img src="../public/conditions/loading-buffering.gif" alt="" />
    </div>
    <div v-else class="app">
      <Navigation
        class="navigation"
        v-on:add-city="toggleSearch"
        :addCityActive="addCityActive"
        :isDay="isDay"
        :isNight="isNight"
      />
      <Search
        v-if="searchOpen"
        v-on:close-modal="toggleSearch"
        :APIkey="APIkey"
        :cities="cities"
      />
      <router-view
        :cities="cities"
        :APIkey="APIkey"
        v-on:is-day="dayTime"
        v-on:is-night="nightTime"
        v-on:resetDays="resetDays"
        :isDay="isDay"
        :isNight="isNight"
        v-on:add-city="toggleSearch"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebase";
import Navigation from "./components/Navigation";
import Search from "./components/Search";

export default {
  name: "App",
  components: {
    Navigation,
    Search,
  },
  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: "45d2aef3355821480f6a6944bfe761ca",
      cities: [],
      searchOpen: null,
      addCityActive: null,
      isLoading: true,
    };
  },
  created() {
    this.getCityWeather();
    this.checkRoute();
  },
  mounted() {
    this.dayTime();
    this.nightTime();
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");

      firebaseDB.onSnapshot((snap) => {
        if (snap.docs.length === 0) {
          this.isLoading = false;
        }
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=imperial&APPID=${this.APIkey}`
              );

              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                  this.isLoading = false;
                });
            } catch (err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city !== doc.doc.data().city
            );
          }
        });
      });
    },
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
    },
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style>
.loading {
  margin: auto;
}
.loading img {
  width: 100px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(182deg, #0b1f2e, #2a2a2a6b);
}

.app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
}

.navigation {
  background: rgb(124 124 124 / 42%);
  color: azure;
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.container {
  padding: 0 30px;
}
</style>
