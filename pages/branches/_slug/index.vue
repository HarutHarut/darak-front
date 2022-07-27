<template>
   <div class="lockers">
      <div
         class="banner d-flex align-items-end card-overlay"
         :style="{ backgroundImage: `url(${branch.logo})` }"
      >
         <div class="page-text-overlay">
            <b-container>
               <b-row>
                  <b-col>
                     <h1 class="title-primary">
                        {{ this.branch.name | getTransValue($i18n.locale) }}
                     </h1>
                     <p class="rating-text">{{ this.branch.address }}</p>
                     <p v-if="this.branch.min_price" class="place-price">
                        {{ this.branch.min_price }}
                        <!--                {{ this.branch.currency ? this.branch.currency.name : 'EUR' }}-->
                     </p>
                     <div class="place-rating d-flex align-items-center">
                        <span class="rating-review">{{
                           this.branch.avg_rating
                        }}</span>
                        <div class="rating-stars d-flex">
                           <svg-icon
                              class="sm-icon"
                              name="star-solid"
                              v-for="starFull in Math.round(
                                 this.branch.avg_rating
                              )"
                              v-bind:key="starFull.index"
                           />
                           <svg-icon
                              class="sm-icon"
                              name="star-regular"
                              v-for="star in 5 -
                              Math.round(this.branch.avg_rating)"
                              v-bind:key="star.index"
                           />
                        </div>
                        <span class="rating-text">{{
                           $t("reviews.noReviews")
                        }}</span>
                     </div>
                  </b-col>
               </b-row>
            </b-container>
         </div>
      </div>

      <b-container>
         <b-row>
            <b-col>
               <div class="go-back-text mt-4">
                  <GoBack />
               </div>
            </b-col>
         </b-row>
         <section>
            <div v-if="branch.is_bookable">
               <b-col
                  v-if="lockers.length == 0"
                  sm="10"
                  lg="4"
                  xl="4"
                  class="
                     text-center
                     mx-auto
                     float-right
                     mb-4
                     pt-5
                     price-calc-block
                     success-block
                     pb-5
                  "
               >
                  <h4 class="font-weight-bold">
                     {{ $t("form.dontHaveSize") }}
                  </h4>
               </b-col>

               <b-col
                  v-else-if="!isBookingSubmit"
                  sm="10"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto float-right mb-4 price-calc-block"
               >
                  <div class="search-form-book m-0">
                     <h4 class="title-quaternary mb-0 ml-3">
                        {{ $t("form.lockerAvailable") }}.
                     </h4>
