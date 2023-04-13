<template>
    <div class="lockers">
        <div v-if="city.preview"
             class="banner d-flex align-items-end card-overlay"
             :style="{ backgroundImage: `url(${city.preview})` }"
        >
        </div>
        <div v-else
             class="banner d-flex align-items-end card-overlay"
             style="background-color: #ccc">
        </div>
        <b-container>
            <b-row>
                <b-col>
                    <div class="go-back-text mt-4">
                        <GoBack/>
                    </div>
                </b-col>
                <b-col class="mt-4">
                  <NuxtLink :to="prepareUrl('/lockers/map?q=' + city.name + '&lng=' + city.lng + '&lot=' + city.lat)"
                              class="city-card-link d-flex justify-content-end">
                        <span class="go-map-btn btn btn-blue btn-lg px-5">Go to map</span>
                  </NuxtLink>
                </b-col>
            </b-row>
            <div class="page-content-section py-4 py-lg-5">
                <b-row>
                    <b-col lg="8">
                        <div class="place-info mb-5">
                           <h1 class="title-primary">
                                {{ city.name }}
                            </h1>
                            <b-col v-if="this.city.description[$i18n.locale] !== null && this.city.description[$i18n.locale] !== 'null'"
                                   v-html="this.city.description[$i18n.locale]" />
                            <b-col v-else v-html="this.city.description.en" />
                        </div>
                    </b-col>
                </b-row>
            </div>
        </b-container>


        <section
                v-if="branches.length"
                class="recommended-storages py-3 py-lg-5"
        >

            <b-container>
                <h2 class="title-secondary text-center">
                    {{ $t("dashboard.list.branchs") }}
                </h2>

                <b-row>
                    <b-col
                            md="6"
                            lg="4"
                            v-for="item in branches"
                            v-bind:key="item.id"
                    >
<!--                         {{ item.name }}-->
                        <div class="storage-card">
                            <NuxtLink
                                    :to="prepareUrl(`/branches/${item.slug}`)"
                                    class="storage-card-box card-overlay"
                            >
                                <img :src="item.preview" class="logo-img" alt=""/>
                                <span class="storage-card-description">


                                    <span v-if="item.name[$i18n.locale] !== null">
                                        {{ item.name[$i18n.locale] }}
                                    </span>
                                    <span v-else>
                                        {{ item.name['en'] }}
                                    </span>
                                   <span class="place-address d-flex align-items-center">
                                      <svg-icon class="sm-icon" name="location"/>
                                      <span>{{ item.address }}</span>
                                   </span>


                           <span class="place-rating d-flex align-items-center">
                              <span class="rating-review">{{
                                 item.avg_rating
                              }}</span>
                              <span class="rating-stars d-flex">
                                 <svg-icon
                                         class="sm-icon"
                                         name="star-solid"
                                         v-for="starFull in Math.round(
                                       item.avg_rating
                                    )"
                                         v-bind:key="starFull.index"
                                 />
                                 <svg-icon
                                         class="sm-icon"
                                         name="star-regular"
                                         v-for="star in 5 -
                                    Math.round(item.avg_rating)"
                                         v-bind:key="star.index"
                                 />
                              </span>
                               <!-- <span class="rating-text">{{
                            ratingText
                         }}</span> -->
                           </span>
                        </span>

                                <span
                                        class="card-location-text d-flex align-items-center"
                                >
                           <p class="text-uppercase">
                              {{ city.name }}
                           </p>
                        </span>

                                <span class="type-box">
                           <span class="type-box-inner">
                              <span class="type-box-body type-box-front">
                                 <svg-icon
                                         class="md-icon"
                                         name="location-find"
                                 />
                              </span>
                              <span class="type-box-body type-box-back"></span>
                           </span>
                        </span>
                            </NuxtLink>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <b-container>
            <div class="page-content-section py-4 py-lg-5">
            <b-row>
                <b-col lg="8">
                    <div class="place-info mb-5">
                        <p class="title-tertiary font-weight-bold mt-5" v-if="(this.city.about_city[$i18n.locale] || this.city.about_city.en)">
                            {{ $t('dashboard.fields.about_city') }}
                        </p>


                        <b-container class="container-big">
                            <b-row>
                                <b-col v-if="this.city.about_city[$i18n.locale] !== null && this.city.about_city[$i18n.locale] !== 'null'"
                                       v-html="this.city.about_city[$i18n.locale]" />
                                <b-col v-else v-html="this.city.about_city.en" />
                            </b-row>
                        </b-container>
                    </div>
                </b-col>
            </b-row>
        </div>
        </b-container>


        <Seo
                :meta_title="$t('meta.cityTitle', { city: city.name })"
                :meta_keywords="$t('meta.cityKeywords', { city: city.name })"
                :meta_description="$t('meta.cityDescription', { city: city.name })"
                :og_image="city.logo ? city.logo : this.$config.cdnUrl + '/img/logo.jpg'"
                :twitter_image="city.logo ? city.logo : this.$config.cdnUrl + '/img/logo.jpg'"
        >
        </Seo>

    </div>
</template>

<script>

    import global from "~/mixins/global.js"
    import Seo from "../../../components/seo/index.vue"
    import OpeningHoursCard from "../../../components/buisness/branch/opening-hours-card";
    import CoolLightBox from "vue-cool-lightbox";

    export default {
        components: {
            Seo,
        },
        data() {
            return {
                city: {},
                branches: {},
            }
        },
        mixins: [global],

        async asyncData({$axios, route, redirect}) {
            const {data} = await $axios.get(`cities/city/${route.params.slug}`)


            try{
                return {
                    city: data.city,
                    branches: data.branches
                }

            }catch (e) {
                redirect(301, '/404')
            }
        },

        filters: {
            getTransValue(val, lang) {
                return val[lang]
            },
        },

        methods: {

        },

        mounted() {
        }
    }

</script>