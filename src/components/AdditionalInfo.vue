<template>
  <div class="additional-info container">
    <div>
      <span>Sunrise</span>
      <span>{{ new Date(this.currentWeather.sys.sunrise * 1000).toLocaleString('en-us', {timeStyle: 'short'}) }}</span>
      <i class="far fa-sun"></i>
    </div>
    <div>
      <span>Sunset</span>
      <span>{{ new Date(this.currentWeather.sys.sunset * 1000).toLocaleString('en-us', {timeStyle: 'short'}) }}</span>
      <i class="fas fa-cloud-moon"></i>
    </div>
    <div>
      <span>Humidity</span>
      <span>{{ this.currentWeather.main.humidity }}%</span>
      <i class="fas fa-tint"></i>
    </div>
    <div>
      <span>Cloudness</span>
      <span>{{ this.currentWeather.clouds.all }}%</span>
      <i class="fas fa-cloud"></i>
    </div>
    <div>
      <span>Wind</span>
      <span>{{ Math.round(this.currentWeather.wind.speed) }} m/h</span>
      <i class="fas fa-wind"></i>
    </div>
    <div>
      <span>Pressure</span>
      <span>{{ this.currentWeather.main.pressure }} hPa</span>
      <i class="fas fa-sort-amount-down-alt"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalInfo',
  props: ['currentWeather']
}
</script>

<style scoped>
.additional-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  color: white;
}
.additional-info div {
  display: flex;
  flex-direction: row;
  max-width: 250px;
  width: 100%;
  font-size: 24px;
  justify-content: space-between;
  margin: 0 20px 60px 0;
}
.additional-info div i {
  font-size: 36px;
}
</style>