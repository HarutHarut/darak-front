<template>
   <b-container>
      <div class="form-box">
         <validation-observer ref="sizeForm" v-slot="{ handleSubmit }" class="observer">

            <b-form action="#" method="post" @submit.stop.prevent="handleSubmit(submit)">
               <b-row>
                  <b-col cols="6">
                     <b-form-group
                        label="Width"
                        label-for="input-2"
                        name = 'width'
                        @change="onChange($event)"
                        description=""
                     >
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
                        description=""
                        name = 'length'
                        @change="onChange($event)"
                     >
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
                        name = 'height'
                        @change="onChange($event)"
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
                  <b-col cols="12">
                     <div>
                        <b-card no-body>
                           <b-tabs card>
                              <b-tab title="Eng" active>
                                 <b-form-group
                                    :label="$t('dashboard.fields.name')"
                                    label-for="input-1"
                                 >
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.en"
                                       placeholder=""
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea"
                                 >
                                    <b-form-textarea
                                       id="branch-textarea"
                                       v-model="form.desc.en"
                                       rows="4"
                                    ></b-form-textarea>
                                 </b-form-group>
                              </b-tab>

                             <b-tab title="Рус">
                               <b-form-group
                                   :label="$t('dashboard.fields.name')"
                                   label-for="input-1"
                               >
                                 <b-form-input
                                     id="input-1"
                                     v-model="form.name.ru"
                                 ></b-form-input>
                               </b-form-group>

                               <b-form-group
                                   label="Description"
                                   label-for="branch-textarea"
                               >
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
                                    label-for="input-1"
                                 >
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.fr"
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea"
                                 >
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
                                    label-for="input-1"
                                 >
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.ch"
                                       placeholder=""
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea"
                                 >
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
                                    label-for="input-1"
                                 >
                                    <b-form-input
                                       id="input-1"
                                       v-model="form.name.am"
                                       placeholder=""
                                    ></b-form-input>
                                 </b-form-group>
                                 <b-form-group
                                    label="Description"
                                    label-for="branch-textarea"
                                 >
                                    <b-form-textarea
                                       id="branch-textarea"
                                       rows="4"
                                       v-model="form.desc.am"
                                    ></b-form-textarea>
                                 </b-form-group>
                              </b-tab>
                           </b-tabs>
                        </b-card>
                     </div>
                  </b-col>
                  <p class="error-text">{{ translationFieldsError }}</p>

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
   props: ["branches","translationFieldsError","form", "errors"],
   filters: {
      getTransValue(val, lang) {
         return val[lang];
      }
   },
   methods: {
      submit() {

         const formData = new FormData()

         for (const prop in this.form) {
            if (prop === "name") {
               // append nested object
               for (let previewKey in this.form[prop]) {
                  formData.append(
                     `name[${previewKey}]`,
                     this.form[prop][previewKey]
                  )
               }
            } else if (prop === "desc") {
               for (let previewKey in this.form[prop]) {
                  formData.append(
                     `desc[${previewKey}]`,
                     this.form[prop][previewKey]
                  )
               }
            } else {
               formData.append(prop, this.form[prop])
            }
         }

         this.$emit('submit', formData)



      }

   }

};

</script>

<style scoped>

</style>