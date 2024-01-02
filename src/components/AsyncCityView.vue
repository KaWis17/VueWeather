<template>
    <div class="flex flex-col flex-1 items-center">
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2"> {{ route.params.city }}</h1>
            <h2 class="text-2xl mb-10"> {{ route.params.state }}</h2>
           
            <div class="text-center">
                <p class="shrink-0 text-8xl"> {{ Math.round(weatherData.main.temp) }}°C</p>
                <p class="text-xl mb-4">Feels like {{ Math.round(weatherData.main.feels_like) }}°C</p>
                <div class="flex flex-row items-center mb-8">
                    <img class="object-cover" v-bind:src="imageSRC" alt="Weather icon">
                    <p>{{ weatherData.weather[0].main }}: {{ weatherData.weather[0].description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';

    const route = useRoute();
    const getWeatherData = async () => {
        try {
            const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=e6f8792222cd1a6f36a2933ed040979d&units=metric`);
            return weatherData.data;
        } catch(err) {
            console.log(err)
        }
    }

    const weatherData = await getWeatherData();
    const imageSRC = ref("http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png");
    console.log(weatherData);
</script>