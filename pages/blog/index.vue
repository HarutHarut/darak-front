<template>
   <div>
      <Banner :title="title" :image="image"></Banner>

      <section class="blog-page-section py-4 py-lg-5">
         <b-container>
            <b-row>
               <b-col>
                  <h2 class="title-secondary">{{ $t("list.blog") }}</h2>
               </b-col>
            </b-row>
            <b-row class="justify-content-lg-start justify-content-center">
               <b-col
                  md="10"
                  class="mb-4"
                  v-for="(blog, index) in blogs.data"
                  v-bind:key="index"
               >
                  <NuxtLink
                     :to="prepareUrl(`/blog/${blog.slug}`)"
                     class="blog-card d-flex flex-lg-row flex-column"
                  >
                     <span class="blog-card-img">
                        <img :src="blog.logo" alt="" />
                     </span>
                     <span
                        class="blog-about d-flex flex-column justify-content-between"
                     >
                        <span
                           class="blog-info d-flex flex-wrap justify-content-between align-items-center mb-2 order-3"
                        >
                           <span class="blog-author d-flex align-items-center">
                           </span>
                           <span
                              class="blog-date mb-2 d-flex align-items-center"
                           >
                              <svg-icon class="sm-icon" name="calendar" />
                              <span>{{
                                 blog.created_at | changeDataFormat
                              }}</span>
                           </span>
                        </span>
                        <span href="#" class="title-tertiary">{{
                           blog.title | getTransValue($i18n.locale)
                        }}</span>
                        <span class="blog-description three-line-text" v-html="getTransValue(blog.desc, $i18n.locale)"/>
<!--                        <span class="blog-description three-line-text" v-html="blog.desc + $i18n.locale"/>-->
                     </span>
                  </NuxtLink>
               </b-col>
            </b-row>
         </b-container>
      </section>
      <Seo
           :meta_title="$t('meta.blogTitle')"
           :meta_keywords="$t('meta.blogKeywords')"
           :meta_description="$t('meta.blogDescription')"
           :og_image="image ? image : this.$config.cdnUrl + '/img/logo.jpg'"
           :twitter_image="image ? image : this.$config.cdnUrl + '/img/logo.jpg'"
      >
      </Seo>
   </div>
</template>

<script>
import Banner from "../../components/banner.vue"
import Seo from '../../components/seo/index.vue'
import moment from "moment"
import global from "~/mixins/global.js"

export default {
   mixins: [global],
   components: {
      Banner,
      Seo
   },

   data() {
      return {
         title: this.$t("list.blog"),
         image: "blog-page-banner.jpg",
         blogs: null
      }
   },
   async asyncData({ $axios }) {
      const { data } = await $axios.get("/blogs")

      return {
         blogs: data.blogs
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
