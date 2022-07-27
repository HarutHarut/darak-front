<template>
  <div>
    <Banner v-if="data" :title="title" :image="image"></Banner>
    <section class="who-are-we-section static-content py-4 py-lg-5">
      <b-container class="container-big">
        <b-row>
          <b-col v-if="data" v-html="getTransValue(data.description, $i18n.locale)" />
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>

import Banner from '../components/banner.vue'

export default {
  components: {
    Banner
  },
  data () {
      return {
        title: null,
        image: 'who-are-we-bg.jpeg',
        data: ''
      }
    },
  mounted() {
    this.$axios.get('/static-page?name=term-and-conditions').then((res) => {
      this.data = res.data
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