<!--                     {{ dateRange.startTime }}-->

                     <form
                        action="#"
                        class="search-form form-select-box w-100 text-left"
                     >
                        <div class="datepicker-box mb-3 w-100">
                           <p class="label-datepicker">
                              {{ $t("form.dropoffDateAndTime") }}
                           </p>
                           <div class="d-flex mb-2">
                              <b-form-datepicker
                                 :format="'YYYY-MM-DD'"
                                 :min="today()"
                                 v-model="dateRange.startDate"
                                 @input="validateBookingTime('startDate')"
                                 class="w-100 mr-3"
                              />
                              <b-select
                                 @change="timeChange"
                                 v-model="dateRange.startTime"
                                 class="datetimepicker"
                              >
                                 <b-select-option
                                    v-for="(interval, index) in timesStart"
                                    :key="index"
                                    :value="interval"
                                    >{{ interval }}</b-select-option
                                 >
                              </b-select>
                           </div>
                           <p class="label-datepicker">
                              {{ $t("form.pickupDateAndTime") }}
                           </p>
                           <div class="d-flex mb-2">
                              <b-form-datepicker
                                 :format="'YYYY-MM-DD'"
                                 v-model="dateRange.endDate"
                                 :min="dateRange.startDate"
                                 class="w-100 mr-3"
                                 @input="validateBookingTime('endDate')"
                              />
                              <b-select
                                 v-model="dateRange.endTime"
                                 class="datetimepicker"
                                 @change="submit"
                              >
                                 <b-select-option
                                    v-for="(interval, index) in timesEnd"
                                    :key="index"
                                    :value="interval"
                                 >
                                    {{ interval }}
                                 </b-select-option>
                              </b-select>
                           </div>
                        </div>
                        <div
                           class="text-danger font-weight-bold"
                           v-if="error.date"
                        >
                           {{ error.date }}
                        </div>
                        <div>
                           <div>
                              <div>
                                 <div
                                    class="mt-3 border-bottom pb-3"
                                    v-for="(locker, index) in lockerTypeCount"
                                    :key="index"
                                 >
                                    <div
                                       v-if="lockerTypeCount.length > 1"
                                       class="float-right"
                                       @click="removeNewSize(index)"
                                    >
                                       <svg-icon
                                          class="base-icon cancel-icon"
                                          name="cancel"
                                       />
                                    </div>
                                    <div>
                                       <b-form-group
                                          :label="$t('sizes.title')"
                                          label-for="lockers-size"
                                          description=""
                                       >
                                          <b-form-select
                                             @change="submit"
                                             v-model="
                                                lockerTypeCount[index].size_id
                                             "
                                             id="lockers-size"
                                             class="select w-100"
                                          >
                                             <template
                                                v-for="locker in lockers"
                                             >
                                                <b-form-select-option
                                                   v-if="
                                                      checkSizeAvailability(
                                                         index,
                                                         locker.size_id
                                                      )
                                                   "
                                                   :value="locker.size_id"
                                                   :key="locker.id"
                                                >
                                                   {{
                                                      locker.size.name
                                                         | getTransValue(
                                                            $i18n.locale
                                                         )
                                                   }}
                                                </b-form-select-option>
                                             </template>
                                          </b-form-select>
                                       </b-form-group>
                                    </div>
                                    <b-form-group
                                       class="
                                          mb-0
                                          count-block
                                          d-flex
                                          align-items-center
                                       "
                                       :label="$t('form.count')"
                                       label-for="input-1"
                                       description=""
                                    >
                                       <span
                                          class="minus-icon count-icon"
                                          id="minusIcon"
                                          @click="countCalc('minus', index)"
                                          >-</span
                                       >
                                       <b-form-input
                                          v-model="lockerTypeCount[index].count"
                                          id="input-1"
                                          class="count-inp"
                                          type="text"
                                          readonly
                                          required
                                       />
                                       <span
                                          class="plus-icon count-icon"
                                          id="plusIcon"
                                          @click="countCalc('plus', index)"
                                          >+</span
                                       >
                                    </b-form-group>
                                 </div>
                                 <a
                                    v-if="
                                       lockers.length > 1 &&
                                       lockerTypeCount.length < lockers.length
                                    "
                                    @click="addNewSize"
                                    class="
                                       float-right
                                       d-block
                                       mt-2
                                       add-size-btn
                                    "
                                 >
                                    + {{ $t("form.addSize") }}
                                 </a>
                              </div>
                           </div>
                        </div>
                        <p
                           class="
                              label-datepicker
                              d-flex
                              justify-content-between
                              w-100
                              text-uppercase
                              price-calc-total-price
                           "
                           v-if="totalPrice"
                        >
                           {{ $t("form.totalPrice") }}
                           <span>{{ totalPrice }}</span>
                        </p>
                        <p
                           class="
                              label-datepicker
                              d-flex
                              justify-content-between
                           "
                           v-if="message"
                        >
                           {{ message }}
                        </p>
                        <button
                           :disabled="!totalPrice || !dateRange.startTime || !dateRange.endTime"
                           type="button"
                           @click="booking()"
                           class="btn btn-blue btn-large w-100 mt-3"
                           style="height: 50px; letter-spacing: 1px"
                        >
                           {{ $t("form.btn.booking") }}
                        </button>
                     </form>
                  </div>
               </b-col>

               <b-col
                  v-else
                  sm="10"
                  lg="4"
                  xl="4"
                  class="
                     text-center
                     mx-auto
                     float-right
                     mb-4
                     pt-5
                     price-calc-block
                     success-block
                     pb-5
                  "
               >
                  <div class="check-icon">
                     <svg-icon class="lg-icon mb-2" name="accept" />
                  </div>
                  <h4 class="font-weight-bold">
                     {{ $t("form.createdBooking") }}
                  </h4>
               </b-col>
            </div>
            <div v-else>
               <b-col
                  sm="10"
                  lg="4"
                  xl="4"
                  class="
                     text-center
                     mx-auto
                     float-right
                     mb-4
                     pt-5
                     price-calc-block
                     success-block
                     pb-5
                  "
               >
                  <h4 class="font-weight-bold">
                     {{ $t("form.lockerIsNotBookable") }}
                  </h4>
               </b-col>
            </div>
         </section>

         <div class="page-content-section py-4 py-lg-5">
            <b-row>
               <b-col lg="8">
                  <div class="place-info mb-5">
                     <h2 class="title-secondary text-left">
                        {{ this.branch.name | getTransValue($i18n.locale) }}
                     </h2>
                     <div v-html="this.branch.description.en"></div>
                     <p class="my-2" v-if="this.branch.phone">
                        <svg-icon
                           class="
                              md-icon
                              btn-primary
                              mr-1
                              p-1
                              rounded-circle
                              text-white
                              align-text-bottom
                           "
                           name="phone"
                        />
                        {{
                           JSON.parse(this.branch.country_code).code + this.branch.phone
                        }}
                     </p>

                     <p
                        class="mb-2"
                        v-for="item in this.branch.social_network_urls"
                        v-bind:key="index"
                     >
                        <svg-icon
                           class="
                              md-icon
                              btn-primary
                              mr-1
                              p-1
                              rounded-circle
                              text-white
                              align-text-bottom
                           "
                           :style="{
                              backgroundColor:
                                 item.type == 'viber' ? '#59267c' : '#25d366',
                           }"
                           :name="item.type"
                        />
                        {{ item.url }}
                     </p>
                  </div>
               </b-col>

               <b-col lg="8">
                  <div class="img-gallery">
                     <div class="clearfix"></div>

                     <CoolLightBox
                        :items="items"
                        :index="index"
                        :effect="'fade'"
                        @close="index = null"
                     >
                     </CoolLightBox>
                     <div class="images-wrapper scroll-box gallery-lightbox">
                        <figure
                           class="img-container"
                           :class="
                              branch.media.length > 6 &&
                              imageIndex == branch.media.length - 1
                                 ? 'card-overlay'
                                 : ''
                           "
                           v-for="(image, imageIndex) in branch.media"
                           :key="imageIndex"
                           @click="index = imageIndex"
                        >
                           <img :src="image.url" class="w-100" alt="" />
                           <figcaption
                              v-if="branch.media.length > 6"
                              class="img-caption"
                           >
                              +7 image
                           </figcaption>
                        </figure>
                     </div>
                  </div>
               </b-col>

               <b-col
                  lg="12"
                  v-if="lockers.length"
                  class="lockers-about-section py-lg-5 py-4"
               >
                  <h2 class="title-secondary">
                     {{ $t("title.lockersPrices") }}
                  </h2>
                  <b-table-simple responsive class="w-100 price-list-table">
                     <b-thead>
                        <b-tr>
                           <b-th>{{ $t("lockers.title.timeInHours") }}</b-th>
                           <b-th v-for="locker in lockers" :key="locker.id"
                              >{{
                                 locker.size.name | getTransValue($i18n.locale)
                              }}
                           </b-th>
                        </b-tr>
                     </b-thead>
                     <!--              {{ packages }}-->
                     <b-tbody>
                        <b-tr :key="index" v-for="(pack, index) in packages">
                           <b-td>{{ packages[index] }}</b-td>
                           <b-td v-for="locker in lockers" :key="locker.id">
                              {{ getPackagePrice(packages[index], locker) }}
                           </b-td>
                        </b-tr>
                        <b-tr v-if="checkRowAvailability('price_per_hour')">
                           <b-td>{{ $t("lockers.title.extraHour") }}</b-td>
                           <b-td v-for="locker in lockers" :key="locker.id">
                              {{ locker.price_per_hour || "-" }}
                           </b-td>
                        </b-tr>
                        <b-tr v-if="checkRowAvailability('price_per_day')">
                           <b-td>{{ $t("lockers.title.extraDay") }}</b-td>
                           <b-td v-for="locker in lockers" :key="locker.id">
                              {{ locker.price_per_day || "-" }}
                           </b-td>
                        </b-tr>
                     </b-tbody>
                  </b-table-simple>
               </b-col>

               <b-col
                  lg="12"
                  v-if="branch"
                  class="lockers-about-section py-lg-5 py-4"
               >
                  <h2 class="title-secondary">
                     {{ $t("title.openingTimes") }}
                  </h2>
                  <OpeningHoursCard
                     :times="branch.opening_times"
                  ></OpeningHoursCard>
               </b-col>

               <b-col lg="12">
                  <h2 class="title-secondary mt-5">
                     {{ $t("title.map") }}
                  </h2>

                  <div style="height: 450px">
                     <GmapMap
                        :center="{ lat: int(branch.lat), lng: int(branch.lng) }"
                        :zoom="11"
                        style="width: 100%; height: 100%"
                        ref="map"
                     >
                        <GmapMarker
                           :position="{
                              lat: int(branch.lat),
                              lng: int(branch.lng),
                           }"
                           :clickable="true"
                           :draggable="false"
                        />
                     </GmapMap>
                  </div>
               </b-col>
            </b-row>
         </div>

         <section
            v-if="branch.feedbacks.data.length"
            class="reviews-section py-3 py-lg-5"
         >
            <h2 class="title-secondary">{{ $t("reviews.title") }}</h2>
            <b-row>
               <b-col
                  lg="8"
                  class="mb-4"
                  v-for="reviewCard in branch.feedbacks.data"
                  v-bind:key="reviewCard.id"
               >
                  <div class="lockers-reviews">
                     <div class="review">
                        <div class="review-user d-flex align-items-center">
                           <div class="review-img">
                              <img
                                 :src="
                                    reviewCard.user.avatar
                                       ? reviewCard.user.avatar
                                       : require('@/assets/img/user-avatar.png')
                                 "
                                 alt=""
                              />
                           </div>
                           <div class="w-100 ml-2">
                              <div
                                 class="
                                    user-info
                                    d-flex
                                    flex-wrap
                                    justify-content-between
                                 "
                              >
                                 <div>
                                    <p class="review-name mb-0">
                                       {{ reviewCard.user.name }}
                                    </p>
                                    <p class="review-date">
                                       {{ reviewCard.created_at | dateReview }}
                                    </p>
                                 </div>
                                 <div class="rating-stars d-flex">
                                    <svg-icon
                                       class="sm-icon"
                                       name="star-solid"
                                       v-for="starFull in reviewCard.rating"
                                       v-bind:key="starFull.index"
                                    />
                                    <svg-icon
                                       class="sm-icon"
                                       name="star-regular"
                                       v-for="star in 5 - reviewCard.rating"
                                       v-bind:key="star.index"
                                    />
                                 </div>
                                 <!-- <p class="review-country mb-0">
                        {{ reviewCard.country }}
                      </p> -->
                              </div>
                           </div>
                        </div>
                        <p class="review-text my-2">{{ reviewCard.text }}</p>
                     </div>
                  </div>
               </b-col>
            </b-row>
         </section>
      </b-container>

      <section
         v-if="recommended.length"
         class="recommended-storages py-3 py-lg-5"
      >
         <b-container>
            <h2 class="title-secondary text-center">
               {{ $t("title.recommendedStorages") }}
            </h2>

            <b-row>
               <b-col
                  md="6"
                  lg="4"
                  v-for="recommend in recommended"
                  v-bind:key="recommend.id"
               >
                  <div class="storage-card">
                     <NuxtLink
                        :to="prepareUrl(`/branches/${recommend.slug}`)"
                        class="storage-card-box card-overlay"
                     >
                        <img :src="recommend.preview" class="logo-img" alt="" />
                        <span class="storage-card-description">
                           <span class="title-tertiary d-block">{{
                              recommend.name | getTransValue($i18n.locale)
                           }}</span>
                           <span
                              class="place-address d-flex align-items-center"
                           >
                              <svg-icon class="sm-icon" name="location" />
                              <span>{{ recommend.address }}</span>
                           </span>
                           <span class="place-rating d-flex align-items-center">
                              <span class="rating-review">{{
                                 recommend.avg_rating
                              }}</span>
                              <span class="rating-stars d-flex">
                                 <svg-icon
                                    class="sm-icon"
                                    name="star-solid"
                                    v-for="starFull in Math.round(
                                       recommend.avg_rating
                                    )"
                                    v-bind:key="starFull.index"
                                 />
                                 <svg-icon
                                    class="sm-icon"
                                    name="star-regular"
                                    v-for="star in 5 -
                                    Math.round(recommend.avg_rating)"
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
                              {{ recommend.city.name }}
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

      <Seo
         :meta_title="branch.meta_title"
         :meta_keywords="branch.meta_keywords"
         :meta_description="branch.meta_description"
         :og_image="branch.logo"
         :twitter_image="branch.logo"
      >
      </Seo>
   </div>
