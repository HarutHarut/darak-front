<template>
  <div>
    <Banner :title="title" :image="image"></Banner>

    <section class="how-works-section static-content py-4 py-lg-5">
      <b-container>
        <b-row v-if="data">
          <b-col v-html="data['description_' + $i18n.locale]" />
        </b-row>
      </b-container>
    </section>
    <Seo v-if="data"
         :meta_title="data.meta_title ? data.meta_title : ''"
         :meta_keywords="data.meta_keywords ? data.meta_keywords : ''"
         :meta_description="data.meta_description ? data.meta_description : ''"
         :og_image="this.$config.cdnUrl + '/img/logo.jpg'"
         :twitter_image="this.$config.cdnUrl + '/img/logo.jpg'"
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
        data: null,
        title: null,
        image: 'how-works.jpeg'
      }
    },
  mounted() {
    this.$axios.get('/static-page?name=how-works').then((res) => {
      this.data = res.data
      this.title = this.getTransValue(this.data.title,this.$i18n.locale)
    })
  },
  methods: {
    getTransValue(val, lang) {
      return val[lang]
    }
  }
}

</script>