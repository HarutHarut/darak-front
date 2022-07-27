<template>
   <b-container>
      <div class="form-box ">
         <validation-observer ref="sizeForm" v-slot="{ handleSubmit }" class="observer">
            <b-form action="#" method="post" @submit.stop.prevent="handleSubmit(submit)">
               <b-row>
                  <b-col cols="6">
                     <b-form-group
                        label="Width"
                        label-for="input-2"
                        description="">
                        <validation-provider
                           v-slot="validationContext"
                           :rules="{ required: true}"
                           style="width: 100%"
                           name="width">
                           <b-form-input
                              v-model="form.width"
                              type="number"
                              placeholder=""
                           ></b-form-input>
                           <p class="error-text" v-if="errors.width">
                              {{ errors.width['0'] }}
                           </p>
                        </validation-provider>
                     </b-form-group>
                  </b-col>
                  <b-col cols="6">
                     <b-form-group
                        label="Length"
                        label-for="input-2"
                        description="">
                        <validation-provider
                           style="width: 100%"
                           v-slot="validationContext"
                           :rules="{ required: true,  max: 255}"
                           name="length">
                           <b-form-input
                              v-model="form.length"
                              type="number"
                              placeholder=""
                           ></b-form-input>
                           <p class="error-text" v-if="errors.length">
                              {{ errors.length['0'] }}
                           </p>
                        </validation-provider>
                     </b-form-group>
                  </b-col>
                  <b-col cols="6">
                     <b-form-group
                        label="Height"
                        label-for="input-2"
                        description=""
                     >
                        <validation-provider
                           style="width: 100%"
                           v-slot="validationContext"
                           :rules="{ required: true, max: 255}"
                           name="height">
                           <b-form-input
                              v-model="form.height"
                              type="number"
                              placeholder=""
                           ></b-form-input>
                           <p class="error-text" v-if="errors.height">
                              {{ errors.height['0'] }}
                           </p>
                        </validation-provider>
                     </b-form-group>
                  </b-col>
                  <b-col cols="6">
                     <b-form-group
                        label="Verified"
                        label-for="input-2"
                        description="">
                        <b-form-group >
                           <b-form-radio-group
                              id="radio-group-1"
                              v-model="form.verified"
                              :options="options"
                              name="radio-options"
                           ></b-form-radio-group>
                           <p class="error-text" v-if="errors.verified">
                              {{ errors.verified['0'] }}
                           </p>
                        </b-form-group>
                     </b-form-group>
                  </b-col>
                  <b-col cols="12">
                     <div>
                        <b-card no-body>
                           <b-tabs card>
                              <b-tab title="Eng" active>
                                 <b-form-group
                                         :label="$t('dashboard.fields.name')"
                                         label-for="input-1">
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.name.en"
                                            placeholder=""
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                         label="Description"
                                         label-for="branch-textarea">
                                    <b-form-textarea
                                            id="branch-textarea"
                                            v-model="form.desc.en"
                                            rows="4"
                                    ></b-form-textarea>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="Ру">
                                 <b-form-group
                                    :label="$t('dashboard.fields.name')"
                                    label-for="input-1">
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.ru"
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea">
                                    <b-form-textarea
                                       id="branch-textarea"
                                       rows="4"
                                       v-model="form.desc.ru"
                                    ></b-form-textarea>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="Fra">
                                 <b-form-group
                                    :label="$t('dashboard.fields.name')"
                                    label-for="input-1">
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.fr"
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea">
                                    <b-form-textarea
                                       id="branch-textarea"
                                       v-model="form.desc.fr"
                                       rows="4"
                                    ></b-form-textarea>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="中文">
                                 <b-form-group
                                    :label="$t('dashboard.fields.name')"
                                    label-for="input-1">
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.ch"
                                       placeholder=""
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea">
                                    <b-form-textarea
                                       id="branch-textarea"
                                       rows="4"
                                       v-model="form.desc.ch"
                                    ></b-form-textarea>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="Հայ">
                                 <b-form-group
                                    :label="$t('dashboard.fields.name')"
                                    label-for="input-1" >
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.am"
                                       placeholder=""
                                    ></b-form-input>
                                 </b-form-group>
                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea">
                                    <b-form-textarea
                                       id="branch-textarea"
                                       rows="4"
                                       v-model="form.desc.am"
                                    ></b-form-textarea>

                                 </b-form-group>

                              </b-tab>
                              <p class="error-text" v-if="errors.name">
                                 {{ errors.name['0'] }}
                              </p>
                              <p class="error-text" v-if="errors.desc">
                                 {{ errors.desc['0'] }}
                              </p>
                           </b-tabs>
                        </b-card>
                     </div>
                  </b-col>

               </b-row>
               <div class="text-center p-2">
                  <button type="submit" class="btn btn-blue btn-form">
                     {{ $t("dashboard.btn.submit") }}
                  </button>
               </div>
            </b-form>
         </validation-observer>
      </div>
   </b-container>
</template>

<script>
export default {
   name: "form-size",
   props: ["branches", "translationFieldsError", "formData", "errors"],
   data() {
      return {
         // errors: {},
         form: {
            height: null,
            width: null,
            length: null,
            name: {},
            desc: {},
            branch_id: null
         },
         options: [
            { text: 'Yes', value: 1 },
            { text: 'No', value: 0 },
         ]
      }
   },
   filters: {
      getTransValue(val, lang) {
         return val[lang];
      }
   },
   methods: {
      submit() {
         this.$emit('submit', this.form)
      }
   },
   mounted() {
      if(this.formData){
         this.form = JSON.parse(JSON.stringify(this.formData))

      }
      console.log(this.form.desc['en'], 'eqwrqewrqwe')
   }

};
</script>