</template>

<script>
import { mapGetters } from "vuex"
import GoBack from "@/components/go-back"
import Map from "@/components/home/map.vue"
import CoolLightBox from "vue-cool-lightbox"
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css"
import moment from "moment"
import Seo from "../../../components/seo/index.vue"
import global from "~/mixins/global.js"
import OpeningHoursCard from "../../../components/buisness/branch/opening-hours-card"

export default {
   components: {
      OpeningHoursCard,
      CoolLightBox,
      GoBack,
      Map,
      Seo,
   },
   mixins: [global],
   data() {
      return {
         sizes: {},
         meta: {
            meta_title: null,
            meta_keywords: null,
            meta_description: null,
         },
         isBookingSubmit: false,
         branch: {},
         lockers: {},
         recommended: {},
         packages: {},
         branch_id: null,
         check_in: null,
         check_out: null,
         dateRange: {
            startDate: this.today(),
            endDate: this.today(),
            startTime: "10:00",
            endTime: "10:15",
         },
         timesStart: [],
         forceAllowedTimes: {
            startDate: {
               start: 0,
               end: 24,
            },
            endDate: {
               start: 0,
               end: 24,
            },
         },
         timesEnd: [],
         userData: null,
         lockerTypeCount: [
            {
               size_id: null,
               count: 1,
            },
         ],
         userId: null,
         message: "",
         bookingCheck: false,
         totalPrice: "",
         items: [],
         currency: "",
         baseUrl: null,
         error: {
            date: "",
         },
         index: null,
         resultVal: 1,
         slug: null,
         minPrice: null,
      }
   },

   filters: {
      date(val) {
         const date = moment(val).format("DD.MM.YYYY HH:mm")
         return date.toString()
      },
      dateReview(val) {
         const date = moment(val).format("MMM YYYY")
         return date.toString()
      },
      getTransValue(val, lang) {
         return val[lang]
      },
      changeDataFormat(val) {
         const date = moment(val).format("DD/MM/YYYY")
         return date.toString()
      },
   },

   computed: {
      ...mapGetters({
         userCurrency: "map/selectedCurrency",
      }),
   },
   async asyncData({ $axios, route, store }) {
      const { data } = await $axios.get(
         `/branches/user/${route.params.slug}?currency=${store.getters["home/currency"]}`
      )
      let packages = {}
      let i = 0
      data.lockers.forEach((element) => {
         if (element.prices) {
            element.prices.forEach((price) => {
               let period = price.range_start + " - " + price.range_end
               if (Object.values(packages).indexOf(period) < 0) {
                  packages[i++] = period
               }
            })
         }
      })
      return {
         packages: packages,
         branch: data.branch,
         lockers: data.lockers,
         lockerTypeCount: [
            {
               size_id: data.lockers[0]?.size?.id || null,
               count: 1,
            },
         ],
         recommended: data.recommended,
         branch_id: data.branch.id,
      }
   },

   methods: {
      int(i) {
         return Number(i)
      },
      created: () => {
         store.commit("increment") // set state
      },
      today() {
         const date = moment(new Date()).format("YYYY-MM-DD")
         return date.toString()
      },
      correctEndDate() {
         var startDate = moment(this.dateRange.startDate)
         var endDate = moment(this.dateRange.endDate)
         if (startDate > endDate) {
            this.dateRange.endDate = this.dateRange.startDate
         }
      },
      submit() {
         this.error.date = ""
         if (!this.dateRange.startDate || !this.dateRange.endDate) {
            this.error.date = "Time is Required"
         }
         if (this.error.date === "" && this.dateRange.startTime && this.dateRange.endTime) {
            this.$axios
               .post("branches/lockers", {
                  branch_id: this.branch_id,
                  currency: this.$store.getters["home/currency"],
                  check_in: moment(this.dateRange.startDate).format(
                     "YYYY-MM-DD"
                  ),
                  check_out: moment(this.dateRange.endDate).format(
                     "YYYY-MM-DD"
                  ),
                  start_time: this.dateRange.startTime,
                  end_time: this.dateRange.endTime,
                  data: this.lockerTypeCount,
               })
               .then((res) => {
                  if (res.data.total_price) {
                     if (res.data.total_price != 0) {
                        this.totalPrice = res.data.total_price
                     } else {
                        this.totalPrice = null
                     }
                  } else this.message = res.data.total_price
               })
               .catch((error) => {
                  this.totalPrice = null
                  if (error.response.status === 400) {
                     this.$bvToast.toast(error.response.data.message, {
                        variant: "danger",
                        solid: true,
                     })
                  }
               })
         }
      },
      checkRowAvailability(key) {
         let ticker = false
         this.lockers.forEach((el) => {
            if (el[key]) {
               ticker = true
            }
         })
         return ticker
      },
      booking() {
         if (this.userData) {
            this.currency = this.userData.currency
            this.bookingCheck = true
            this.$axios
               .post("branches/lockers/booking", {
                  branch_id: this.branch_id,
                  booking: this.bookingCheck,
                  check_in: moment(this.dateRange.startDate).format(
                     "YYYY-MM-DD"
                  ),
                  check_out: moment(this.dateRange.endDate).format(
                     "YYYY-MM-DD"
                  ),
                  start_time: this.dateRange.startTime,
                  end_time: this.dateRange.endTime,
                  data: this.lockerTypeCount,
               })
               .then((res) => {
                  this.isBookingSubmit = true
               })
         } else {
            this.$bvModal.show("modal-sign")
         }
      },
      getPackagePrice(pack, locker) {
         if (locker) {
            for (let i = 0; i < locker.prices.length; i++) {
               let period =
                  locker.prices[i].range_start +
                  " - " +
                  locker.prices[i].range_end
               if (period == pack) {
                  return locker.prices[i].price
               }
            }
         }
         return "-"
      },
      addNewSize() {
         for (let index = 0; index < this.lockers.length; index++) {
            let elementExist = false
            this.lockerTypeCount.forEach((el) => {
               if (this.lockers[index].size.id == el.size_id) {
                  elementExist = true
               }
            })
            if (!elementExist) {
               this.lockerTypeCount.push({
                  size_id: this.lockers[index].size.id,
                  count: 1,
               })
               break
            }
         }
         this.submit()
      },
      checkSizeAvailability(index, size_id) {
         for (let i = 0; i < this.lockerTypeCount.length; i++) {
            if (size_id == this.lockerTypeCount[i].size_id && i != index) {
               return false
            }
         }
         return true
      },
      removeNewSize(index) {
         this.lockerTypeCount.splice(index, 1)
         this.submit()
      },
      roundMinutes(date) {
         date.setHours(date.getHours() + Math.round(date.getMinutes() / 60))
         date.setMinutes(0, 0, 0)
         return date
      },
      countCalc(type, index, event) {
         if (type == "plus") {
            this.lockerTypeCount[index].count += 1
         } else {
            if (this.lockerTypeCount[index].count > 1) {
               this.lockerTypeCount[index].count -= 1
            }
         }
         this.submit()
      },

      times(start = null) {
         // 96 = 24 *4(every 15 min)
         let minutes = ["00", "15", "30", "45"]
         this.timesStart = []
         this.dateRange.endTime = null
         this.dateRange.startTime = null
         for (
            let i = this.forceAllowedTimes.startDate.start;
            i < this.forceAllowedTimes.startDate.end - 1;
            i++
         ) {
            for (let j = 0; j < minutes.length; j++) {
               let hour = i
               if (i < 10) {
                  hour = "0" + i
               }
               this.timesStart.push(hour + ":" + minutes[j])
            }
            this.dateRange.startTime = start || this.timesStart[0] || null
         }
         if (!start) {
            start = this.dateRange.startTime
         }
         this.timesEnd = []
         let time = start.split(":")
         let h = parseInt(time[0]) + 1
         let m = time[1]
         if (this.dateRange.endDate !== this.dateRange.startDate) {
            h = this.forceAllowedTimes.endDate.start
         }
         for (let i = h; i < this.forceAllowedTimes.endDate.end; i++) {
            if (i < 10) {
               h = "0" + i
            } else {
               h = i
            }
            this.timesEnd.push(h + ":" + m)
         }
         this.dateRange.endTime = this.timesEnd[0] || null
         //  }
      },

      timeChange() {
         this.times(this.dateRange.startTime)
         this.submit()
      },

      validateBookingTime(type) {
         let openingHours = this.branch.opening_times
         let selectedDate = null
         if (type == "startDate") {
            selectedDate = this.dateRange.startDate
            this.correctEndDate()
         } else {
            selectedDate = this.dateRange.endDate
         }

         let dow = moment(selectedDate).day()
         if (!dow) dow = 7 // Sunday in the system saved under number 7
         openingHours.forEach((el) => {
            if (el.weekday == dow) {
               if (!el.status) {
                  this.forceAllowedTimes[type].start = 0
                  this.forceAllowedTimes[type].end = 0
               } else {
                  this.forceAllowedTimes[type].start = parseInt(el.start)
                  this.forceAllowedTimes[type].end = parseInt(el.end)
               }
            }
         })
         this.times()
      },
   },

   mounted() {
      this.times()
      this.userData = this.$auth.user
      let itemsArr = []
      if (this.branch.media) {
         this.branch.media.forEach((item) => {
            if (item.url) {
               itemsArr.push(`${item.url}`)
               this.items = itemsArr
            }
         })
      }
      this.validateBookingTime('startDate')
      this.validateBookingTime('endDate')
      this.submit()

   },
}
</script>
