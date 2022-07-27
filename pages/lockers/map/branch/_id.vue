<template>
    <div v-if="loading" class="map-page-content map-single-page">
        <div class="map-sidebar">
            <div class="place-view" >
                <div class="banner d-flex align-items-end card-overlay" :style="{ backgroundImage: 'url('+require(`~/assets/img/map-place-bg.jpg`)+')' }">
                    <div class="page-text-overlay">
                        <b-container>
                            <b-row>
                                <b-col>
                                    <h1 v-if="branch.name" class="title-primary">{{ branch.name.en }}</h1>
                                    <p class="place-price">0.92 EUR</p>
                                    <div class="place-rating d-flex align-items-center mb-1">
                                        <span class="rating-review">0/5</span>
                                        <span v-if="branch.business" class="rating-stars d-flex">
                                            <svg-icon v-for="i of branch.business.rating" v-bind:key="i" class="base-icon" name="star-solid" />
                                            <svg-icon v-for="i of 5 - branch.business.rating" :key="i" class="base-icon" name="star-regular" />
                                        </span>
                                        <span class="rating-text">{{$t('reviews.noReviews')}}</span>
                                    </div>
                                    <p class="place-address d-flex align-items-center mb-2">
                                        <svg-icon class="sm-icon" name="location" />
                                        <span>{{branch.address}}</span>
                                    </p>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                </div>
                <div class="go-back-square">
                    <GoBack/>
                </div>
            </div>
            <div class="tabs-content place-tabs">
                <b-tabs justified class="flex-nowrap">

                    <b-tab class="home-tab" active>
                        <template #title>
                            <svg-icon class="md-icon" name="home" />
                        </template>
                        <div class="place-tab-content scroll-box">
                            <div v-html="branch.description.en"></div>
                            <p class="title-line bg-white"><span>Prices</span></p>
                            <ul class="prices-list">
                                <li v-if="branch.lockers" class="d-flex align-items-center justify-content-between" v-for="(item,index) in branch.lockers">
                                    <svg-icon class="base-icon" name="briefcase" />
                                    <p class="d-flex flex-column ml-3">
                                        <span>{{item.prices[index].range_start + ' - ' + item.prices[index].range_end + ' hours '}}</span>
                                        <span>{{item.size.width + "x" + item.size.height + "x" + item.size.length + " (mm)" }}</span>
                                    </p>
                                    <p class="price-value ml-auto">{{item.prices[0].price + branch.business.currency}}</p>
                                </li>
                            </ul>

                            <p class="title-line bg-white"><span>Social media links</span></p>
                            <ul class="social d-flex flex-wrap align-items-center justify-content-center mb-4">
                                <li class="social-item">
                                    <a href="https://www.facebook.com/LuggageStorageNetwork" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                        <svg-icon class="base-icon" name="facebook" />
                                    </a>
                                </li>
                                <li class="social-item">
                                    <a href="https://twitter.com/intent/tweet?text=Crazy%20Hostel%20https%3A//luglockers.com/en/lockers/468/" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                        <svg-icon class="base-icon" name="twitter" />
                                    </a>
                                </li>
                                <li class="social-item">
                                    <a href="https://www.instagram.com/luglockers/" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                        <svg-icon class="base-icon" name="linkedin" />
                                    </a>
                                </li>
                                <li class="social-item">
                                    <a href="mailto:?subject=Crazy%20Hostel&body=Crazy%20Hostel%20https%3A//luglockers.com/en/lockers/468/" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                        <svg-icon class="base-icon" name="at-sign" />
                                    </a>
                                </li>
                                <li class="social-item">
                                    <a href="https://wa.me/?text=https%3A//luglockers.com/en/lockers/468/" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                        <svg-icon class="base-icon" name="whatsapp" />
                                    </a>
                                </li>
                                <li class="social-item">
                                    <a href="https://t.me/share/url?text=Crazy%20Hostel&url=https%3A//luglockers.com/en/lockers/468/" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                        <svg-icon class="base-icon" name="telegram" />
                                    </a>
                                </li>
                            </ul>

                        <NuxtLink :to="'/branches/' + branch.id" class="btn btn-grey w-100">Open the luggage storage page</NuxtLink>
                        </div>
                    </b-tab>

                    <b-tab id="place-gallery" class="gallery-tab">
                        <template #title>
                            <svg-icon class="md-icon" name="image" />
                        </template>
                        <div class="place-tab-content scroll-box">
                            <template>
                                <div id="app">
                                    <CoolLightBox
                                        :items="items"
                                        :index="index"
                                        :effect="'fade'"
                                        @close="index = null">
                                    </CoolLightBox>

                                    <div class="images-wrapper gallery-lightbox">
                                        <div
                                            class="image gallery-img"
                                            v-for="(image, imageIndex) in branch.media"
                                            :key="imageIndex"
                                            @click="index = imageIndex">
                                            <img :src="image.url">
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </b-tab>

                    <b-tab class="reviews-tab">
                        <template #title>
                            <svg-icon class="md-icon" name="comment" />
                        </template>
                        <div class="place-tab-content scroll-box">
                            <div class="rating-stars text-center mb-3">
                                <svg-icon v-for="i of 4" v-bind:key="i" class="base-icon" name="star-solid" />
                                <svg-icon class="base-icon" name="star-regular" />
                            </div>
                            <div class="average-rating mb-4 d-flex justify-content-between align-items-center">
                                <p class="rate-of-average">0 out of 5</p>
                                <p class="reviews-total"><span class="mr-1">0</span><span>{{$t('reviews.title')}}</span></p>
                            </div>
                            <div class="rating-bars">
                                <div class="rating-bar d-flex align-items-center">
                                    <div class="rating-label text-truncate">5 star</div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 20%;">
                                        </div>
                                    </div>
                                    <div class="rating-percentage">20%</div>
                                </div>
                                <div class="rating-bar d-flex align-items-center">
                                    <div class="rating-label text-truncate">4 star</div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 20%;">
                                        </div>
                                    </div>
                                    <div class="rating-percentage">20%</div>
                                </div>
                                <div class="rating-bar d-flex align-items-center">
                                    <div class="rating-label text-truncate">3 star</div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 20%;">
                                        </div>
                                    </div>
                                    <div class="rating-percentage">20%</div>
                                </div>
                            </div>
                            <section class="reviews-section py-3 py-lg-5">
                                <h5 class="title-fifth">{{$t('reviews.title')}}</h5>
                                <b-row>
                                    <b-col v-for="(reviewCard, index) in reviewCards" v-bind:key="index">
                                        <div class="lockers-reviews">
                                            <div class="review">
                                                <p class="review-text mb-3">{{reviewCard.text}}</p>
                                                <div class="review-user d-flex align-items-center">
                                                    <div class="review-img">
                                                        <img :src="require('@/assets/img/' + reviewCard.imgSrc)" alt="" />
                                                    </div>
                                                    <div class="user-info">
                                                        <p class="review-name mb-0">{{reviewCard.name}}</p>
                                                        <p class="review-country mb-0">{{reviewCard.country}}</p>
                                                    </div>
                                                    <div class="rating-stars d-flex ml-auto">
                                                        <svg-icon class="sm-icon" name="star-solid" v-for="starFull in reviewCard.stars" v-bind:key="starFull.index" />
                                                        <svg-icon class="sm-icon" name="star-regular" v-for="star in 5 - reviewCard.stars" v-bind:key="star.index" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </section>
                        </div>
                    </b-tab>
                </b-tabs>
            </div>
        </div>

        <div class="map-content h-100">
           <GmapMap
              :center="{lat: Number(branch.lat), lng: Number(branch.lng)}"
              :zoom="11"
              map-type-id="terrain"
              style="width: 100%; height: 850px"
              @bounds_changed="updateCenter"
           >

              <GmapMarker
                 :position="{lat: Number(branch.lat), lng: Number(branch.lng)}"
                 :clickable="true"
                 :draggable="true"
              >
                 <gmap-info-window>
                    {{branch.name.en}}
                 </gmap-info-window>
              </GmapMarker>

           </GmapMap>
        </div>
    </div>
