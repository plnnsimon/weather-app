<template>
  <div class="hourly-temp">
      <span>{{ new Date(this.time.dt * 1000).toLocaleString('en-us', {hour: 'numeric'}) }}</span>
      <span>
        <img :src="require(`../../public/conditions/${this.time.weather[0].icon}.svg`)" alt="">
      </span>
      <span>{{ ((Math.round(this.time.temp) - 32) * 5/9).toFixed(0) }} &deg;</span>
  </div>
</template>

<script>
export default {
    name: "HourlyTemp",
    props: ['time']
}
</script>

<style scoped>

.hourly-temp {
  margin: 0 40px 20px 0;
  display: flex;
  flex-direction: column;
  color: white;
}

.hourly-temp span {
  margin: 5px 0;
}

.hourly-temp img {
  width: 50px;
  max-height: 40px;
}
</style>