<template>
  <div class="current-weather">
      <div class="container">
          <div class="container-info">
              <div class="weather-info">
                <span class="city">{{this.currentWeather.name}}</span>
                <span class="current-temp">{{((Math.round(this.currentWeather.main.temp) - 32) * 5/9).toFixed(0)}} &deg;</span>
            </div>
            <div class="high-low-temp">
                <div class="high">
                    <i class="fas fa-chevron-up"></i>
                    <span>{{ ((Math.round(this.currentWeather.main.temp_max) - 32) * 5/9).toFixed(0) }} &deg;</span>
                </div>
                <div class="low">
                    <i class="fas fa-chevron-down"></i>
                    <span>{{ ((Math.round(this.currentWeather.main.temp_min) - 32) * 5/9).toFixed(0) }} &deg;</span>
                </div>
            </div>
            <span class="condition">{{ this.currentWeather.weather[0].description }}</span>
            <span class="feels-like">Feels like: {{ ((Math.round(this.currentWeather.main.feels_like) - 32) * 5/9).toFixed(0) }} &deg;</span>
          </div>
          
          <div class="weather-icon">
              <i v-if="isDay" class="far fa-sun"></i>
              <i v-if="isNight"  class="far fa-moon"></i>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "CurrentWeather",
    props: ['isDay', 'isNight', 'currentWeather']
}
</script>

<style scoped>

.current-weather {
    margin-top: 80px;
    border-bottom: 1px solid white;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}

.container-info {
    display: flex;
    flex-direction: column;
}

.weather-info {
    display: flex;
    flex-direction: column;
    font-size: 64px;
    color: white;
}
.weather-info span {
    margin-bottom: 10px;
}

.weather-icon {
    font-size: 200px;
    display: flex;
    color: white;
    width: 300px;
    align-items: center;
    justify-content: center;
    background: #0000571c;
    border-radius: 50%;
}
.weather-icon i {
    margin: 0 50px;
}

.high-low-temp {
    display: flex;
    width: 100px;
    color: white;
    justify-content: space-between;
}

.condition {
    margin: 10px 0;
    color: white;
    text-transform: capitalize;
    font-size: 40px;
}

.feels-like {
    margin: 10px 0;
    font-size: 24px;
    color: white;
}

</style>