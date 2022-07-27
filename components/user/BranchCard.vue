<template>
   <NuxtLink :to="prepareUrl(`/branches/${branch.slug}`)" class="place-card-link d-flex flex-wrap justify-content-between">
      <div class="place-card-img flex-shrink-0">
            <img v-if="branch.main_media" :src="branch.main_media.url" alt=""/>
            <img v-if="branch.preview" :src="branch.preview" alt=""/>
            <img v-else :src="require('@/assets/img/no-photo.jpg')" alt=""/>
      </div>
      <div class="place-card-body d-flex flex-column justify-content-between flex-grow-1">
         <div>
            <span class="title-quaternary place-card-title">{{ branch.name.en }}</span>
         <!--         <span class="place-card-price">{{ branch.price }}</span>-->
            <span class="place-card-address d-flex">
               <svg-icon class="sm-icon" name="location"/>
               <span>{{ branch.address }}</span>
            </span>
            <span v-if="branch.min_price" class="d-flex">
               <span>{{ $t('map.minPrice') }}</span>
               <span>: {{ branch.min_price }}</span>
            </span>
            <span class="d-flex">
               <span>{{ $t('map.cardPay') }}</span>
               <span>: {{ branch.card_payment ? $t('map.Yes') : $t('map.No')}}</span>
            </span>
            <span class="d-flex">
               <span>{{ $t('map.openToday') }}</span>
               <span>: {{ branch.open_today == 1 ? $t('map.Yes') : $t('map.No')}}</span>
            </span>
            <span class="d-flex mb-2">
               <span>{{ $t('map.24') }}</span>
               <span>: {{ branch.open_day_night ? $t('map.Yes') : $t('map.No')}}</span>
            </span>
         </div>
          <b-row class="rating-stars">
              <b-col md="6">{{ branch.avg_rating }}
                  <svg-icon  class="sm-icon star-full" name="star-solid"
                            v-for="starFull in  Math.round(this.branch.avg_rating)" :key="starFull.key"/>
                  <svg-icon class="sm-icon star" name="star-regular" :key="star.key" v-for="star in 5 -  Math.round(this.branch.avg_rating)"
                  />
              </b-col>
              <b-col md="6" class="text-right">
                  <NuxtLink :to="prepareUrl(`/branches/${branch.slug}`)" class="btn-primary rounded px-3 py-1">{{ $t('map.BookNow') }}</NuxtLink>
              </b-col>
         </b-row>
      </div>
   </NuxtLink>
</template>

<script>
import global from "~/mixins/global.js"

export default {
   name: "BranchCard",
   props: ['branch'],
   mixins: [global],
   data(){
        return {}
   },
}
</script>

<style scoped>

</style>