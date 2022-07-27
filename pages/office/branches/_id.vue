<template>
   <div>
      <b-container fluid>
         <b-row v-if="branch">
            <b-col md="12">
               <div class="alert alert-warning business-alert-message" v-if="branch.working_status == 2">
                  {{ $t("dashboard.statuses.onPending") }}!
               </div>
               <div class="alert alert-danger business-alert-message" v-if="branch.working_status == 0">
                  {{ $t("dashboard.statuses.isBlocked") }}!
               </div>
            </b-col>
            <b-col md="6" xl="4">
               <BranchCard :branch="branch"></BranchCard>
               <section class="static-section position-relative">
                  <div class="title-box">
                     <h4 class="title p-3">
                        {{ $t("dashboard.fields.openingHours") }}
                     </h4>
                  </div>
                  <OpeningHoursCard :times="branch.opening_times"></OpeningHoursCard>
                  <button
                     v-b-modal.modal-working-hours
                     class="btn btn-color btn-edit pt-1"
                  >
                     <svg-icon class="base-icon" name="edit"></svg-icon>
                  </button>
               </section>
            </b-col>

            <!--____________________Table lockers____________________ -->

            <b-col md="6" xl="8">
               <section class="static-section position-relative">
                  <LockersCard :branch="branch"></LockersCard>
               </section>

               <!--____________________Table lockers Price____________________ -->
               <b-row>
                  <b-col xl="6">
                     <section class="static-section">
                        <PricesCard :lockers="branch.lockers"></PricesCard>
                     </section>
                  </b-col>

                  <!--____________________Calculate lockers prices____________________ -->

                  <b-col>
                     <CalculatePrice :currency="currency" :lockers="branch.lockers"></CalculatePrice>
                  </b-col>
               </b-row>

               <!--____________________Reviews____________________ -->
               <FeedbackCard :feedbacks="branch.feedbacks"></FeedbackCard>
            </b-col>
         </b-row>
      </b-container>

      <!--____________________Modal, edit working days and time____________________ -->

      <b-modal
         hide-footer
         id="modal-working-hours"
         scrollable
         size="md"
         title="Edit working days and time"
      >
         <WorkingHour
            :form="branch.opening_times"
            v-on:submit="submitOpenTime"
            v-on:openingNext="openingNext"
         ></WorkingHour>
      </b-modal>
   </div>
</template>

<script>
import WorkingHour from "../../../components/buisness/branch/working-hours"
import BranchCard from "../../../components/buisness/branch/branch-card"
import LockersCard from "../../../components/buisness/branch/lockers-card"
import OpeningHoursCard from "../../../components/buisness/branch/opening-hours-card"
import PricesCard from "../../../components/buisness/branch/locker-price-card"
import FeedbackCard from "../../../components/buisness/branch/feedback-card"
import CalculatePrice from "../../../components/buisness/branch/calculate-price"
import global from "~/mixins/global.js"

export default {
   mixins: [global],

   components: {
      WorkingHour,
      BranchCard,
      OpeningHoursCard,
      LockersCard,
      PricesCard,
      FeedbackCard,
      CalculatePrice
   },
   data() {
      return {
         branch: {},
         currency: 'EUR'
      }
   },
   async asyncData({ $axios, route }) {
      const { data } = await $axios.get(`/branches/${route.params.id}`)
      let currency = 'EUR'
      if(data.branch.business.currency){
         currency = data.branch.business.currency
      }
      return {
         branch: data.branch,
         currency: currency
      }
   },
   methods: {
      submitOpenTime(data, next) {
         if (this.branch.opening_times.length === 0) {
            this.createOpenTime(data, next)
         } else {
            this.updateOpenTime(data, next)
         }
      },
      openingNext(data){

         this.submitOpenTime(data, 1)
      },
      createOpenTime(data, next) {
         this.$axios
            .post("/open/times", {
               branch_id: this.branch.id,
               time: data
            })
            .then(({ data: { openingTimes } }) => {
               if (next == 1){
                  let path = this.prepareUrl('/office/lockers/add');
                  this.$router.push({
                     name: 'office-lockers-add___en',
                     params: this.branch
                     // path: path,
                     // params: this.branch
                  })
               }else{
                  this.branch.opening_times = openingTimes
                  this.$bvModal.hide("modal-working-hours")
                  this.$bvToast.toast("Opening hours created successfully.", {
                     title: `Opening hours`,
                     variant: "success",
                     solid: true
                  })
               }
            })
            .catch(({ response }) => {
               switch (response.status) {
                  case 422:
                     const { errors } = response.data
                     console.log(errors)

                     break
               }
            })
      },
      updateOpenTime(data, next) {
         this.$axios
            .post("/open/times/update", {
               time: data,
               branch_id: this.branch.id,
            })
            .then(({data: {openingTimes}}) => {
               if (next == 1){
                  let path = this.prepareUrl('/office/lockers/add');
                  this.$router.push({
                     name: 'office-lockers-add___en',
                     params: this.branch
                  })
               }else{
                  this.branch.opening_times = openingTimes

                  this.$bvModal.hide("modal-working-hours")
                  this.$bvToast.toast("Opening hours updated successfully.", {
                     title: `Opening hours`,
                     variant: "success",
                     solid: true
                  })
               }

            })
            .catch(({ response }) => {
               switch (response.status) {
                  case 422:

                     this.$bvToast.toast(response.data.message, {
                        title: `Opening hours`,
                        variant: "danger",
                        solid: true
                     })
                     break
               }
            })
      }
   },
   mounted () {
      let url = window.location.href;
      if (url.includes('#')){
         this.$bvModal.show("modal-working-hours")
      }
   }
}
</script>
