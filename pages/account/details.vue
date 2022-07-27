<template>
   <section class="account-details-section">
      <h2 class="title-primary">{{ $t("list.accountDetails") }}</h2>
      <h3 class="title-primary text-success" v-if="success">{{massage}}</h3>
      <b-form action="" method="post" v-if="show">
         <b-row v-if="loading">
            <b-col md="4">
               <div class="form-group">
                  <label for="password">{{ $t("form.input.name") }}</label>
                  <input type="text" v-model="user.name" id="password" name="password"
                         class="form-control" :class="{ 'is-invalid': submitted && $v.user.name.$error }" />
                  <div v-if="submitted && $v.user.name.$error" class="invalid-feedback">
                     <span v-if="!$v.user.name.required">{{ $t("form.input.NameIsRequired") }}</span>
                     <span v-if="!$v.user.name.minLength">{{ $t("form.input.NameMustBeAtLeast") }}</span>
                  </div>
               </div>
            </b-col>
            <b-col md="4">
               <div class="form-group">
                  <label for="password">{{ $t("form.input.lastName") }}</label>
                  <input type="text" v-model="user.last_name" id="password" name="password"
                         class="form-control" :class="{ 'is-invalid': submitted && $v.user.last_name.$error }" />
                  <div v-if="submitted && $v.user.last_name.$error" class="invalid-feedback">
                     <span v-if="!$v.user.last_name.required">{{ $t("form.input.LastNameIsRequired") }}</span>
                     <span v-if="!$v.user.last_name.minLength">{{ $t("form.input.LastNameMustBeAtLeast") }}</span>
                  </div>
               </div>
            </b-col>
            <b-col md="4">
               <b-form-group
                  :label="$t('form.input.email')"
                  label-for="input-3"
               >
                  <b-form-input
                     disabled
                     id="input-3"
                     v-model="user.email"
                     type="email"
                     placeholder=""
                  ></b-form-input>
               </b-form-group>
            </b-col>
         </b-row>
         <button type="button" @click="onSubmit" class="btn btn-blue btn-form">{{ $t("form.btn.save") }}</button>
<!--         <button type="button" @click="onReset" class="btn btn-color btn-form">{{ $t("form.btn.cancel") }}</button>-->
      </b-form>
   </section>
</template>

<script>
import useValidate from "@vuelidate/core"
import { minLength, required, sameAs } from "vuelidate/lib/validators"

export default {
   data() {
      return {
         user: {},
         show: true,
         loading: false,
         v$: useValidate(),
         submitted: false,
         success: false,
         massage: '',
      }
   },
   validations: {
      user: {
         name: { required },
         last_name: { required }
      }
   },
   methods: {
      onSubmit(event) {
         console.log(123123)
         this.submitted = true
         this.$v.$touch()
         if (!this.$v.$invalid) {
            const data = {
               name: this.user.name,
               last_name: this.user.last_name
            }
               this.$axios.post('/profile/update', data).then((res) => {
                 this.$bvToast.toast("Update successfully.", {
                   title: `Update successfully`,
                   variant: "success",
                   solid: true
                 })
               })
         }
      },
      onReset(event) {
         event.preventDefault()
         // Reset form values
         this.form.firstName = ""
         this.form.lastName = ""
         this.form.email = ""
         this.form.tel = ""
         this.form.password = ""
         this.form.checked = []
         // Trick to reset/clear native browser form validation state
         this.show = false
         this.$nextTick(() => {
            this.show = true
         })
      }
   },
   mounted() {
      this.$axios.get("/user").then((res) => {
         this.user = res.data
         this.loading = true
         this.oldFullName = res.data.name
      })
   }
}
</script>