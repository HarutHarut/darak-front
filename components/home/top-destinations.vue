<template>
   <section v-if="cities.length" class="destination-section py-4 py-lg-5">
      <b-container>
         <h2 class="title-secondary text-center">{{ $t("title.topCities") }}</h2>
         <b-row class="justify-content-center">
            <b-col md="6" lg="3" v-for="(city, index) in cities" v-bind:key="index" class="mb-4">
               <div class="destination-card mx-auto">
                  <NuxtLink :to="prepareUrl('/lockers/map?q=' + city.name + '&lng=' + city.lng + '&lot=' + city.lat)" class="destination-link">
                     <img :src="city.logo" alt=""/>
                     <span class="destination-description  p-3">
                                <span class="title-fifth d-block">{{ city.name }}</span>
                     </span>
                  </NuxtLink>
               </div>
            </b-col>
         </b-row>
      </b-container>
   </section>
</template>

<script>

import global from "~/mixins/global.js"

export default {
   props:['cities'],
   mixins: [global],
   data() {
      return {
         topDestinations: [
            {
               id: 1,
               imgSrc: "destination-card/01.jpg",
               title: "London",
               info: "92 luggage storage locations available"
            },
            {
               id: 2,
               imgSrc: "destination-card/02.jpg",
               title: "New York",
               info: "54 luggage storage locations available"
            },
            {
               id: 3,
               imgSrc: "destination-card/03.jpg",
               title: "Rome",
               info: "21 luggage storage locations available"
            },
            {
               id: 3,
               imgSrc: "destination-card/03.jpg",
               title: "Rome",
               info: "21 luggage storage locations available"
            }
         ]
      }
   }
}
</script> 