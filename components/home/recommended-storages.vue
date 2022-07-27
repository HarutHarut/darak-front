<template>
   <section v-if="branches.length" class="recommended-storages py-4 py-lg-5">
      <b-container>
         <h2 class="title-secondary text-center">{{ $t("title.recommendedStorages") }}</h2>
         <b-row>
            <b-col md="6" lg="4" v-for="(branch, index) in branches" v-bind:key="index">
               <div class="storage-card">
                  <NuxtLink :to="prepareUrl(`/branches/${branch.slug}`)" class="storage-card-box card-overlay">
                     <img v-if="branch.preview" :src="branch.preview" alt=""/>
                     <img v-else :src="require('@/assets/img/no-photo.jpg')" alt=""/>

                     <span class="storage-card-description">
                         <span class="title-tertiary d-block">{{ branch.name | getTransValue($i18n.locale)}}</span>
                         <span class="place-address d-flex align-items-center">
                             <svg-icon class="sm-icon" name="location"/>
                             <span>{{ branch.address }}</span>
                         </span>
                         <span class="place-price d-block">{{ branch.price }}</span>
                         <span class="place-rating d-flex align-items-center">
                                 <span class="rating-review">{{
                                    branch.avg_rating
                                 }}</span>
                                 <span class="rating-stars d-flex">
                                    <svg-icon
                                            class="sm-icon"
                                            name="star-solid"
                                            v-for="starFull in Math.round(branch.avg_rating)"
                                            v-bind:key="starFull.index"
                                    />
                                    <svg-icon
                                            class="sm-icon"
                                            name="star-regular"
                                            v-for="star in 5 -
                                       Math.round(branch.avg_rating)"
                                            v-bind:key="star.index"
                                    />
                                 </span>
                              </span>
                     </span>

                     <span class="card-location-text d-flex align-items-center">
                         <span class="text-uppercase">{{ branch.city.name }}</span>
                     </span>

                     <span class="type-box">
                         <span class="type-box-inner">
                            <span class="type-box-body type-box-front">
                                 <svg-icon class="md-icon" name="location-find"/>
                            </span>
                            <span class="type-box-body type-box-back"></span>
                         </span>
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
   props:['branches'],
   mixins: [global],
   filters: {
      getTransValue(val,lang) {
         return val[lang]
      }
   }
}
</script> 