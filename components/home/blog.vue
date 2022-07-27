<template>
   <section v-if="blogs.length" class="blog-section py-4 py-lg-5">
      <b-container>
         <h2 class="title-secondary text-center">{{ $t("title.blog") }}</h2>
         <b-row>
            <b-col xl="3" lg="4" md="6" class="mb-4 mb-md-5" v-for="(blog, index) in blogs" v-bind:key="index">
               <NuxtLink :to="prepareUrl(`/blog/${blog.slug}`)" class="blog-card">
                  <span class="blog-card-img" style="width: 100%">
                       <img :src="blog.logo" alt=""/>
                  </span>
                  <span class="blog-about d-flex flex-column">
                     <span class="blog-info d-flex flex-wrap justify-content-end align-items-center mb-2">
                         <span class="blog-date d-flex align-items-center">
                             <svg-icon class="sm-icon" name="calendar"/>
                             <span>{{ blog.created_at | changeDataFormat }}</span>
                         </span>
                     </span>
                     <span class="title-tertiary">{{ blog.title | getTransValue($i18n.locale)}}</span>
                     <span class="blog-description three-line-text" v-html="getTransValue(blog.desc, $i18n.locale)"/>
                  </span>
               </NuxtLink>
            </b-col>
         </b-row>
      </b-container>
   </section>
</template>

<script>
import moment from "moment";
import global from "~/mixins/global.js"

export default {
   props:['blogs'],
   mixins: [global],
   data(){
        return {}
   },
    methods:{
        getTransValue(val, lang) {
            return val[lang]
        }
    },
   filters: {
      changeDataFormat(val) {
         const date = moment(val).format("DD/MM/YYYY");
         return date.toString();
      },
      getTransValue(val, lang) {
         return val[lang]
      }
   },
}

</script> 