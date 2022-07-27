<template>
   <div>
      <Banner :title="title" :image="image"></Banner>
      <section class="blog-single-page py-4 py-lg-5">
         <b-container>
            <div class="go-back-text mb-4">
               <GoBack />
            </div>
            <b-row>
               <b-col class="clearfix">
                  <div class="blog-img-box float-left mb-2 mr-3">
                     <img :src="blog.logo" alt="" />
                  </div>
                  <div class="blog-info">
                     <h2 class="title-secondary">{{ blog.title | getTransValue($i18n.locale)}}</h2>
                     <p class="blog-date mb-2">{{blog.created_at | changeDataFormat}}</p>
                     <p class="blog-description" v-html="getTransValue(blog.desc, $i18n.locale)"/>
                  </div>
               </b-col>
            </b-row>
         </b-container>
      </section>
   </div>
</template>

<script>
import Banner from "../../components/banner.vue"
import GoBack from "../../components/go-back.vue"
import moment from "moment";

export default {
   components: {
      Banner,
      GoBack
   },

   data() {
      return {
         title: this.$t("list.blog"),
         image: "blog-page-banner.jpg",
         blog: {
            title:{},
            desc:{},
         }
      }
   },
   async asyncData({ $axios, route }) {
      console.log(route.params)
      const { data } = await $axios.get(`/blogs/${route.params.slug}`)

      return {
         blog: data.blog
      }
   },
   methods: {
      getTransValue(val, lang) {
         return val[lang]
      }
   },
   filters: {
      changeDataFormat(val) {
         const date = moment(val).format("DD/MM/YYYY")
         return date.toString()
      },

      getTransValue(val, lang) {
         return val[lang]
      }
   }
}
</script>
