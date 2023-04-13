<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col xl="7" lg="9">
        <div class="base-card card p-3 mb-3">
          <div class="card-body">
            <h2 class="title-secondary text-center">{{ $t("dashboard.fields.createBusiness") }}</h2>
            <div class="form-box" v-if="loading">
              <b-form method="post" v-if="show" enctype='multipart/form-data'>
                <b-row>
                  <b-col sm="6">
                    <b-form-group
                        :label="$t('dashboard.fields.name')"
                        label-for="input-1">
                      <b-form-input
                          id="input-1"
                          v-model="business.name.en"
                          type="text"
                          placeholder=""
                          required
                      ></b-form-input>
                      <p class="error-text" v-if="errors.name">
                        {{ errors.name['0'] }}
                      </p>
                    </b-form-group>
                  </b-col>

                  <b-col sm="6">
                    <b-form-group
                        :label="$t('dashboard.fields.phone')"
                        label-for="input-2"
                        description=""
                    >
                    <vue-phone-number-input
                            id="phone"
                            name="phone"
                            v-model="business.phone"
                            :default-country-code="countryCode"
                            required
                            error-color="#FF0000"
                            clearable
                            :translations="translations"
                            @update="changeCountry"
                            color="#FF0000"
                    />

                        <p class="error-text" v-if="errors.phone">
                        {{ errors.phone['0'] }}
                      </p>
                    </b-form-group>
                  </b-col>

                  <b-col sm="6">
                    <b-form-group
                            :label="$t('dashboard.fields.email')"
                            label-for="input-1">
                      <b-form-input
                              id="input-1"
                              v-model="business.email"
                              type="email"
                              placeholder=""
                              required
                      ></b-form-input>
                      <p class="error-text" v-if="errors.email">
                        {{ errors.email['0'] }}
                      </p>
                    </b-form-group>
                  </b-col>

                  <b-col sm="6">
                    <template>
                      <b-form-group
                          :label="$t('dashboard.fields.currency')"
                          label-for="input-4"
                          description=""
                      >
                        <div class="mb-3">
                          <b-form-select v-model="business.currency" :options="optionsCurrency"></b-form-select>
                        </div>
                        <p class="error-text" v-if="errors.currency">
                          {{ errors.currency['0'] }}
                        </p>
                      </b-form-group>
                    </template>
                  </b-col>

                  <b-col sm="6">
                    <b-form-group
                            :label="$t('dashboard.fields.address')"
                            label-for="input-4"
                            description=""

                    >
                      <GmapAutocomplete
                              required
                              :value="business.address"
                              :placeholder="$t('form.input.searchLocation')"
                              aria-label=""
                              class="search-location-input form-control flex-grow-1 h-100 w-100"
                              type="text"
                              id="search-input"
                              :options="options"
                              @place_changed="setPlace"
                      ></GmapAutocomplete>
                      <p class="error-text" v-if="errors.address">
                        {{ errors.address['0'] }}
                      </p>
                    </b-form-group>
                  </b-col>

                  <b-col sm="6">
                    <template>
                      <b-form-group
                              :label="$t('dashboard.fields.timezone')"
                              label-for="input-4"
                              description=""
                      >
                        <div class="mb-3">
                           <model-select v-model="business.timezone" :options="timezoneOptions"></model-select>
                        </div>
                        <p class="error-text" v-if="errors.timezone">
                          {{ errors.currency['0'] }}
                        </p>
                      </b-form-group>
                    </template>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <div class="image-upload-box mb-3">
                      <label for="file-ip-1" class="text-center p-3">
                        <span class="mb-3 d-block">{{ $t("dashboard.upload.image") }}</span>
                        <span class="upload-preview">
                          <img id="file-ip-1-preview" :src="business.logo ? business.logo : require('@/assets/img/upload.png')" alt="">
                        </span>
                      </label>
                      <input type="file" :src="business.logo" multiple name="img_one" id="file-ip-1"
                             accept="image/*" @change="showPreviewOne">

                    </div>
                  </b-col>
                </b-row>
                <button type="button" @click="onSubmit" class="btn btn-blue btn-form mb-2 mr-2">
                  {{ $t("dashboard.btn.submit") }}
                </button>
