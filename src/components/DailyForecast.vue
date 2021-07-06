<template>
  <div class="daily-forecast">
      <div>
          <span>{{ new Date(this.day.dt * 1000).toLocaleString('en-us', {weekday: 'long'}) }}</span>
      </div>
      <div class="temp">
          <span class="high">{{((Math.round(this.day.temp.max) - 32) * 5/9).toFixed(0)}} &deg;</span>
          <span class="low">{{((Math.round(this.day.temp.min) - 32) * 5/9).toFixed(0)}} &deg;</span>
      </div>
      <div class="condition">
          <img :src="require(`../../public/conditions/${this.day.weather[0].icon}.svg`)" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name: "DailyForecast",
    props: ['day']
}
</script>

<style scoped>
.condition img {
    max-width: 50px;
}

.daily-forecast {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
}
.daily-forecast div:nth-child(1) {
    width: 120px;
    font-size: 24px;
}

.low {
    opacity: .6;
}

.temp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70px;
}
</style>