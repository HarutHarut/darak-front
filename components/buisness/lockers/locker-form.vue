<template>
   <div>
      <validation-observer
         ref="lockersAdd"
         v-slot="{ handleSubmit }"
         class="observer"
      >
         <b-form
            action="#"
            method="post"
            class="p-3"
            @submit.stop.prevent="handleSubmit(submit)"
         >
            <b-row>
               <b-col sm="6">
                  <div class="mb-3">
                     <p class="mb-2">
                        {{ $t("dashboard.fields.size") }}
                        <span v-b-tooltip.hover :title="$t('dashboard.tooltip.size')" class="ml-2">
                           <svg-icon class="base-icon" name="question-mark"></svg-icon>
                        </span>
                     </p>
                     <validation-provider
                        style="width: 100%"
                        v-slot="validationContext"
                        :rules="{ required: true }"
                        name="Size"
                     >
                        <b-form-select v-model="form.size_id" class="mb-3" :disabled="allSizes">
                           <b-form-select-option
                              v-for="size in sizes"
                              :value="size.id"
                              :key="size.id"
                           >
                              {{ size.name | getTransValue($i18n.locale) }}
                           </b-form-select-option>
                        </b-form-select>
                        <p class="error-text" v-if="errors.size_id">
                           {{ errors.size_id[0] }}
                        </p>
                     </validation-provider>
                  </div>
               </b-col>

               <b-col sm="6">
                  <b-form-group
                     :label="$t('dashboard.form.count')"
                     label-for="input-2"
                     class="d-flex mb-0"
                  >
                  <span v-b-tooltip.hover :title="$t('dashboard.tooltip.count')" class="ml-2">
                     <svg-icon class="base-icon" name="question-mark"></svg-icon>
                  </span>
                  </b-form-group>
                  <validation-provider
                  v-slot="validationContext"
                  :rules="{ required: true, integer: true }"
                  style="width: 100%"
                  name="count"
               >
                  <b-form-input
                     v-model="form.count"
                     type="number"
                     placeholder=""
                  ></b-form-input>
                  <p class="error-text" v-if="errors.count">
                     {{ errors.count[0] }}
                  </p>
               </validation-provider>
               </b-col>

               <b-col sm="6">
                  <validation-provider
                     style="width: 100%"
                     :rules="{ integer: true }"
                     name="price per hour"
                  >
                     <b-form-group
                        :label="$t('dashboard.fields.pricePerDay')"
                        label-for="input-3"
                        description=""
                        class="d-flex mb-0"
                     >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.pricePerDay')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                     </b-form-group>
                     <div class="input-box">
                        <span class="input-text">{{ currency }}</span>
                        <b-form-input
                           id="input-3"
                           type="number"
                           v-model="form.price_per_day"
                        ></b-form-input>
                     </div>
                     <p class="error-text" v-if="errors.price_per_day">
                        {{ errors.price_per_day[0] }}
                     </p>
                  </validation-provider>
               </b-col>

               <b-col sm="6">
                  <validation-provider
                     style="width: 100%"
                     :rules="{ integer: true }"
                     name="price per hour"
                  >
                     <b-form-group
                        :label="$t('dashboard.fields.pricePerHour')"
                        label-for="input-4"
                        description=""
                        class="d-flex mb-0"
                     >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.pricePerHour')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                     </b-form-group>
                     <div class="input-box">
                        <span class="input-text">{{ currency }}</span>
                        <b-form-input
                           id="input-4"
                           type="number"
                           v-model="form.price_per_hour"
                        ></b-form-input>
                     </div>
                     <p class="error-text" v-if="errors.price_per_hour">
                        {{ errors.price_per_hour[0] }}
                     </p>
                  </validation-provider>
               </b-col>

            </b-row>

            <b-row>
               <b-col class="pt-3">
                  <button
                     type="button"
                     class="btn-add ml-auto addLockerPrice"
                     @click="addPrice"
                  >
                     <svg-icon class="base-icon" name="add-button"></svg-icon>
                  </button>
                  <h3 class="">
                     {{ $t("dashboard.fields.lockersPricePackages") }}
                  </h3>

                  <b-table-simple responsive class="w-100 office-page-table">
                     <b-thead>
                        <b-tr>
                           <b-th>{{ $t("dashboard.fields.id") }}</b-th>
                           <b-th>{{ $t("dashboard.fields.startTime") }}                     
                              <span v-b-tooltip.hover :title="$t('dashboard.tooltip.startTime')" class="ml-2">
                                 <svg-icon class="base-icon" name="question-mark"></svg-icon>
                              </span>
                           </b-th>
                           <b-th>{{ $t("dashboard.fields.endTime") }}
                              <span v-b-tooltip.hover :title="$t('dashboard.tooltip.endTime')" class="ml-2">
                                 <svg-icon class="base-icon" name="question-mark"></svg-icon>
                              </span>
                           </b-th>
                           <b-th>{{ $t("dashboard.fields.Price") }}
                              <span v-b-tooltip.hover :title="$t('dashboard.tooltip.price')" class="ml-2">
                                 <svg-icon class="base-icon" name="question-mark"></svg-icon>
                              </span>
                           </b-th>
                           <b-th></b-th>
                        </b-tr>
                     </b-thead>
                     <b-tbody>
                        <b-tr :key="index" v-for="(price, index) in prices">
                           <b-td class="position-relative align-middle">
                              {{ index + 1 }}
                           </b-td>
                           <b-td>
                              <validation-provider
                                 style="width: 100%"
                                 :rules="{ required: true }"
                                 name="Start time"
                              >
                                 <b-form-input
                                    id="input-4"
                                    type="number"
                                    v-model="price.range_start"
                                 ></b-form-input>
                              </validation-provider>
                           </b-td>
                           <b-td>
                              <validation-provider
                                 style="width: 100%"
                                 v-slot="validationContext"
                                 :rules="{ required: true }"
                                 name="End time"
                              >
                                 <b-form-input
                                    id="input-4"
                                    type="number"
                                    v-model="price.range_end"
                                 ></b-form-input>
                              </validation-provider>
                           </b-td>
                           <b-td>
                              <div class="input-box">
                                 <validation-provider
                                    style="width: 100%"
                                    :rules="{ required: true }"
                                    name="Price"
                                 >
                                    <span class="input-text">{{ currency }}</span>
                                    <b-form-input
                                       id="input-6"
                                       type="number"
                                       v-model="price.price"
                                    ></b-form-input>
                                 </validation-provider>
                              </div>
                           </b-td>
                           <b-td class="remove-package-icon">
                              <button @click="removePrice">
                                 <svg-icon class="base-icon" name="close" />
                              </button>
                           </b-td>
                        </b-tr>
                     </b-tbody>
                  </b-table-simple>
               </b-col>

               <b-col cols="12">
                  <p class="error-text" v-if="errors.prices">
                     {{ errors.prices[0] }}
                  </p>
               </b-col>

            </b-row>

            <div class="text-center">
               <button @click="submit(1)" type="button" class="btn btn-blue btn-form mb-2">
                  {{ $t("dashboard.btn.submit") }}
               </button>
               <button v-if="!saveNew" @click="submit(2)" type="button" class="btn btn-blue btn-form mb-2">
                  {{ $t("dashboard.btn.saveAndNew") }}
               </button>
            </div>
         </b-form>
      </validation-observer>
   </div>
