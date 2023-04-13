<template>
   <b-container>
      <div class="form-box my-2">
         <b-form action="#" method="post" @submit.stop.prevent="submit">
            <b-row>
               <b-col>
                  <b-form-group>
                     <b-row
                        class="align-items-center mb-3"
                        v-for="(day, index) in formData"
                        v-bind:key="index"
                     >
                        <b-col class="mb-2">
                           <b-form-checkbox
                              v-model="day.status"
                           >
                              {{ getDayName(day.weekday) }}
                           </b-form-checkbox>
                        </b-col>
                        <b-col>
                           <b-form-select
                              v-model="day.start"
                           >
                              <template v-for="(item, index) in optionsTime">
                                 <b-select-option
                                         v-if="index != (optionsTime.length - 1)"
                                         :key="index"
                                         :value="item.value"
                                 >
                                    {{ item.text }}
                                 </b-select-option>
                              </template>
                           </b-form-select>
                        </b-col>
                        <b-col>
                           <b-form-select
                              v-model="day.end"
                           >
                              <template v-for="(item, index) in optionsTime">
                              <b-select-option
                                      v-if="index && item.value > day.start"
                                      :key="index"
                                      :value="item.value"
                              >
                                 {{ item.text }}
                              </b-select-option>
                              </template>
                           </b-form-select>
                        </b-col>
                     </b-row>
                  </b-form-group>
               </b-col>
            </b-row>
            <button type="submit" class="btn btn-blue btn-form mb-2">
               {{ $t("dashboard.btn.submit") }}
            </button>
            <button v-if="nextButtonShow" type="button"  @click="openingNext"  class="btn btn-success btn-form float-right">
               {{ $t("dashboard.btn.openingHoursNext") }}
            </button>
         </b-form>
      </div>
   </b-container>
</template>

<script>
export default {
   name: "working-hours",
   props: ["form"],
   data() {
      return {
         nextButtonShow: false,
         optionsTime: [
            { value: "00:00:00", text: "00:00" },
            { value: "01:00:00", text: "01:00" },
            { value: "02:00:00", text: "02:00" },
            { value: "03:00:00", text: "03:00" },
            { value: "04:00:00", text: "04:00" },
            { value: "05:00:00", text: "05:00" },
            { value: "06:00:00", text: "06:00" },
            { value: "07:00:00", text: "07:00" },
            { value: "08:00:00", text: "08:00" },
            { value: "09:00:00", text: "09:00" },
            { value: "10:00:00", text: "10:00" },
            { value: "11:00:00", text: "11:00" },
            { value: "12:00:00", text: "12:00" },
            { value: "13:00:00", text: "13:00" },
            { value: "14:00:00", text: "14:00" },
            { value: "15:00:00", text: "15:00" },
            { value: "16:00:00", text: "16:00" },
            { value: "17:00:00", text: "17:00" },
            { value: "18:00:00", text: "18:00" },
            { value: "19:00:00", text: "19:00" },
            { value: "20:00:00", text: "20:00" },
            { value: "21:00:00", text: "21:00" },
            { value: "22:00:00", text: "22:00" },
            { value: "23:00:00", text: "23:00" },
            { value: "24:00:00", text: "23:59" }
         ],
         openTimeForm: [
            {
               weekday: 1,
               start: "00:00:00",
               end: "24:00:00",
               status: true
            },
            {
               weekday: 2,
               start: "00:00:00",
               end: "24:00:00",
               status: true
            },
            {
               weekday: 3,
               start: "00:00:00",
               end: "24:00:00",
               status: true
            },
            {
               weekday: 4,
               start: "00:00:00",
               end: "24:00:00",
               status: true
            },
            {
               weekday: 5,
               start: "00:00:00",
               end: "24:00:00",
               status: true
            },
            {
               weekday: 6,
               start: "00:00:00",
               end: "24:00:00",
               status: true
            },
            {
               weekday: 7,
               start: "00:00:00",
               end: "24:00:00",
               status: true
            }
         ],
         formData: []
      }
   },
   methods: {
      submit() {
         this.$emit("submit", this.formData)
      },
      openingNext() {
         this.$emit("openingNext", this.formData, 1)
      },
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
   mounted() {
      let url = window.location.href;
      if (this.form.length) {
         this.formData = JSON.parse(JSON.stringify(this.form))

         this.formData = this.formData.map(item => {
            return {
               ...item,
               status: item.status === 1
            }
         })
      } else {
         this.formData = this.openTimeForm
      }
      if (url.includes('#')){
         this.nextButtonShow = true;
      }
   }
}
</script>

<style scoped></style>
