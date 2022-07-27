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
               <p class="item-title">Address</p>
               <p class="text-right pl-3">{{ branch.address }}</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">{{ $t("dashboard.statuses.title") }}</p>
               <p v-if="branch.status === 1">Active</p>
               <p v-else>Inactive</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">
               {{ $t("dashboard.statuses.verified") }}</p>
               <p v-if="branch.working_status == 1">Yes</p>
               <p v-else>No</p>
            </li>
            <li class="d-flex justify-content-between">
               <p class="item-title">
               {{ $t("dashboard.fields.createdAt") }}</p>
               <p>{{branch.created_at | changeDataFormat}}</p>
            </li>
         </ul>
         <NuxtLink v-if="admin" :to="`/dashboard/branches/edit/${branch.slug}`" class="btn btn-color btn-edit pt-1">
            <svg-icon class="base-icon" name="edit"></svg-icon>
         </NuxtLink>
        <NuxtLink v-else :to="`/office/branches/edit/${branch.slug}`" class="btn btn-color btn-edit pt-1">
          <svg-icon class="base-icon" name="edit"></svg-icon>
        </NuxtLink>
      </div>
   </div>
</template>

<script>
import moment from "moment";

export default {
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