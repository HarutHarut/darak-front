<template>
   <b-container fluid>
      <b-row>
         <b-col>
            <div
               class="page-content-top d-flex flex-wrap align-items-center justify-content-between"
            >
               <PageTitle :title="title" :image="image" />
               <div class="d-flex flex-wrap align-items-center mb-3">
                  <div class="mr-3 mb-2 mb-sm-0">
                     <b-form-select @change="selectChange" v-model="selected">
                        <b-form-select-option value="ALL">
                           All
                        </b-form-select-option>
                        <b-form-select-option
                           :value="business.name"
                           v-for="(business) in businessList"
                           :key="business.id">
                           {{ business.name | getTransValue($i18n.locale) }}
                        </b-form-select-option>
                     </b-form-select>
                  </div>
                  <SearchForm @searchEmit="search"/>
               </div>
            </div>
            <section class="static-section  mb-3">
               <div class="title-box">
                  <h4 class="title p-3">{{ $t('dashboard.list.reviews') }}</h4>
               </div>
               <b-table-simple responsive class="static-table reviews-table">
                  <b-thead>
                     <b-tr>
                        <b-th>{{ $t("dashboard.list.business") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.branch") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.name") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.date") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.rating") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.reviewsText") }}</b-th>
                        <b-th class="p-1">{{
                           $t("dashboard.fields.actions")
                        }}</b-th>
                     </b-tr>
                  </b-thead>
                  <b-tbody>
                     <b-tr v-for="review in reviews" :key="review.id">
                        <b-td>{{ review.branch.business.name | getTransValue($i18n.locale) }}</b-td>
                        <b-td>{{
                           review.branch.name | getTransValue($i18n.locale)
                        }}</b-td>
                        <b-td>{{ review.user.name }}</b-td>
                        <b-td>{{ review.created_at | changeDataFormat }}</b-td>
                        <b-td>
                           <span
                              class="rating-stars d-flex justify-content-center"
                           >
                              <span v-for="i of review.rating" v-bind:key="review.id + '-' +i">
                                 <svg-icon
                                    v-if="i <= review.rating"
                                    class="base-icon"
                                    name="star-solid"
                                 />
                              </span>
                              <span
                                 v-for="i of 5 - review.rating"
                                 v-bind:key="i"
                              >
                                 <svg-icon
                                    class="base-icon"
                                    name="star-regular"
                                 />
                              </span>
                           </span>
                        </b-td>
                        <b-td class="reviews-text">
                           {{ review.text }}
                        </b-td>
                        <b-td class="cancel-cell">
                           <a href="#" @click="deleteReviewModal(review.id)">
                              <svg-icon
                                 class="sm-icon icon-cancel"
                                 name="cancel"
                              ></svg-icon>
                           </a>
                        </b-td>
                     </b-tr>
                  </b-tbody>
               </b-table-simple>
               <div class="p-2" v-if="total > perPage || currentPage !== 1">
                  <b-pagination
                     v-model="currentPage"
                     :total-rows="total"
                     :per-page="perPage"
                     @input="getReviews"
                     pills
                     size="md"
                  ></b-pagination>
               </div>
            </section>
         </b-col>

         <div>
            <b-modal id="bv-modal-example" hide-footer hide-header>
               <p class="text-center">
                  Are you sure you want delete this item?
               </p>
               <div class="text-center">
                  <b-button class="mt-3 btn-success" @click="deleteReview()"
                     >Yes</b-button
                  >
                  <b-button
                     class="mt-3 btn-danger"
                     @click="$bvModal.hide('bv-modal-example')"
                     >No</b-button
                  >
               </div>
            </b-modal>
         </div>
      </b-row>
   </b-container>
</template>

<script>
import PageTitle from "@/components/dashboard/page-title.vue"
import DatePicker from "@/components/dashboard/datepicker.vue"
import moment from "moment"
import SearchForm from '../../components/dashboard/search-form.vue'

export default {
   components: {
      PageTitle,
      DatePicker,
      SearchForm
   },

   data() {
      return {
         allReviews: {},
         reviews: {},
         businessList: {},
         selected: 'ALL',
         title: this.$t("dashboard.list.reviews"),
         image: "writing",
         deleteId: null,
         perPage: 15
      }
   },

   async asyncData({ $axios }) {
      const {
         data: { feedbacks }
      } = await $axios.get(`/admin/feedbacks?perPage=15`)

      return {
         currentPage: feedbacks.current_page,
         total: feedbacks.total,
         reviews: feedbacks.data
      }
   },

   methods: {
      getBusiness() {
         this.$nextTick(() => {
            this.$nuxt.$loading.start()
         })
         this.$axios
            .get("/business/list").then((res) => {
            this.businessList = res.data
         })
            .finally(() => {
               this.$nuxt.$loading.finish()
            })
      },
      selectChange() {
         console.log(this.selected)
         this.reviews = this.filterReviews(this.allReviews, this.selected)
      },
      filterReviews(reviews, selected) {
         if(this.selected == 'ALL') {
            return this.allReviews
         }
         const filtered = reviews.filter((review) => {
            return review.branch.business.name[this.$i18n.locale] === selected[this.$i18n.locale]
         })
         return filtered;
      },
      search(value) {
         const filteredReviews = this.filterReviews(this.allReviews, this.selected);
         if(filteredReviews.length != 0) {
            const filteredReviewsWithName = filteredReviews.filter((review) => {
               return review.branch.business.name.en.includes(value)
            })
            this.reviews = filteredReviewsWithName;
         }
      },
      getReviews(page = 1) {
         this.$nextTick(() => {
            this.$nuxt.$loading.start()
         })

         this.$axios
            .get(`/admin/feedbacks?perPage=15&page=${page}`)
            .then(({ data: { feedbacks } }) => {
               this.currentPage = feedbacks.current_page
               this.total = feedbacks.total
               this.allReviews = feedbacks.data
               this.reviews = this.allReviews
            })
            .catch(e => {
               console.log(e)
            }).finally(() => {
               this.$nuxt.$loading.finish()
            })
      },
      deleteReviewModal(id) {
         this.deleteId = id
         this.$bvModal.show("bv-modal-example")
      },
      deleteReview() {
         this.$axios
            .delete(`/admin/feedbacks/${this.deleteId}`)
            .then(() => {
               this.$bvModal.hide("bv-modal-example")
               this.getReviews()
            })
            .catch(e => {
               console.log(e)
            })
      }
   },
   mounted() {
      this.getReviews();
      this.getBusiness();
   },
   filters: {
      changeDataFormat(val) {
         return moment(val)
            .format("DD/MM/YYYY")
            .toString()
      },
      getTransValue(val, lang) {
         return val[lang]
      }
   }
}
</script>
