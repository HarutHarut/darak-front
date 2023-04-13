<template>
   <b-container>
      <b-row>
         <b-col>
            <h2 class="title-primary">{{ $t("list.orders") }}</h2>
         </b-col>
      </b-row>
      <b-row>
         <b-col class="mb-3" sm="4">
            <b-form-select
               v-model="status"
               :options="optionsStatus"
            ></b-form-select>
         </b-col>
         <b-col md="4">
            <div
               class="
                  filter-orders-box
                  flex-wrap
                  d-flex
                  align-items-center
                  mb-3
                  w-100
               "
            >
               <div
                  class="datepicker-box d-flex flex-wrap flex-md-nowrap w-100"
               >
                  <date-range-picker
                     v-model="dateRange"
                     ref="picker"
                     :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm' }"
                     :timePicker="true"
                     :timePicker24Hour="true"
                     :date-range="{ startDate: null, endDate: null }"
                  >
                     <template v-slot:input="picker" style="max-width: 500px">
                        <span
                           class="picker-box d-flex align-items-center h-100"
                        >
                           <span class="rangepicker-icon">
                              <svg-icon class="base-icon" name="calendar" />
                           </span>
                           <span
                              class="
                                 rangepicker-text
                                 d-flex
                                 justify-content-between
                              "
                           >
                              <span v-if="picker.startDate">{{
                                 picker.startDate | date
                              }}</span>
                              <span v-else>{{ $t("dashboard.form.startDay") }}</span>
                              <span v-if="picker.endDate">{{
                                 picker.endDate | date
                              }}</span>
                              <span v-else>{{ $t("dashboard.form.endDay") }}</span>
                           </span>
                        </span>
                     </template>
                  </date-range-picker>
               </div>
            </div>
         </b-col>
         <b-col md="4">
            <b-button
               type="button"
               class="btn btn-color btn-form"
               @click="searchOrders()"
               >{{ $t("form.find") }}
            </b-button>
         </b-col>
         <b-col xl="12">
            <b-table-simple responsive class="w-100 orders-table">
               <b-thead>
                  <b-tr>
                     <b-th>{{ $t("dashboard.fields.bookNumber") }}</b-th>
                     <b-th>{{ $t("dashboard.fields.branchName") }}</b-th>
                     <b-th>{{ $t("form.checkIn") }}</b-th>
                     <b-th>{{ $t("form.checkOut") }}</b-th>
                     <b-th>{{ $t("dashboard.fields.price") }}</b-th>
                     <b-th>{{ $t("dashboard.fields.status") }}</b-th>
                     <b-th></b-th>
                  </b-tr>
               </b-thead>
               <b-tbody>
                  <b-tr :key="order.id" v-for="(order, index) in accountOrders">
                     <b-th> <NuxtLink :to="prepareUrl(`/account/orders/${order.booking_number}`)" style="text-decoration: underline;"> #{{ order.booking_number }} </NuxtLink> </b-th>
                     <b-td><span :key="branchInfo.id" v-for="(branchInfo) in order.bookings.slice(0, 1)">{{branchInfo.branch.name | getTransValue($i18n.locale)}}</span></b-td>
                     <b-td>{{ order.check_in | dateTable }}</b-td>
                     <b-td>{{ order.check_out | dateTable }}</b-td>
                     <b-td >{{order.priceCurrency}}</b-td>
                     <b-td><span class="status-order" :class="order.status">{{order.status }}</span></b-td>
                     <b-td>
                        <b-button v-if="order.status == 'pending' && check(order.check_in)" @click="openCancelModal(order.id, index)" variant="outline-danger" size="sm" v-b-modal.cancel-order-modal >
                           {{ $t("form.btn.cancel") }}
                        </b-button>
                     </b-td>
                  </b-tr> 
               </b-tbody>
            </b-table-simple>
         </b-col>
      </b-row>

      <b-modal id="cancel-order-modal" hide-footer hide-header centered>
         <p class="text-center">{{ $t("dashboard.fields.cancelOrder") }}</p>
         <div class="text-center">
            <b-button class="mt-3 btn-success" @click="cancelOrder()"> {{ $t("dashboard.fields.yes") }} </b-button>
            <b-button class="mt-3 btn-danger" @click="$bvModal.hide('cancel-order-modal')"> {{ $t("dashboard.fields.no") }} </b-button>
         </div>
      </b-modal>
   </b-container>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker"
import "vue2-daterange-picker/dist/vue2-daterange-picker.css"
import moment from "moment"
import global from "~/mixins/global.js"

