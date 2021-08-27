<template>
  <div class="city">
      <div class="weather-top">
        <span>{{ this.city.city }}</span>
        <i @click="removeCity" class="far fa-trash-alt" ref="remove"></i>
      </div>
      <div class="weather">
          <span>{{ ((Math.round(this.city.currentWeather.main.temp) - 32) * 5/9).toFixed(0) }}&deg;</span>
          <img :src="require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)" alt="">
      </div>
      <div class="video">
          <video autoplay loop muted :src="require(`../../public/video/${this.city.currentWeather.weather[0].icon}.mp4`)"></video>
      </div>
      <div class="overlay" @click="getInfo" ref="getInfo"></div>
  </div>
</template>

<script>
import db from "../firebase/firebase"


export default {
    name: "city",
    props: ["city", 'remove'],
    created() {},
    data() {
        return {
            id: null,
        }
    },
    methods: {
        removeCity(e) {
            if (e.target === this.$refs.remove) {
                this.getInfo = !this.getInfo
                db.collection('cities')
                    .where('city', '==', `${this.city.city}`)
                    .get()
                    .then(docs => {
                        docs.forEach(doc => {
                            this.id = doc.id;
                        })
                    })
                    .then(() => {
                        db.collection('cities').doc(this.id).delete()
                    })
            }
        },
        getInfo(e) {
            if (e.target === this.$refs.getInfo) {
                this.$router.push({
                    name: 'Weather',
                    params: {
                        city: this.city.city
                    }
                })
            }
        }
    }
}

</script>

<style scoped>
.city {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    justify-content: space-between;
    cursor: pointer;
}
.city:hover::before {
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(196, 196, 196, 0.255);
    position: absolute;
    z-index: 1  ;
    top: 0;
}

.city span {
    padding: 10px;
    z-index: 3;
} 

.weather-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.weather-top span {
    color: #fff;
    font-size: 20px;
}
.weather-top i {
    z-index: 3;
    padding: 10px;
    cursor: pointer;
    opacity: 0.3;
    
    transition: all ease .5s;
}
.weather-top i:hover {
    opacity: 1;
}

.weather {
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.weather span {
    font-size: 30px;
    color: white;
}

.weather img {
    width: 50px;
    margin: 15px;
}

.video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.048);
}

.video video {
    max-width: 540px;
}

.overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.294);
}
</style>