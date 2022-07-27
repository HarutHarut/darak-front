<template>
   <b-container fluid>
      <b-row>
         <b-col>
            <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
            <PageTitle :title="title" :image="image" />
               <b-row>
                  <b-col >
                     <b-form-group
                             class="mr-3 d-flex align-items-center"
                     >
                        <b-form-select
                                v-model="branchId"
                                id="lockers-size"
                                class="select mb-3" sm="4"
                        >
                           <b-form-select-option  value="">{{ $t("dashboard.fields.branch") }} </b-form-select-option>
                           <b-form-select-option
                                   :value="branch.id"
                                   v-for="branch in branches"
                                   :key="branch.id"
                           >{{
                              branch.name
                              | getTransValue($i18n.locale)
                              }}
                           </b-form-select-option>
                        </b-form-select>
                     </b-form-group>
                  </b-col>
                  <b-col md="7">
                     <div class="filter-orders-box flex-wrap d-flex align-items-center mb-3 w-100">
                        <div class="datepicker-box d-flex flex-wrap flex-md-nowrap w-100">
                           <date-range-picker
                                   v-model="dateRange"
                                   ref="picker"
                                   :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm' }"
                                   :timePicker="true"
                                   :timePicker24Hour="true"
                                   :date-range="{ startDate: null, endDate: null }"
                                   :default="new Date()"
                           >
                              <template v-slot:input="picker" style="max-width: 500px;">
                                        <span class="picker-box d-flex align-items-center h-100">
                                        <span class="rangepicker-icon">
                                            <svg-icon class="base-icon" name="calendar"/>
                                        </span>
                                        <span class="rangepicker-text d-flex justify-content-between">
                                            <span v-if="picker.startDate">{{ picker.startDate | date }}</span>
                                            <span v-else>{{ dateRange.startDate }}</span>
                                            <span v-if="picker.endDate">{{ picker.endDate | date }}</span>
                                            <span v-else>{{ dateRange.endDate }}</span>
                                        </span>
                                        </span>
                              </template><template #ranges="ranges">
                              <div class="ranges">
                                 <ul>
                                    <li v-for="(range, name) in ranges.ranges" :key="name" @click="ranges.clickRange(range)">
                                       <b>{{ name }}</b> <small class="text-muted">{{ range[0].toDateString() }} -
                                       {{ range[1].toDateString() }}</small>
                                    </li>
                                 </ul>
                              </div>
                           </template>

                           </date-range-picker>
                        </div>
                     </div>
                  </b-col>
                  <b-col>
                     <b-button
                             type="button"
                             class="btn btn-color btn-form"
                             @click="searchOrders()"
                     >{{ $t("form.find") }}
                     </b-button
                     >
                  </b-col>
               </b-row>

            </div>
            <section class="static-section position-relative mb-3">
               <div class="title-box">
                  <h4 class="title p-3">{{ $t("dashboard.list.orders") }}</h4>
               </div>
               <b-table-simple responsive class="static-table">
                  <b-thead>
                     <b-tr>
                        <b-th>{{ $t("dashboard.fields.bookNumber") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.branchName") }}</b-th>
                        <b-th>{{ $t("dashboard.form.guestName") }}</b-th>
                        <b-th>{{ $t("form.checkIn") }}</b-th>
                        <b-th>{{ $t("form.checkOut") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.price") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.result") }}</b-th>
                        <b-th class="p-1" colspan="2">{{
                           $t("dashboard.fields.actions")
                        }}</b-th>
                     </b-tr>
                  </b-thead>
                  <b-tbody>
                     <b-tr :key="order.id" v-for="(order) in officeOrders">
                        <b-th class="bookingColor">
                           <NuxtLink :to="prepareUrl(`/dashboard/orders/${order.booking_number}`)" >#{{order.booking_number}}</NuxtLink>
                        </b-th>
                        <b-td>
                           <!--                                        <p :key="bookingBranchName.id" v-for="(bookingBranchName) in order.bookings"> {{bookingBranchName.branch.name | getTransValue($i18n.locale)}} </p>-->
                           <p> {{order.bookings[0].branch.name | getTransValue($i18n.locale)}} </p>
                        </b-td>
                        <b-td>{{order.user.name}}</b-td>
                        <b-td>{{order.check_in | dateTable}}</b-td>
                        <b-td>{{order.check_out | dateTable}}</b-td>
                        <b-td>{{order.price}}{{order.currency}}</b-td>
                        <b-td><span class="status-order complated">{{order.status}}</span></b-td>
                        <!-- <b-td ><svg-icon class="base-icon" name="eye"></svg-icon></b-td> -->
                        <b-td>
                           <button v-if="check(order.check_in) && order.status == 'pending'" v-b-modal.cancel-order-modal class="btn btn-cancel" @click="openCancelModal(order.id)">{{ $t("form.btn.cancel") }}</button>
                        </b-td>
                     </b-tr>
                  </b-tbody>
               </b-table-simple>
               <div class="p-2" v-if="total > perPage || currentPage !== 1">
                  <b-pagination
                     v-model="currentPage"
                     :total-rows="total"
                     :per-page="perPage"
                     @input="getOrders"
                     pills
                     size="md"
                  ></b-pagination>
               </div>
            </section>
         </b-col>
      </b-row>

      <b-modal id="cancel-order-modal" hide-footer hide-header>
         <p class="text-center">{{ $t("form.btn.cancelThisOrder") }}?</p>
         <div class="text-center">
            <b-button class="mt-3 btn-success" @click="cancelOrder()">
               {{ $t("form.btn.Yes") }}
            </b-button>
            <b-button
               class="mt-3 btn-danger"
               @click="$bvModal.hide('cancel-order-modal')"
            >
               {{ $t("form.btn.No") }}
            </b-button>
         </div>
      </b-modal>
   </b-container>
</template>

<script>
import PageTitle from "@/components/dashboard/page-title.vue"
import DateRangePicker from 'vue2-daterange-picker'
import SearchForm from '@/components/dashboard/search-form.vue'
import moment from "moment"
import global from "~/mixins/global.js"

export default {
   mixins: [global],
   components: {
      PageTitle,
      DateRangePicker,
   },

   data() {
      let date = new Date();
      return {
         dateRange: {
            startDate: new Date(date.getFullYear(), date.getMonth(), 1),
            endDate: new Date()
         },
         branches:null,
         officeOrders:null,
         type:'business_owner',
         businessId:null,
         cancelButton: false,
         orderId: null,
         cancelButtonArray:[],
         branchId: '',
         searchText: '',
         businessList: {},
         title: this.$t("dashboard.list.orders"),
         image: "basket",
         perPage: 15,
         total: 0,
         currentPage: 1,
         selectedId: null,
         selected: "ALL"
      }
   },

   methods: {
      getOrders(page = 1) {
         this.$axios
           .post("orders/order", {
              type:this.type,
              branch_id:this.branchId,
              check_in: moment(this.dateRange.startDate).format(
                      "YYYY-MM-DD HH:mm:ss"
              ),
              check_out: moment(this.dateRange.endDate).format(
                      "YYYY-MM-DD HH:mm:ss"
              ),
           })
           .then(({data}) => {
              this.officeOrders = data.orders.data
              this.officeOrders.forEach(element => {
                 this.businessId = element.business_id
                 let today = moment().format("YYYY-MM-DD HH:mm:ss")
                 let addingHour = moment( element.check_in).add(1, 'hours').format("YYYY-MM-DD HH:mm:ss")
                 if(today > element.check_in && today < addingHour) {
                    this.cancelButton = true
                 }
                 else {
                    this.cancelButton = false
                 }
                 this.cancelButtonArray.push(this.cancelButton)
              });
           })
      },
      check(check_in) {
         const date = new Date(Date.now() + 1 * (60 * 60 * 1000));
         const date2 = new Date(Date.now());
         const now = moment(date).format("YYYY-MM-DD HH:mm:ss")
         const now2 = moment(date2).format("YYYY-MM-DD HH:mm:ss")
         if (check_in < now2 < now) {
            return true;
         }else {
            return false;
         }

      },
      getBranchesList() {
         this.$axios
                 .get("/branches/list")
                 .then(({ data }) => {
                    this.branches = data.branches;
                 })
                 .catch(e => {
                    console.log(e);
                 })
                 .finally(() => {
                 });
      },
      searchOrders() {
         this.$axios
                 .post("orders/order", {
                    type:this.type,
                    business_id:this.businessId,
                    branch_id:this.branchId,
                    check_in: moment(this.dateRange.startDate).format(
                            "YYYY-MM-DD HH:mm:ss"
                    ),
                    check_out: moment(this.dateRange.endDate).format(
                            "YYYY-MM-DD HH:mm:ss"
                    ),
                 })
                 .then(({data}) => {
                    this.officeOrders = data.orders.data
                 })
      },
      cancelOrder() {
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
                    this.$bvModal.hide('cancel-order-modal')
                 }).catch((e) => {
            console.log(e);
         });
      },
      openCancelModal(id) {
         this.orderId = id
         this.$bvModal.show("cancel-order-modal")
      },
   },


   filters: {
      date(val) {
         return val ? val.toLocaleString() : ''
      },
      monthStart(val) {
         const data = moment(Date.now()).format("DD.MM.YYYY HH:mm");
         return data.toString();
      },
      getTransValue(val, lang) {
         return val[lang]
      },
      dateTable(val) {
         const date = moment(val).format('D MMMM YYYY, h:mm:ss ')
         return date.toString()
      },
   },
   mounted(){
      this.getBranchesList()
      this.getOrders()
   }
}
</script>
