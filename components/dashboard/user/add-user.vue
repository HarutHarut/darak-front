<template>
   <b-modal
      hide-footer
      id="modal-users"
      size="lg"
      :title="$t('dashboard.edit.user')"
   >
      <b-container>
         <div class="form-box">
            <validation-observer
               ref="loginForm"
               v-slot="{ handleSubmit }"
               class="observer"
            >
               <b-form
                  action="#"
                  method="post"
                  @submit.stop.prevent="handleSubmit(submit)"
               >
                  <b-row>
                     <b-col sm="6">
                        <b-form-group
                           :label="$t('dashboard.fields.name')"
                           label-for="input-1"
                        >
                           <validation-provider
                              style="width: 100%"
                              v-slot="validationContext"
                              :rules="{ required: true, max: 255 }"
                              name="name"
                           >
                              <b-form-input
                                 id="email"
                                 v-model="userProp.name"
                                 :placeholder="$t('dashboard.fields.name')"
                                 class="form-input"
                                 name="name"
                              ></b-form-input>
                              <p class="error-text">
                                 {{ validationContext.errors[0] }}
                              </p>
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                     <b-col sm="6">
                        <b-form-group
                           :label="$t('dashboard.fields.lastName')"
                           label-for="input-1"
                        >
                           <validation-provider
                              style="width: 100%"
                              v-slot="validationContext"
                              :rules="{ required: true, max: 255 }"
                              name="name"
                           >
                              <b-form-input
                                 id="email"
                                 v-model="userProp.last_name"
                                 :placeholder="$t('dashboard.fields.lastName')"
                                 class="form-input"
                                 name="name"
                              ></b-form-input>
                              <p class="error-text">
                                 {{ validationContext.errors[0] }}
                              </p>
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                     <b-col sm="6">
                        <b-form-group
                           :label="$t('dashboard.fields.email')"
                           label-for="input-2"
                        >
                           <validation-provider
                              style="width: 100%"
                              v-slot="validationContext"
                              :rules="{ required: true, email: true, max: 255 }"
                              name="email"
                           >
                              <b-form-input
                                 id="email"
                                 v-model="userProp.email"
                                 :placeholder="$t('dashboard.fields.email')"
                                 class="form-input"
                                 name="email"
                              ></b-form-input>
                              <p class="error-text">
                                 {{ validationContext.errors[0] }}
                              </p>
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                     <input type="hidden" name="id" :value="userProp.id"/>
                  </b-row>
                  <button type="submit" class="btn btn-blue btn-form mb-2 mr-2">
                     {{ $t("dashboard.btn.submit") }}
                  </button>
                  <button @click="$bvModal.hide('modal-users')" type="button" class="btn btn-color btn-form mb-2">
                     {{ $t("dashboard.btn.cancel") }}
                  </button>
               </b-form>
            </validation-observer>
         </div>
      </b-container>
   </b-modal>
</template>

<script>

import VuePhoneNumberInput from 'vue-phone-number-input'

export default {
   name: "add-user",
   props: ['userProp'],
   components: {
      VuePhoneNumberInput
   },
   data() {
      return {
         options: [
            { text: "Yes", value: true },
            { text: "No", value: false }
         ],
         translations: {
            example: this.$t("phoneNumber.example"),
            countrySelectorLabel: this.$t("phoneNumber.countrySelectorLabel"),
            countrySelectorError: this.$t("phoneNumber.countrySelectorError"),
         },
      }
   },
   methods: {
      submit() {
         this.$emit('submit', this.userProp)
      }
   }
}
</script>

<style scoped></style>
