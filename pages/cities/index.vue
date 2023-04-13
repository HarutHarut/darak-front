<template>
  <div>
    <Banner :title="title" :image="image"></Banner>
    <section class="cities-section  py-4 py-lg-5">
      <b-container class="container-big">
        <b-row>
          <b-col md="10" class="mx-auto mb-4">
            <h2 class="text-center">{{ $t("title.findCities.title") }}</h2>
            <p class="text-center">{{ $t("title.findCities.subtitle") }}</p>
          </b-col>
          <b-col cols="10" md="8" class="mx-auto">
            <div class="mb-5">
                <div class="form-book d-flex align-items-center">
                  <div class="form-group mb-0 w-100">
                    <input v-model="searchKey" type="text"
                           class="form-input border p-2 w-100"
                           :placeholder="$t ('form.input.searchCity')"
                           @keyup="searchCity"
                    >
                  </div>
                </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="city-cards mb-3" v-for="(items, index) in filteredCities" v-bind:key="index">
          <b-col sm="10">
            <h4 class="title-quaternary pl-3">{{ index }}</h4>
          </b-col>
          <b-col sm="6" md="4" lg="3" class="city-card-item" v-for="(city, index) in items" v-bind:key="index">
            <NuxtLink :to="prepareUrl(`/cities/${city.slug}`)"
                      class="city-card-link d-flex">
              <span class="city-card-img mr-3">
                <img :src="city.logo" alt=""/>
              </span>
              <span class="city-card-body">
                <span class="city-card-title city-card-title d-block">{{ city.name }}</span>
              </span>
            </NuxtLink>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6" lg="3" class="mx-auto" v-if="isEmpty(filteredCities)">
            <div>
              <img :src="require('@/assets/img/no-result.png')" class=" img-fluid" alt=""/>
              <p class="text-center no-result">No result found !</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <Seo
         :meta_title="$t('meta.allCityTitle')"
         :meta_keywords="$t('meta.allCityKeywords')"
         :meta_description="$t('meta.allCityDescription')"
         :og_image="this.$config.cdnUrl + '/img/logo.jpg'"
         :twitter_image="this.$config.cdnUrl + '/img/logo.jpg'"
    >
    </Seo>
  </div>
</template>

<script>

import Banner from '../../components/banner.vue'
import Seo from '../../components/seo/index.vue'
import _ from 'lodash'
import global from "~/mixins/global.js"

export default {
  mixins: [global],
  components: {
    Seo,
    Banner
  },
  data() {
    return {
      searchKey: '',
      title: this.$t('list.cities'),
      image: 'cities-bg.jpeg',
      cities: null,
      filteredCities: []
    }
  },
  async asyncData({$axios}) {

    const response = await $axios.get('/cities')

    return {
      cities: response.data.cities,
      filteredCities: _.groupBy(response.data.cities, el => el.name[0])
    }
  },
  methods: {
    searchCity(e) {
      const searched = this.cities.filter(item => item.name.toLowerCase().search(this.searchKey.toLowerCase()) > -1);
      this.filteredCities = _.groupBy(searched, el => el.name[0]);
    },
    isEmpty(obj) {
      return _.isEmpty(obj)
    }
  }

}

</script>
