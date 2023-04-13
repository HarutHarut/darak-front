<template>
   <div>
<!--      <NuxtLink v-if="admin" :to="{ name: 'dashboard-lockers-add___en', params: branch}" class="btn-add ml-auto">-->
<!--         <svg-icon class="base-icon" name="add-button"></svg-icon>-->
<!--      </NuxtLink>-->


      <div
         class="title-box d-flex align-items-center justify-content-between"
         v-b-toggle.collapse-lockers
      >
         <h4 class="title p-3">
            {{ $t("dashboard.list.lockers") }}
         </h4>
         <div class="d-flex align-items-center"> 
            <span class="when-opened mr-4">
               <svg-icon class="base-icon" name="up-chevron"></svg-icon>
            </span>
            <NuxtLink v-if="admin" :to="{ name: 'dashboard-lockers-add___' + getLocale(), params: branch}" class="btn-add position-relative top-0">
               {{ $t("dashboard.add.price") }}
            </NuxtLink>

            <NuxtLink v-else :to="{ name: 'office-lockers-add___' + getLocale(), params: branch}" class="btn-add position-relative top-0">
               {{ $t("dashboard.add.price") }}
            </NuxtLink>
         </div>
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
<!--                  <b-th v-if="!admin">{{ $t("dashboard.fields.actions") }}</b-th>-->
                  <b-th>{{ $t("dashboard.fields.actions") }}</b-th>
               </b-tr>
            </b-thead>
            <b-tbody>
               <b-tr :key="locker.id" v-for="locker in branch.lockers">
                  <b-td>{{locker.size.name | getTransValue($i18n.locale) }}</b-td>
                  <b-td>{{ locker.count }}</b-td>
                  <b-td>{{ locker.price_per_hour }}</b-td>
                  <b-td>{{ locker.price_per_day }}</b-td>
                  <b-td class="working-status">
                     <span v-if="locker.working_status === 1">{{$t('dashboard.statuses.open')}}</span>
                     <span v-else>{{$t('dashboard.fields.closed')}}</span>
                  </b-td>
                  <b-td>{{ locker.created_at | changeDataFormat }}</b-td>

                  <b-td class="edit-cell">
<!--                     <NuxtLink :to="`/office/lockers/${locker.id}`">-->


                     <NuxtLink v-if="admin" :to="{ name: 'dashboard-lockers-id___' + getLocale(), params: {id: locker.id, currency: currency}}">
                         <svg-icon class="base-icon" name="edit"></svg-icon>
                     </NuxtLink>
                     <NuxtLink v-else :to="{ name: 'office-lockers-id___'  + getLocale(), params: {id: locker.id, currency: currency}}">
                        <svg-icon class="base-icon" name="edit"></svg-icon>
                     </NuxtLink>
                          <button @click="removeLocker(locker.id)">
                              <svg-icon class="base-icon" name="close" />
                          </button>
                  </b-td>
               </b-tr>
            </b-tbody>
         </b-table-simple>
      </b-collapse>
   </div>
</template>

<script>
import moment from "moment"
import global from "~/mixins/global.js"
export default {
   name: "lockers-card",
   mixins: [global],
   props: ["branch", "admin", "lockers"],
    data(){
       return {
           currency: 'EUR'
       }
    },
    mounted() {
      console.log('this.$i18n.locale', this.$i18n.locale)
       if(this.branch.business.currency){
           this.currency = this.branch.business.currency;
       }
    },
    methods:{
      getLocale(){
         return this.$i18n.locale
      },
        removeLocker(locker_id){
            this.$axios
                .post("/lockers/remove-locker", {
                    locker_id: locker_id,
                })
                .then((data) => {
                    this.$bvToast.toast(this.$t("lockers.deletedSuccess"), {
                        // title: `Opening hours`,
                        variant: "success",
                        solid: true
                    })
                    window.location.reload();
                })
                .catch((response) => {
                    this.$bvToast.toast(this.$t('lockers.deletedFiled'), {
                        // title: `Opening hours`,
                        variant: "danger",
                        solid: true
                    })
                    console.log(response, 'catch')
                })
            console.log(locker_id)
        },
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
