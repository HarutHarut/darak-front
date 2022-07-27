<template>
   <ul class="card-list p-3">
      <li class="d-flex justify-content-between" v-for="time in times">
         <p class="item-title">
            {{ getDayName(time.weekday) }}
         </p>
         <p v-if="time.status === 1">
            {{ time.start | changeTimeFormat }} -
            {{ time.end | changeTimeFormat }}
         </p>
         <p v-else>Closed</p>
      </li>
   </ul>
</template>
<script>
import moment from "moment"
export default {
   name: "opening-hours-card",
   props: ["times"],
   methods: {
      getDayName(day) {
         switch (day) {
            case 1:
               return this.$t("dashboard.day.monday")

            case 2:
               return this.$t("dashboard.day.tuesday")

            case 3:
               return this.$t("dashboard.day.wednesday")

            case 4:
               return this.$t("dashboard.day.thursday")

            case 5:
               return this.$t("dashboard.day.friday")

            case 6:
               return this.$t("dashboard.day.saturday")

            case 7:
               return this.$t("dashboard.day.sunday")
         }
      }
   },
   filters: {
      changeTimeFormat(val) {
         return moment(val, ["h:mm"]).format("HH:mm")
      }
   }
}
</script>

<style scoped></style>
