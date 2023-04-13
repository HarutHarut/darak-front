<template>
   <div>
      <VideoBanner/>
      <Works/>
      <Guaranty/>
      <Destination :cities="topCities"/>
      <RecommendedStorages :branches="recommendedStorages"/>
      <Blog :blogs="topBlogs"/>
      <Seo
              :meta_title="$t('home.subTitle')"
              :meta_keywords="''"
              :meta_description="$t('meta.homeMetaDescription')"
              :og_image="this.$config.cdnUrl + '/img/logo.jpg'"
              :twitter_image="this.$config.cdnUrl + '/img/logo.jpg'"
      >
      </Seo>
   </div>
</template>
<script>
import Seo from '../components/seo/index.vue'
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
      Seo
   },
   async asyncData({store}) {
      await store.dispatch('home/getBlogs');
      await store.dispatch('home/getCities');
      await store.dispatch('home/getBranches');
   },
   mounted() {
      let url = window.location.href;
      this.seoImage = window.location.host+"/_nuxt/assets/img/logo/logo-white-text.png";
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