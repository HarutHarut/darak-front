<template>
   <b-container fluid>
      <no-ssr>
         <b-row>
            <b-col lg="7">
               <div class="base-card card mb-3">
                  <section class="card-body">
                     <h2 class="title-secondary text-center">
                        {{ $t("dashboard.edit.locker") }}
                     </h2>
                  </section>

                  <LockerForm
                     :form="form"
                     :prices="prices"
                     :transError="transError"
                     :priceError="priceError"
                     :errors="errors"
                     :currency="this.currency"
                     :allSizes="true"
                     :saveNew="1"
                     v-on:submit="submit"
                  ></LockerForm>
               </div>
            </b-col>
            <b-col lg="5">
               <CalculatePrice :currency="currency" :selectedLocker="form.id"></CalculatePrice>
            </b-col>
         </b-row>
      </no-ssr>
   </b-container>
</template>

<script>
import LockerForm from "../../../components/buisness/lockers/locker-form"
import CalculatePrice from "../../../components/buisness/lockers/calculate-price"

export default {
   components: {
      LockerForm,
      CalculatePrice
   },
   data() {
      return {
         transError: false,
         priceError: false,
         // currency: '€',
         errors: []
      }
   },
   props: [
           // 'currency'
   ],
   methods: {
      submit(form) {
         this.priceError = false
         this.transError = false
         form._method = 'put'

         this.$axios
            .post("/lockers/update",form)
            .then(({ data }) => {
               this.$bvToast.toast("Update successfully.", {
                  title: `Update successfully`,
                  variant: "success",
                  solid: true
               })
            })
            .catch(error => {
               if (error.response.status == 400){
                  this.$bvToast.toast(error.response.data.message, {
                     variant: 'danger',
                     solid: true
                  });
               }else{
                  const {errors} = error.response.data;
                  this.errors = errors
               }

            })
            .finally(() => {
            });
      }
   },
   async asyncData({ $axios, route }) {
      const { data } = await $axios.get(`/lockers/${route.params.id}`)

      return {
         form: data.locker,
         currency: data.locker.currency,
         prices: data.locker.prices
      }
   },
   mounted() {
      // console.log(this.$route.params.allSizes)
      // this.allSizes = this.$route.params.allSizes;
      // this.currency = this.$route.params.currency;
   }
};
</script>

<style scoped>

</style>