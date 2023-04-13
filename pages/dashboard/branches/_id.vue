<template>
   <div>
      <b-container fluid>
         <b-row>
            <b-col md="5" xl="3">
               <BranchCard :admin="true" :branch="branch"></BranchCard>
               <section class="static-section position-relative ">
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

            <b-col md="7" xl="9">
               <section class="static-section position-relative">
                  <LockersCard :branch="branch" :admin="true"></LockersCard>
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
                     <CalculatePrice :currency="branch.currency" :lockers="branch.lockers"></CalculatePrice>
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
         :title="$t('modals.title')"
      >
         <WorkingHour
            :form="branch.opening_times"
            v-on:submit="submitOpenTime"
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

export default {
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
         branch: {}
      }
   },
   async asyncData({ $axios, route }) {
      const { data } = await $axios.get(`/branches/${route.params.id}`)
      return {
         branch: data.branch,
      }
   },
   methods: {
      submitOpenTime(data) {
         if (this.branch.opening_times.length === 0) {
            this.createOpenTime(data)
         } else {
            this.updateOpenTime(data)
         }
      },
      createOpenTime(data) {
         this.$axios
            .post("/open/times", {
               branch_id: this.branch.id,
               time: data
            })
            .then(({ data: { openingTimes } }) => {
               this.branch.opening_times = openingTimes
               this.$bvModal.hide("modal-working-hours")
               this.$bvToast.toast("Opening hours created successfully.", {
                  title: `Opening hours`,
                  variant: "success",
                  solid: true
               })
            })
            .catch(({ response }) => {
               switch (response.status) {
                  case 422:
                     const { errors } = response.data

                     break
               }
            })
      },
      updateOpenTime(data) {
         this.$axios
            .post("/open/times/update", {
               time: data,
               branch_id: this.branch.id,
            })
            .then(({data: {openingTimes}}) => {

               this.branch.opening_times = openingTimes

               this.$bvModal.hide("modal-working-hours")
               this.$bvToast.toast("Opening hours updated successfully.", {
                  title: `Opening hours`,
                  variant: "success",
                  solid: true
               })
            })
            .catch(({ response }) => {
               switch (response.status) {
                  case 422:

                     this.$bvToast.toast("The end time must be a time after start time.", {
                        title: `Opening hours`,
                        variant: "danger",
                        solid: true
                     })
                     break
               }
            })
      }
   }
}
</script>
