<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text" 
        v-model="searchQuery"
        placeholder="Search for a city"
        @input="getSearchResults"
        class="py-2 px-1 w-full bg-transparent border-b placeholder-gray-500
        focus:border-black focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul 
        class="absolute  bg-color-primary shadow-lg text-white w-full py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults">

          <p v-if="searchError">Sorry, something went wrong. Please try again!</p>

          <p v-if="!searchError && mapboxSearchResults.length === 0">Sorry, no results match the query. Please try again!</p>

          <template v-else>
            <li 
              v-for="searchResult in mapboxSearchResults" 
              :key="searchResult.id"
              @click="previewCity(searchResult)"
              class="py-2 cursor-pointer">
              {{ searchResult.place_name }}
            </li>
          </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { RouterView, useRouter } from 'vue-router';
import CityView from './CityView.vue';

  const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";  
  const searchQuery = ref("");
  const queryTimeout = ref(null);
  const mapboxSearchResults = ref(null);
  const searchError = ref(null);

  const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
      if(searchQuery.value !== "") {
        try{
          const results = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
          );
          mapboxSearchResults.value = results.data.features;
        } catch {
          searchError.value = true;
        }
        return;
      }
      mapboxSearchResults.value = null
    }, 300);

  }

  const router = useRouter();
  const previewCity = (searchResult) => {
    const [city, state] = searchResult.place_name.split(',')
    router.push({
      name: "cityView",
      params: {
        city: city,
        state: state,
      },
      query: {
        lat: searchResult.geometry.coordinates[1],
        lng: searchResult.geometry.coordinates[0],
      },
    })
  };

</script>
