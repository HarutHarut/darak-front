<template>
  <div class="tab-content px-3 py-4 scrollbar">
    <validation-observer ref="loginForm" v-slot="{ handleSubmit }" class="observer">
      <form v-if="!showForgot" autocomplete="on" class="author-form" @submit.stop.prevent="handleSubmit(login)">
        <div class="form-group">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="envelope"/>
            <b-form-input
                id="email"
                v-model="form.email"
                :placeholder="$t('form.input.email') + '*'"
                class="form-input"
                name="email"
            ></b-form-input>
            <p class="error-text" v-if="errorResponce.email">{{ errorResponce.email }}</p>
          </div>
        </div>
        <div class="form-group">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="lock"/>
            <b-form-input
                id="password"
                v-model="form.password"
                :placeholder="$t('form.input.password') + '*'"
                class="form-input"
                name="password"
                :type="showPassword ? 'text' : 'password'"
            ></b-form-input>
            <p class="error-text" v-if="errorResponce.password">{{ errorResponce.password }}</p>
            <svg-icon class="sm-icon eye-icon" @click="showPassword = !showPassword" name="eye-slash" v-if="showPassword == false" />
            <svg-icon class="sm-icon eye-icon" @click="showPassword = !showPassword" name="eye" v-else />
          </div>
        </div>

        <span role="button" class="forgot-password-link" @click="forgotFormShow" href="">{{ $t("form.forgotPassword") }}?</span>

        <button class="btn btn-blue btn-block" type="submit">{{ $t("form.signIn") }}</button>
        <div class="text-center">
          <span class="btn" @click="$bvModal.hide('modal-sign')">
          {{ $t("form.btn.cancel") }}
        </span>
        </div>
      </form>
      <form v-if="showForgot" autocomplete="on" class="author-form" @submit.stop.prevent="handleSubmit(forgot)">
            <div class="form-group">
            <div class="form-input-box">
                <svg-icon class="sm-icon" name="envelope"/>
                <b-form-input
                    id="emailForgot"
                    v-model="formForgot.emailForgot"
                    :placeholder="$t('form.input.email') + '*'"
                    class="form-input"
                    name="emailForgot"
                ></b-form-input>
                <p class="error-text" v-if="errorResponce.emailForgot">{{ errorResponce.emailForgot }}</p>
            </div>
            </div>
            <button class="btn btn-blue btn-block" type="submit">{{ $t("form.sendEmail") }}</button>
            <div class="text-center">
            <span class="btn" @click="$bvModal.hide('modal-sign')">
            {{ $t("form.btn.cancel") }}
            </span>
            </div>
        </form>


    </validation-observer>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      errors: {},
      errorResponce: {
        email: false,
        password: false,
        emailForgot: false,
      },
      form: {
        email: '',
        password: '',
      },
      formForgot: {
        emailForgot: ''
      },
        showForgot: false,
        showPassword: false
    }
  },
  methods: {
    getValidationState({dirty, validated, valid = null}) {
      return dirty || validated ? valid : null;
    },
    forgotFormShow(){
      this.showForgot = true;
    },
    forgot() {
      this.$axios.post("/forgot", {
            email: this.formForgot.emailForgot,
         })  
         .then(response => {
           this.$bvToast.toast('Checked your email.');
        })
    },
    async login() {
      this.$emit('loading', true);

      await this.$auth.loginWith('user', {
        url: `${this.$axios.defaults.baseURL}/login`,
        data: this.form
      }).then((res) => {
        const {user} = this.$auth;
        this.$bvModal.hide('modal-sign');
        switch (user.role.name) {
          case "user":
            this.$router.push('/account')
            break;
          case "business_owner":
              if(res.data.user.firstLogin == true){
                  this.$router.push('/office/create-business#next')
              }
              else{
                  this.$router.push('/office/branches')
              }
            // this.$router.push('/office/branches')
            break;
          case "admin":
            this.$router.push('/dashboard/business')
            break;
        }
      }).catch((error) => {
        this.$emit('loading', false);
        switch (error.response.status) {
          case 422:
            const {errors} = error.response.data;
            for (const prop in errors) {
              if (prop.search("email") > -1 ||
                  prop.search("password") > -1)
              {
                this.errorResponce[prop] = errors[prop][0]
              }
            }
            this.$refs.loginForm.setErrors(errors);
            break;
          case 403:
            this.$bvToast.toast(error.response.data.message, {
              title: `Login failed`,
              variant: 'danger',
              solid: true
            });
            break;
        }
      })
    }
  }
}
</script>