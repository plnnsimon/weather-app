<template>
  <div class="hourly-weather">
      <div class="container">
          <div class="hourly-temp" v-for="(time, index) in filteredList" :key="index">
              <HourlyTemp :time="time" />
          </div>
      </div>
  </div>
</template>

<script>
import HourlyTemp from "../components/HourlyTemp"

export default {
    name: "HourlyWeather",
    props: ['forecast'],
    components: {
        HourlyTemp
    },
    created() {
        console.log(this.forecast);
    },
    computed: {
        filteredList() {
            return this.forecast.hourly.slice(0, 23)
        }
    }
}
</script>

<style scoped>
.hourly-weather {
    margin: 20px 0;
    border-bottom: 1px solid white;
}

*::-webkit-scrollbar {
    background-color: rgb(255, 255, 255);
    outline: none;
    border-radius: 20px;
    -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.678); 
}
*::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    border-radius: 10px;
}
 
*::-webkit-scrollbar-thumb {
    border-radius: 20px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    background: rgb(0, 225, 255);
}

.container {
    display: flex;
    overflow: auto;
    margin-bottom: 20px;
}
</style>