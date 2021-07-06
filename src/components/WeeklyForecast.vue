<template>
  <div class="weekly-forecast">
    <div class="container">
      <div class="daily" v-for="(day, index) in filteredList" :key="index">
        <DailyForecast :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyForecast from "./DailyForecast"

export default {
    name: "WeeklyForecast",
    props: ['forecast'],
    components: {
      DailyForecast
    },
    created() {
      console.log(this.forecast);
    },
    computed: {
      filteredList() {
        return this.forecast.daily.slice(1, 8)
      }
    }
}
</script>

<style scoped>
.weekly-forecast{
    margin: 30px 0;
    border-bottom: 1px solid white;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 500px;
  color: white;
}

.daily {
  margin-bottom: 20px;
}
</style>