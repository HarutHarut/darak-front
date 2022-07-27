<template>
   <div>
      <section class="static-section">
         <div
            class="title-box d-flex align-items-center justify-content-between"
            v-b-toggle.collapse-calculate
         >
            <h4 class="title p-3">
               {{ $t("dashboard.title.calculatePrice") }}
            </h4>
            <span class="when-opened">
               <svg-icon class="base-icon" name="up-chevron"></svg-icon>
            </span>
         </div>
         <b-collapse visible id="collapse-calculate">
            <b-container>
               <div class="form-box py-5">
                  <validation-observer
                     ref="loginForm"
                     v-slot="{ handleSubmit }"
                     class="observer"
                  >
                     <b-form
                        action="#"
                        method="post"
                        @submit.stop.prevent="handleSubmit(calculate)"
                     >
                        <b-row>
                           <b-col sm="6">
                              <div class="mb-3">
                                 <p class="mb-2">
                                    Locker
                                 </p>
                                 <validation-provider
                                    v-slot="validationContext"
                                    :rules="{ required: true }"
                                    name="locker"
                                    style="width: 100%"
                                 >
                                    <b-form-select
                                       v-model="selectedLocker"
                                       class="mb-3"
                                    >
                                       <b-form-select-option :value="null"
                                          >Please select a
                                          locker</b-form-select-option
                                       >
                                       <b-form-select-option
                                          :value="locker.id"
                                          v-for="(locker) in lockers"
                                          :key="locker.id"
                                       >{{ locker.size.name | getTransValue($i18n.locale) }}</b-form-select-option
                                       >
                                    </b-form-select>
                                    <p class="error-text">{{ validationContext.errors[0] }}</p>
                                 </validation-provider>
                              </div>
                           </b-col>
                           <b-col sm="6">
                              <b-form-group
                                 :label="$t('dashboard.fields.totalTime')"
                                 label-for="input-1"
                                 description=""
                              >
                                 <validation-provider
                                    v-slot="validationContext"
                                    :rules="{ required: true }"
                                    name="total time"
                                    style="width: 100%"
                                 >
                                    <b-form-input
                                       id="input-1"
                                       v-model="totalTime"
                                    ></b-form-input>
                                    <p class="error-text">{{ validationContext.errors[0] }}</p>
                                 </validation-provider>
                              </b-form-group>
                           </b-col>
                           <b-col class="align-self-center" sm="6">
                              <button type="submit" class="btn-calculate">
                                 <span>{{$t("dashboard.title.calculate")}}</span>
                                 <span class="icon-box">
                                    <svg-icon
                                       class="sm-icon"
                                       name="next"
                                    ></svg-icon>
                                 </span>
                              </button>
                           </b-col>
                           <b-col sm="6">
                              <p class="mb-2">
                                 {{ $t("dashboard.fields.totalPrice") }}
                              </p>
                              <div class="input-box total-price">
                                 <div class="p-1 pl-2">{{ total }}</div>
                                 <span class="input-text">{{ currency }}</span>
                              </div>
                           </b-col>
                        </b-row>
                     </b-form>
                  </validation-observer>
               </div>
            </b-container>
         </b-collapse>
      </section>
   </div>
</template>

<script>
export default {
   name: "calculate-price",
   props: ["lockers", "currency"],
   data() {
      return {
         selectedLocker: null,
         totalTime:null,
         total: null
      }
   },
   methods: {
      calculate() {

         this.$axios
            .get("/book/calculate", {
               params:{
                  locker_id: this.selectedLocker,
                  time: this.totalTime
               }
            })
            .then(({ data:{price}}) => {

               this.total = price.total
            })
      }
   },
   filters: {
      getTransValue(val, lang) {
         return val[lang]
      },
   },
}
</script>

<style scoped></style>
