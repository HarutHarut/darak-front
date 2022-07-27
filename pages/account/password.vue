<template>
  <section class="account-details-section">
    <h2 class="title-primary">{{ $t("list.accountDetails") }}</h2>

    <form @submit.prevent="onSubmit">
      <b-row>
        <b-col md="6">
          <div class="form-group">
            <label for="password">{{$t('form.input.password')}}</label>
            <input type="password" v-model="password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.password.$error }" />
            <div v-if="submitted && $v.password.$error" class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required</span>
              <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
            </div>
          </div>
        </b-col>
        <b-col md="6">
      <div class="form-group">
        <label for="confirmPassword">{{$t('form.input.rePassword')}}</label>
        <input type="password" v-model="confirm" id="confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': submitted && $v.confirm.$error }" />
        <div v-if="submitted && $v.confirm.$error" class="invalid-feedback">
          <span v-if="!$v.confirm.required">Confirm Password is required</span>
          <span v-else-if="!$v.confirm.sameAsPassword">Passwords must match</span>
        </div>
      </div>
        </b-col>
      </b-row>
      <div class="form-group">
        <button class="btn btn-primary">Change Password</button>
      </div>
    </form>



  </section>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      submitted: false,
      password: "",
      confirm: ""
    }
  },
  validations: {
      password: {required, minLength: minLength(6)},
      confirm: {required, sameAsPassword: sameAs('password')}
  },
  methods: {
    onSubmit(event) {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
         const data = {
            password: this.password
         }
        this.$axios.post('/profile/change-password', data).then((res) => {
           if(res.status === 200) {
              this.$auth.logout()
           }
        })
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset form values
      this.form.password = ''
      this.form.rePassword = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
}
</script>