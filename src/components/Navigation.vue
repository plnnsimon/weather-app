<template>
    <div>
        <header v-if="addCityActive" class="container">
            <nav>
                <span>
                    Add City
                </span>
                <div class="right">
                    <i @click="addCity" class="far fa-plus-square"></i>
                    <i @click="reloadApp" class="fas fa-sync-alt"></i>
                </div>
            </nav>
        </header>
        <header v-else class="container" :class="{day: isDay, night: isNight}">
            <nav>
                <router-link class="router-link" :to="{name: 'AddCity'}">
                    <i class="fas fa-angle-left"></i>
                </router-link>
                <span>
                    {{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
                    {{ new Date().toLocaleString("en-us", { month: "short" }) }}
                    {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}
                </span>
                <span>&deg; C</span>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    name: "Navigation",
    props: ['addCityActive', 'isDay', 'isNight'],
    methods: {
        addCity() {
            this.$emit('add-city')
        },
        reloadApp() {
            location.reload()
        }
    }
}
</script>

<style scoped>
header {
    display: flex;
}
span {
    font-weight: 700;
}

.day {
    transition: 0.5s ease all;
    background: rgb(0, 217, 255);
}

.night {
    transition: 0.5s ease all;
    background: rgb(26, 30, 66);
}
header nav {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    padding: 15px 0;
}

.right i {
    margin-left: 15px;
    cursor: pointer;
}

.router-link i {
    color: white;
    font-size: 20px;
}
</style>