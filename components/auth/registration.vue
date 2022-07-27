<template>
  <div class="tab-content px-3 py-4 scrollbar">
    <validation-observer ref="observer" v-slot="{ handleSubmit }" class="observer">
      <form action="#" autocomplete="on" class="author-form" method="post"
            @submit.stop.prevent="handleSubmit(registration)">
        <div class="form-group ">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="user"/>
            <b-form-input
                id="name"
                v-model="form.name"
                :placeholder="$t('form.input.name') + '*'"
                class="form-input"
                name="name"
            ></b-form-input>
            <p class="error-text" v-if="errorResponce.name">{{ errorResponce.name }}</p>
          </div>
        </div>
        <div class="form-group ">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="user"/>
            <b-form-input
                id="last_name"
                v-model="form.last_name"
                :placeholder="$t('form.input.lastName') + '*'"
                class="form-input"
                name="last_name"
            ></b-form-input>
            <p class="error-text" v-if="errorResponce.last_name">{{ errorResponce.last_name }}</p>
          </div>
        </div>
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
                id="password2"
                v-model="form.password"
                :placeholder="$t('form.input.password')"
                class="form-input"
                name="password"
                :type="showPassword ? 'text' : 'password'"
            ></b-form-input>
            <p class="error-text" v-if="errorResponce.password">{{ errorResponce.password }}</p>
            <svg-icon class="sm-icon eye-icon" @click="showPassword = !showPassword" name="eye-slash" v-if="showPassword == false" />
            <svg-icon class="sm-icon eye-icon" @click="showPassword = !showPassword" name="eye" v-else />
            
          </div>
        </div>
        <div class="form-group ">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="lock"/>
            <b-form-input
                id="passConfirm"
                v-model="form.password_confirmation"
                :placeholder="$t('form.input.passConfirm')"
                class="form-input"
                :type="showConfirmPassword ? 'text' : 'password'"
                name="passConfirm"
            ></b-form-input>
            <p class="error-text" v-if="errorResponce.passConfirm">{{ errorResponce.passConfirm }}</p>
            <svg-icon class="sm-icon eye-icon" @click="showConfirmPassword = !showConfirmPassword" name="eye-slash" v-if="showConfirmPassword == false" />
            <svg-icon class="sm-icon eye-icon" @click="showConfirmPassword = !showConfirmPassword" name="eye" v-else />
          </div>

          <b-form-checkbox
                  name="privacy_policy"
                  v-model="form.privacy_policy" style="display: inline-block; vertical-align: middle;"
          ></b-form-checkbox>
          <label style="margin-bottom: 0px; margin-top: 15px; margin-left: -5px;">
            <nuxt-link target="_blank" :to="prepareUrl('/terms-and-conditions')">{{ $t('list.tConditions') }}*</nuxt-link>
          </label>
          <p class="error-text" v-if="errorResponce.privacy_policy">{{ errorResponce.privacy_policy }}</p>


        </div>
        <button class="btn btn-block btn-blue" type="submit">{{ $t("form.signUp") }}</button>
        <div class="text-center">
          <span class="btn" @click="$bvModal.hide('modal-sign')">
          {{ $t("form.btn.cancel") }}
        </span>
        </div>

        <!--            <b-button class="btn btn-block btn-blue" variant="primary" disabled>-->
        <!--               <b-spinner small type="grow"></b-spinner>-->
        <!--               Loading...-->
        <!--            </b-button>-->
      </form>
    </validation-observer>
  </div>
</template>
<script>
import global from "~/mixins/global.js"

export default {
  mixins: [global],
  name: "registration",
  data() {
    return {
      form: {
        name: null,
        last_name: null,
        email: '',
        password: '',
        passConfirm: '',
        privacyPolicy: null,
      },
      errorResponce: {
        name: false,
        last_name: false,
        email: false,
        password: false,
        passConfirm: false,
        privacy_policy: false,
      },
      showPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    getValidationState({dirty, validated, valid = null}) {
      return dirty || validated ? valid : null;
    },
    makeToast(variant = null) {
      this.$bvToast.toast('verify your email', {
        title: `Success Registered`,
        variant: 'success',
        autoHideDelay: 5000,
        solid: true
      });
    },
    async registration() {
      this.$emit('loading', true);
      await this.$axios.post('/register', this.form).then(async (res) => {
        this.$bvToast.toast(res.data.message, {
          variant: 'success',
          solid: true
        });

        // this.$bvModal.hide('modal-sign');

      }).catch((error) => {
        this.$emit('loading', false);
        const {errors} = error.response.data;
        for (const prop in errors) {
          if (prop.search("name") > -1 ||
              prop.search("email") > -1 ||
              prop.search("password") > -1 ||
              prop.search("passConfirm") > -1 ||
              prop.search("privacy_policy") > -1)

          {
            this.errorResponce[prop] = errors[prop][0]
          }
        }
        //this.$refs.observer.setErrors(errors);
      })
    }
  }
}
</script>