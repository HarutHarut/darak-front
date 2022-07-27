<template>
   <div>
<!--      <NuxtLink v-if="admin" :to="{ name: 'dashboard-lockers-add___en', params: branch}" class="btn-add ml-auto">-->
<!--         <svg-icon class="base-icon" name="add-button"></svg-icon>-->
<!--      </NuxtLink>-->
     <NuxtLink v-if="!admin" :to="{ name: 'office-lockers-add___en', params: branch}" class="btn-add ml-auto">
       <svg-icon class="base-icon" name="add-button"></svg-icon>
     </NuxtLink>
      <div
         class="title-box d-flex align-items-center justify-content-between"
         v-b-toggle.collapse-lockers
      >
         <h4 class="title p-3">
            {{ $t("dashboard.list.lockers") }}
         </h4>
         <span class="when-opened mr-5">
            <svg-icon class="base-icon" name="up-chevron"></svg-icon>
         </span>
      </div>
      <b-collapse visible id="collapse-lockers">
         <b-table-simple responsive class="w-100 office-page-table mb-0">
            <b-thead>
               <b-tr>
                  <b-th>{{ $t("dashboard.fields.size") }}</b-th>
                  <b-th>{{ $t("dashboard.form.count") }}</b-th>
                  <b-th>{{ $t("dashboard.fields.priceHour") }}</b-th>
                  <b-th>{{ $t("dashboard.fields.priceDay") }}</b-th>
                  <b-th>{{ $t("dashboard.fields.workingStatus") }}</b-th>
                  <b-th>{{ $t("dashboard.fields.createdAt") }} </b-th>
                  <b-th v-if="!admin">{{ $t("dashboard.fields.actions") }}</b-th>
               </b-tr>
            </b-thead>
            <b-tbody>
               <b-tr :key="locker.id" v-for="locker in branch.lockers">
                  <b-td>{{locker.size.name | getTransValue($i18n.locale) }}</b-td>
                  <b-td>{{ locker.count }}</b-td>
                  <b-td>{{ locker.price_per_hour }}</b-td>
                  <b-td>{{ locker.price_per_day }}</b-td>
                  <b-td class="working-status">
                     <span v-if="locker.working_status === 1">Open</span>
                     <span v-else>Close</span>
                  </b-td>
                  <b-td>{{ locker.created_at | changeDataFormat }}</b-td>

                  <b-td v-if="!admin"  class="edit-cell">
<!--                     <NuxtLink :to="`/office/lockers/${locker.id}`">-->

                     <NuxtLink :to="{ name: 'office-lockers-id___en', params: {id: locker.id, currency: currency}}">
<!--                     <NuxtLink :to="{ path: `/office/lockers/${locker.id}` }">-->
                        <svg-icon class="base-icon" name="edit"></svg-icon>
                     </NuxtLink>
                  </b-td>
               </b-tr>
            </b-tbody>
         </b-table-simple>
      </b-collapse>
   </div>
</template>

<script>
import moment from "moment"
export default {
   name: "lockers-card",
   props: ["branch", "admin", "lockers"],
    data(){
       return {
           currency: 'EUR'
       }
    },
    mounted() {
       if(this.branch.business.currency){
           this.currency = this.branch.business.currency;
       }
    },
    filters: {
      getTransValue(val, lang) {
         return val[lang]
      },
      changeDataFormat(val) {
         const date = moment(val).format("DD/MM/YYYY")
         return date.toString()
      }
   },
}
</script>

<style scoped></style>
