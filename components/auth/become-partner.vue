<template>
  <div class="tab-content px-3 scrollbar">
    <validation-observer
        ref="becomePartnerForm"
        v-slot="{ handleSubmit }"
        class="observer"
    >
      <form
          action="#"
          method="post"
          autocomplete="on"
          class="author-form become-partner-register py-5"
          @submit.stop.prevent="handleSubmit(submit)"
      >
        <div class="form-group">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="user"/>
            <b-form-input
                id="name"
                v-model="form.name"
                :placeholder="$t('form.input.name') + '*'"
                class="form-input"
                name="name"
            ></b-form-input>
          </div>
          <p class="error-text mt-1" v-if="errorResponce.name">{{ errorResponce.name }}</p>
        </div>

        <div class="form-group">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="user"/>
            <b-form-input
                id="last_name"
                v-model="form.last_name"
                :placeholder="$t('form.input.lastName') + '*'"
                class="form-input"
                name="last_name"
            ></b-form-input>
          </div>
          <p class="error-text mt-1" v-if="errorResponce.last_name">{{ errorResponce.last_name }}</p>
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
          </div>
          <p class="error-text mt-1" v-if="errorResponce.email">{{ errorResponce.email }}</p>
        </div>
        <div class="form-group">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="user"/>
            <b-form-input
                id="business_name"
                v-model="form.business_name"
                :placeholder="$t('form.input.businessName')"
                class="form-input"
                name="business_name"
            ></b-form-input>
          </div>
          <p class="error-text mt-1" v-if="errorResponce.business_name">{{ errorResponce.business_name }}</p>
        </div>

        <div class="form-group">
            <vue-phone-number-input
                    id="phone"
                    name="phone"
                    v-model="form.phone"
                    default-country-code="AM"
                    required
                    error-color="#FF0000"
                    clearable
                    :translations="translations"
                    @update="changeCountry"
                    color="#FF0000"
            />
<!--              <svg-icon class="sm-icon" name="phone"/>-->

            <p class="error-text mt-1" v-if="errorResponce.phone">{{ errorResponce.phone }}</p>

        </div>
        <div class="form-group">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="lock"/>
            <b-form-input
                id="password"
                v-model="form.password"
                :placeholder="$t('form.input.password')"
                class="form-input"
                name="password"
                type="password"
            ></b-form-input>
          </div>
          <p class="error-text mt-1" v-if="errorResponce.password">{{ errorResponce.password }}</p>
        </div>
        <div class="form-group">
          <div class="form-input-box">
            <svg-icon class="sm-icon" name="lock"/>
            <b-form-input
                id="passConfirm"
                v-model="form.password_confirmation"
                :placeholder="$t('form.input.passConfirm')"
                class="form-input"
                type="password"
                name="passConfirm"
            ></b-form-input>
          </div>
          <p class="error-text mt-1" v-if="errorResponce.password">{{ errorResponce.password }}</p>
          <b-form-checkbox
                  name="privacy_policy"
                  v-model="form.privacy_policy"
                  class="d-inline-block align-middle mt-2"
          ></b-form-checkbox>
          <label class="mb-0">
            <nuxt-link target="_blank" class="d-inline-block align-middle mt-2" :to="prepareUrl('/privacy-policy-for-business')">{{ $t('form.input.privacyPolicyForBusiness') }}*</nuxt-link>
          </label>
          <p class="error-text mt-1" v-if="errorResponce.privacy_policy">{{ errorResponce.privacy_policy }}*</p>
        </div>
        <div class="form-group">
          <b-form-input
              id="timezone"
              v-model="form.timezone"
              class="d-none"
              type="text"
              name="timezone"
          ></b-form-input>
        </div>
        <button class="btn btn-block btn-blue" type="submit">
          {{ $t("form.register") }}
        </button>
        <div class="text-center">
          <span class="btn" @click="$bvModal.hide('modal-sign-partner')">
          {{ $t("form.btn.cancel") }}
        </span>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import AutocompleteAddress from "../utilities/autocomplete-address";
import moment from 'moment';
import global from "~/mixins/global.js"
require('moment-timezone');

export default {
  mixins: [global],
  components: {
    VuePhoneNumberInput
  },

  name: "become-partner",
  props: ['errors'],
  data() {
    return {
      //phoneNumber: null,
      timezones: {},
      form: {
        name: null,
        last_name: null,
        email: null,
        business_name: null,
        currency: "EUR",
        timezone: null,
        phone: null,
        password: null,
        passConfirm: null,
        privacyPolicy: null,
      },
      errorResponce: {
        name: '',
        lastName: '',
        email: '',
        business_name: '',
        timezone: '',
        phone: '',
        password: '',
        passConfirm: '',
        privacyPolicy: false,
        phone_country: 'AM',
        phone_code: '+374',
      },
      translations: {
        example: this.$t("phoneNumber.example"),
        countrySelectorLabel: this.$t("phoneNumber.countrySelectorLabel"),
        countrySelectorError: this.$t("phoneNumber.countrySelectorError"),
      },
    }
  },
  computed: {
    tzGuess() {
      return moment.tz.guess(true);
    }
  },
  methods: {
    /*updatePhoneNumber(data) {
      this.errorMessage = null
      if (data.isValid) {
        this.phoneNumber = '+' + data.countryCallingCode + data.nationalNumber
      } else {
        this.errorMessage = this.$t("phoneNumber.countrySelectorError")
      }
    },*/

    changeCountry(event){
      this.form['phone_country'] = event.countryCode;
      this.form['phone_code'] = '+' + event.countryCallingCode;
    },

    submit() {
      this.$emit('submit', this.form)
    }
  },
  watch: {
    errors: function () {
      this.errorResponce = []
      for (const prop in this.errors) {
        if (this.errors[prop][0].length) {
          this.errorResponce[prop] = this.errors[prop][0]
        } else {
          this.errorResponce[prop] = ''
        }
      }
    }
  },
  created() {
    this.form.timezone = this.tzGuess
  }
}
</script>

<style scoped></style>