</template>
<script>
export default {
   name: "locker-form",
   props: ["form", "prices", "transError", "errors", "priceError", 'branchData', 'currency', 'branch', 'saveNew', 'allSizes'],
   data() {
      return {
         sizes: [],
         branches: [],
         business_id: null,
      };
   },
   watch: {
      errors: function() {
         this.$refs.lockersAdd.setErrors(this.errors);
      }
   },
   methods: {
      submit(ev) {
         this.$emit("submit", { ...this.form, prices: this.prices, type: ev });
      },
      getSizesList() {
        let url = "/sizes/list";
        if(this.business_id) {
          url += "?business_id=" + this.business_id + "&branch_id=" + this.form.branch_id + "&allSizes=" + this.allSizes;
        }else{
           url += "?branch_id=" + this.form.branch_id + "&allSizes=" + this.allSizes;
        }
         this.$axios
            .get(url)
            .then(({ data }) => {
               this.sizes = data.sizes;
            })
            .finally(() => {
            });
      },
      addPrice() {
         this.prices.push({
            range_start: null,
            range_end: null,
            price: null
         });
      },
      removePrice() {
         this.prices.pop();
      },
   },
   mounted() {
     this.getSizesList();
     if(this.$props.branchData) {
       const data = this.$props.branchData;
       this.business_id = data['business']['id'];
       this.branches.push({
         id: data.id,
         name: data.name.en
       })
       this.form.branch_id = data.id
     }
   },
   filters: {
      getTransValue(val, lang) {
         return val[lang];
      }
   }
};
</script>