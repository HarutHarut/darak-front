<template>
   <div>
      <VideoBanner/>
      <Works/>
      <Guaranty/>
      <Destination :cities="topCities"/>
      <RecommendedStorages :branches="recommendedStorages"/>
      <Blog :blogs="topBlogs"/>
   </div>
</template>
<script>
import Blog from '../components/home/blog.vue';
import Works from '../components/home/how-works.vue';
import Guaranty from '../components/home/guaranty.vue';
import VideoBanner from '../components/home/video-banner.vue';
import Destination from '../components/home/top-destinations.vue';
import RecommendedStorages from '../components/home/recommended-storages.vue';
import moment from "moment";

export default {
   layout: 'guest',
   components: {
      VideoBanner,
      Works,
      Guaranty,
      Destination,
      RecommendedStorages,
      Blog,
   },
   async asyncData({store}) {
      await store.dispatch('home/getBlogs');
      await store.dispatch('home/getCities');
      await store.dispatch('home/getBranches');
   },
   mounted() {
      let url = window.location.href;
      if (url.includes('#login')){
         this.$bvModal.show("modal-sign")
      }
   },
   computed: {
      topCities() {
         return this.$store.getters['home/cities'];
      },
      topBlogs ()  {
         return this.$store.getters['home/blogs'];
      },
      recommendedStorages ()  {
         return this.$store.getters['home/branches'];
      },
   }
}

</script>