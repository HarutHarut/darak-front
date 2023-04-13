<template>
   <div class="base-card card mb-3">
      <div class="card-body">
         <h3 class="text-center">{{ branch.name |  getTransValue($i18n.locale) }}</h3>
         <ul class="card-list">
            <li class="d-flex justify-content-between" v-if="branch.phone">
               <p class="item-title">{{ $t("dashboard.fields.phone") }}</p>
               <p>{{ JSON.parse(branch.country_code).code +  branch.phone }}</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">{{ $t("dashboard.fields.city") }}</p>
               <p>{{ branch.city.name }}</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">{{$t('dashboard.fields.address')}}</p>
               <p class="text-right pl-3">{{ branch.address }}</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">{{ $t("dashboard.statuses.title") }}</p>
               <p v-if="branch.status === 1">{{ $t("dashboard.statuses.active") }}</p>
               <p v-else>{{ $t("dashboard.statuses.inActive") }}</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">
               {{ $t("dashboard.statuses.verified") }}</p>
               <p v-if="branch.working_status == 1">{{ $t("form.btn.Yes") }}</p>
               <p v-else>{{ $t("form.btn.No") }}</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">
               {{ $t("dashboard.fields.createdAt") }}</p>
               <p>{{branch.created_at | changeDataFormat}}</p>
            </li>
         </ul>
         <NuxtLink v-if="admin" :to="prepareUrl('/dashboard/branches/edit/' + branch.slug)" class="btn btn-color btn-edit pt-1">
            <svg-icon class="base-icon" name="edit"></svg-icon>
         </NuxtLink>
        <NuxtLink v-else :to="prepareUrl(`/office/branches/edit/${branch.slug}`)" class="btn btn-color btn-edit pt-1">
          <svg-icon class="base-icon" name="edit"></svg-icon>
        </NuxtLink>
      </div>
   </div>
</template>

<script>
import moment from "moment";
import global from "~/mixins/global.js"

export default {
   mixins: [global],
   name: "branch-card",
   props: ['branch', 'admin'],
   filters: {
      changeDataFormat(val) {
         const date = moment(val).format("DD/MM/YYYY")
         return date.toString()
      },

      getTransValue(val, lang) {
         return val[lang]
      }
   }
};
</script>

<style scoped>

</style>