</template>

<script>

import GoBack from '@/components/go-back';
import Map from '@/components/home/map.vue'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import axios from "axios"


export default {
    layout: 'map-layout',

    components: {
        CoolLightBox,
        GoBack,
        Map
    },

    data() {
        return {
        index: null,
        branch: {},
        loading: false,
        galleryCards: [
            {
                imgSrc: "lockers/01.jpeg",
            },
            {
                imgSrc: "lockers/02.jpeg",
            },
            {
                imgSrc: "lockers/03.jpeg",
            },
            {
                imgSrc: "lockers/01.jpeg",
            },
            {
                imgSrc: "lockers/02.jpeg",
            },
            {
                imgSrc: "lockers/03.jpeg",
            },
            {
                imgSrc: "lockers/01.jpeg",
            },
            {
                imgSrc: "lockers/02.jpeg",
            },
            {
                imgSrc: "lockers/03.jpeg",
            },
                {
                imgSrc: "lockers/01.jpeg",
            },
            {
                imgSrc: "lockers/02.jpeg",
            },
            {
                imgSrc: "lockers/03.jpeg",
            },
            {
                imgSrc: "lockers/01.jpeg",
            },
        ],

        items: [
            'http://localhost:3000/_nuxt/assets/img/lockers/01.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/02.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/03.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/01.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/02.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/03.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/01.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/02.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/03.jpeg',
            'http://localhost:3000/_nuxt/assets/img/lockers/03.jpeg',
       ],

        reviewCards: [
            {
                imgSrc: "blog/01.jpg",
                name: "John Aran",
                country: "Georgia",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, reiciendis? Perferendis rerum officia illo, recusandae impedit totam quis ad eos.",
                stars: 4
            },
            {
                imgSrc: "blog/01.jpg",
                name: "John Aran",
                country: "Georgia",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, reiciendis? Perferendis rerum officia illo, recusandae impedit totam quis ad eos.",
                stars: 4
            },
            {
                imgSrc: "blog/01.jpg",
                name: "John Aran",
                country: "Georgia",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, reiciendis? Perferendis rerum officia illo, recusandae impedit totam quis ad eos.",
                stars: 4
            },
        ],

       }
    },
   created() {
       this.$axios.get(`branches/${this.$route.params.id}`).then((res) => {
          this.branch = res.data.branch;
          console.log(this.branch)
          this.loading = true;
       })
   },
   computed: {
       branch() {
          return this.branch
       }
   }

}
</script> 