export default {
   mixins: [global],
   components: { DateRangePicker },
   filters: {
      date(val) {
         const date = moment(val).format("DD.MM.YYYY HH:mm");
         return date.toString();
      },
      dateTable(val) {
         const date = moment(val).format('D MMMM YYYY, HH:mm:ss ')
         return date.toString()
      },
      getTransValue(val, lang) {
         return val[lang]
      }
   },

   data() {
      return {
         today: new Date(),
         status: 'all',
         optionsStatus: [
            { value: "all", text: "All"},
            { value: "completed", text: "completed" },
            { value: "canceled", text: "canceled" },
            { value: "pending", text: "pending" },
         ],
         accountOrders: null,
         dateRange: {
            startDate: null,
            endDate: null,
         },
         currencyCourses:null,
         userData: null,
         localStorageCurrency: null,

         cancelButton: false,
         cancelButtonArray:[],
         orderId: null,
         orderIndex: null,
         // perPage: 3,
         // total: 0,
         // currentPage: 1,
      }
   },

   methods: {
      check(check_in) {
         const date = new Date();
         const now = moment(date).format(
            "YYYY-MM-DD HH:mm:ss"
         )
         if(now > check_in) {
            return false
         } else {
            return true
         }
      },
      searchOrders(page = 1) {
         // console.log(this.dateRange.startDate)
         this.$axios
             .get(`orders/order?page=${page}&account=${true}&status=${this.status}&check_in=${moment(this.dateRange.startDate).format(
                 "YYYY-MM-DD HH:mm:ss"
             )}&check_out=${moment(this.dateRange.endDate).format(
                 "YYYY-MM-DD HH:mm:ss"
             )}`)

            // .post("orders/order", {page = 1
            //    account: true,
            //    status: this.status,
            //    check_in: this.dateRange.startDate,
            //    check_out: this.dateRange.endDate
            // })
            .then(({ data }) => {
               this.accountOrders = data.orders.data
               this.currencyCourses = data.currency_courses
            })
      },

      getOrders() {
         this.$axios
             .get(`orders/order?account=${true}&status=${this.status}`)

                 // .post("orders/order", {account: true, status: this.status})
            .then(({ data }) => {
               this.accountOrders = data.orders.data
               this.currencyCourses = data.currency_courses

               this.accountOrders.forEach(item => {
                  let currencyCoursesUser = this.userData.currency
                  let itemCurrency = item.currency
                  // if(currencyCoursesUser !== null && currencyCoursesUser !== itemCurrency && currencyCoursesUser !== "AMD" && itemCurrency !== "AMD") {
                  //    item.price = item.price * this.currencyCourses[`${itemCurrency}`] / this.currencyCourses[`${currencyCoursesUser}`]
                  // }
                  // if(currencyCoursesUser !== itemCurrency && itemCurrency === "AMD") {
                  //    item.price /= this.currencyCourses[`${currencyCoursesUser}`]
                  //
                  // }
                  // if(currencyCoursesUser === 'AMD' && itemCurrency !== 'AMD') {
                  //    item.price *= this.currencyCourses[`${itemCurrency}`]
                  // }
                  // item.price = item.price.toFixed(2)

                  let today = moment().format("YYYY-MM-DD HH:mm:ss")
                  if(today < item.check_in ) {
                     this.cancelButton = true
                  }
                  else {
                     this.cancelButton = false
                  }
                  this.cancelButtonArray.push(this.cancelButton)
               })

            })

      },

      cancelOrder() {
         this.$bvModal.hide('cancel-order-modal')
         this.accountOrders[this.orderIndex].status = 'canceled'
            this.$axios.post(`cancel-order`, {
                order_id: this.orderId
            })
            .then(({ data: { booking } }) => {
                // this.booking.status = booking.status;
                this.$bvToast.toast(`Order canceled successfully.`, {
                title: `Order canceled successfully.`,
                variant: "success",
                solid: true
                });
            }).catch(error => {
               this.$bvToast.toast(error.response.data.message, {
                  variant: 'danger',
                  solid: true
               });
               this.accountOrders[this.orderIndex].status = 'pending'
            })
        },

      openCancelModal(id, index) {
         this.orderId = id
         this.orderIndex = index
         this.$bvModal.show("cancel-order-modal")
      },
   },

   mounted() {
      this.userData = this.$auth.user
      this.getOrders()
      this.localStorageCurrency = localStorage.currency
   },

}
</script>
