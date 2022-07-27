<template>
   <b-container fluid>
      <b-row>
         <b-col>
            <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
               <PageTitle :title="title" :image="image"/>
               <div class="search-group d-flex flex-wrap">
                  <div class="mr-3 mb-2 mb-sm-0">
                     <select @change="getReviews" v-model="selected" class="form-control custom-select">
                        <option value="">{{ $t('dashboard.list.allBranches') }}</option>
                        <option v-for="item in optionsBranches" v-bind:key="item.id" :value="item.id">{{ item.name | getTransValue($i18n.locale) }}</option>
                     </select>
<!--                     <b-form-select v-model="selected" :options="optionsBranches"></b-form-select>-->
                  </div>
                  <DatePicker/>
               </div>
            </div>
            <section class="static-section  mb-3">
               <div class="title-box">
                  <h4 class="title p-3">{{ $t('dashboard.list.reviews') }}</h4>
               </div>
               <b-table-simple responsive class="static-table reviews-table">
                  <b-thead>
                     <b-tr>
                        <b-th>{{ $t("dashboard.fields.branch") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.name") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.date") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.rating") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.reviewsText") }}</b-th>
<!--                        <b-th class="p-1">{{ $t("dashboard.fields.actions") }}</b-th>-->
                     </b-tr>
                  </b-thead>
                  <b-tbody>

                     <b-tr v-for="(review) in reviews" v-bind:key="review.id">
                        <b-td>{{ review.branch.name | getTransValue($i18n.locale)}}</b-td>
                        <b-td>{{ review.user.name }}</b-td>
                        <b-td>{{ review.created_at | changeDataFormat }}</b-td>
                        <b-td>
                            <span class="rating-stars d-flex justify-content-center">
                                <span v-for="i of review.rating" v-bind:key="i">
                                   <svg-icon v-if="i <= review.rating" class="base-icon" name="star-solid"/>
                                </span>
                                <span v-for="j of (5 - review.rating)" v-bind:key="j">
                                   <svg-icon  class="base-icon" name="star-regular"/>
                                </span>
                            </span>
                        </b-td>
                        <b-td class="reviews-text">
                           {{ review.text }}
                        </b-td>
<!--                        <b-td class="cancel-cell">-->
<!--                           <a href="#" @click="deleteReviewModal(review.id)">-->
<!--                              <svg-icon class="sm-icon icon-cancel" name="cancel"></svg-icon>-->
<!--                           </a>-->
<!--                        </b-td>-->
                     </b-tr>
                  </b-tbody>
               </b-table-simple>
            </section>
         </b-col>

<!--         <div>-->
<!--            <b-modal id="bv-modal-example" hide-footer hide-header>-->
<!--               <p class="text-center">Are you sure you want delete this item?</p>-->
<!--               <div class="text-center">-->
<!--                  <b-button class="mt-3 btn-success" @click="deleteReview()">Yes</b-button>-->
<!--                  <b-button class="mt-3 btn-danger" @click="$bvModal.hide('bv-modal-example')">No</b-button>-->
<!--               </div>-->
<!--            </b-modal>-->
<!--         </div>-->
      </b-row>
   </b-container>
</template>

<script>

import PageTitle from '@/components/office/page-title.vue'
import DatePicker from '@/components/office/datepicker.vue'
import moment from "moment";

export default {

   components: {
      PageTitle,
      DatePicker,
   },

   data() {
      return {
         title: this.$t('dashboard.list.reviews'),
         image: 'writing',
         selected: '',
         reviews: [],
         deleteId: null,
         optionsBranches: null,
      }
   },
   methods: {
      getReviews() {
         this.$axios.get('/feedbacks?branchId='+ this.selected).then((response) => {
            console.log(response);
            // optionsBranches
            const {data} = response;
            this.reviews = data.reviews.data;
            this.optionsBranches = data.branches;
         }).catch((e) => {
            console.log(e)
         })
      },
      // deleteReviewModal(id) {
      //    this.deleteId = id;
      //    this.$bvModal.show('bv-modal-example')
      // },
      // deleteReview() {
      //    this.$axios.delete(`/feedbacks/${this.deleteId}`)
      //         .then(() => {
      //            this.$bvModal.hide('bv-modal-example')
      //            this.getReviews()
      //         }).catch((e) => {
      //            console.log(e)
      //         })
      // }
   },
   mounted() {
      this.getReviews()
   },
   filters: {
      changeDataFormat(val) {
         return moment(val).format("DD/MM/YYYY").toString();
      },
      getTransValue(val, lang) {
         return val[lang]
      },
   },
}

</script>
