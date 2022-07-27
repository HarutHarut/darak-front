<template>
  <div>
    <Banner v-if="data"  :title="title" :image="image"></Banner>

    <section class="who-are-we-section static-content py-4 py-lg-5">
      <b-container class="container-big">
        <b-row v-if="data">
          <b-col v-html="getTransValue(data.description, $i18n.locale)" />
        </b-row>
      </b-container>
    </section>
    <Seo v-if="data"
         :meta_title="data.meta_title"
         :meta_keywords="data.meta_description"
         :meta_description="data.meta_description"
         :og_image="'/_nuxt/assets/img/logo/logo-black-text.png'"
         :twitter_image="'/_nuxt/assets/img/logo/logo-black-text.png'"
    >
    </Seo>
  </div>
</template>

<script>

import Banner from '../components/banner.vue'
import Seo from '../components/seo/index.vue'

export default {
  components: {
    Banner,
    Seo
  },
  
  data () {
      return {
        title: null,
        image: 'who-are-we-bg.jpeg',
        data: null
      }
    },
  mounted() {
    this.$axios.get('/static-page?name=privacy-policy-for-business').then((res) => {
      this.data = res.data
      console.log(this.data)
      this.title = this.getTransValue(this.data.title,this.$i18n.locale )
    })
  },
  methods: {
    getTransValue(val, lang) {
      return val[lang]
    }
  }
}

</script>