<!--                <button type="button" @click="onReset" class="btn btn-color btn-form mb-2">{{ $t("dashboard.btn.cancel") }}-->
<!--                </button>-->
                <button v-if="next" type="button" @click="businessNext" class="btn btn-success btn-form float-right mb-2">{{ $t("dashboard.btn.businessNext") }}
                </button>
              </b-form>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import moment from "moment";
import global from "~/mixins/global.js"
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import { ModelSelect } from 'vue-search-select'

export default {
  mixins: [global],
  components: {
    VuePhoneNumberInput,
    ModelSelect
  },

  data() {
    return {
      countryCode: 'AM',
      next: false,
      errors: {},
      form: {
        preview: null,
        image: null,
        preview_list: [],
        image_list: []
      },
      logo: null,
      options: {
        types: ['(cities)'],
      },
      business: {},
      name: null,
      show: true,
      value: '',
      formatted: '',
      selected: null,
      optionsCurrency: [
        {value: null, text: 'Currency', disabled: 'true'},
        {value: 'AMD', text: 'AMD'},
        {value: 'EUR', text: 'EUR'},
        {value: 'RUB', text: 'RUB'},
        {value: 'USD', text: 'USD'},
        {value: 'GBP', text: 'GBP'},
        {value: 'GEL', text: 'GEL'},
      ],
      timezoneOptions: [],
      translations: {
          example: this.$t("phoneNumber.example"),
          countrySelectorLabel: this.$t("phoneNumber.countrySelectorLabel"),
          countrySelectorError: this.$t("phoneNumber.countrySelectorError"),
          phoneNumberLabel: this.$t("form.input.tel"),
      },
      loading: false
    }
  },
  methods: {
    setPlace(e) {
      this.business.lat = Number(e.geometry.location.lat());
      this.business.lng = Number(e.geometry.location.lng());
      this.business.address = e.formatted_address;
    },
    changeCountry(event){
      this.business.phone_country = event.countryCode;
      this.business.phone_code = '+' + event.countryCallingCode;
    },
    onSubmit(next, event) {
      const formData = new FormData()
      const config = {
        header : {
          'Content-Type' : 'multipart/form-data',
        }
      }
      if (this.logo) {
        formData.append('logo', this.logo)
      }
      formData.append("id",this.business.id);
      formData.append("name",this.business.name.en);
      formData.append("email",this.business.email);
      formData.append('phone',this.business.phone);
      formData.append('phone_country',this.business.phone_country);
      formData.append('phone_code',this.business.phone_code);

      if (this.business.currency){
        formData.append('currency',this.business.currency);
      }else{
        formData.append('currency', 'EUR');
      }
      if (this.business.address){
        formData.append('address',this.business.address);
      }
      if (this.business.timezone){
        formData.append('timezone',this.business.timezone);
      }
      formData.append('_method', 'put');
      this.$axios.post('/business/update', formData, config).then((res) => {
        if (next == 1){
          let path = this.prepareUrl('/office/branches/add#next');
          this.$router.push({
            path: path,
          })
        }
        this.$bvToast.toast("Update successfully.", {
          title: `Update successfully`,
          variant: "success",
          solid: true
        })
      }).catch((error) => {
        const {errors} = error.response.data;
        this.errors = errors
        this.$bvToast.toast("Update Error.", {
          title: "Update Error",
          variant: "danger",
          solid: true
        })
      })
    },
    businessNext(){
      this.onSubmit(1)
    },

    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.tel = ''
      this.form.city = ''
      this.form.address = ''
      this.form.selected = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    showPreviewOne(event) {
      if (event.target.files.length > 0) {
        this.logo = event.target.files[0]
        let src = URL.createObjectURL(event.target.files[0]);
        let preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
      }
    },
  },
  mounted() {
    let url = window.location.href;
    if (url.includes('#')){
      this.next = true;
    }
    this.$axios.get('/business').then((res) => {
      this.loading = true;
      this.timezoneOptions = res.data.timezoneOptions;
      this.business = res.data;
      this.name = res.data.name.en;
      if (this.business.currency === null) {
        this.business.currency = "EUR"
      }
      if (this.business.country_code){
        this.countryCode = JSON.parse(this.business.country_code).country
      }
    })
  },
  filters: {
    getTransValue(val, lang) {
      return val[lang]
    },
  },
}
</script>
<style>
.gray {
  border: 1px solid #ced4da;
}
</style>