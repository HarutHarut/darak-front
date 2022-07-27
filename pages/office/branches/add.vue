<template>
  <b-container fluid>
    <validation-observer
        ref="branchAdd"
        v-slot="{ handleSubmit }"
        class="observer"
    >
      <b-row class="justify-content-center">
        <b-col lg="8">
          <div class="base-card card mb-3">
            <div class="card-body">
              <h2 class="title-secondary text-center ">
                {{ $t("dashboard.add.branch") }}
              </h2>
              <div class="form-box">
                <b-form
                    action="#"
                    method="post"
                    @submit.stop.prevent="handleSubmit(addBranch)"
                >
                  <b-row>
                    <b-col sm="12">
                      <div class="image-upload-box mb-3">
                        <label for="file-ip-1" class="text-center p-3">
                          <span class="mb-3 d-block">{{ $t("dashboard.upload.wallpaper") }}</span>
                          <span class="upload-preview">
                            <img v-if="logo" id="file-ip-1-preview" :src="logo" alt="">
                            <img v-else :src="require('@/assets/img/upload.png')" alt=""/>
                          </span>
                          <span v-b-tooltip.hover :title="$t('dashboard.tooltip.uploadWallpaper')" class="ml-2">
                            <svg-icon class="base-icon" name="question-mark"></svg-icon>
                          </span>
                        </label>
                        <input type="file" :src="form.logo" multiple name="img_one"
                               id="file-ip-1"
                               accept="image/*" @change="showPreviewOne">
                      </div>
                      <p class="error-text" v-if="errors.logo">
                        {{ errors.logo[0] }}
                      </p>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                          class="input phone-number-input d-flex mb-0 mt-2"
                          :label="$t('dashboard.fields.phone')"
                          label-for="input-2"
                          description=""
                      >
                        <span v-b-tooltip.hover :title="$t('dashboard.tooltip.phone')" class="ml-2">
                              <svg-icon class="base-icon" name="question-mark"></svg-icon>
                        </span>
                      </b-form-group>
                        <validation-provider
                            v-slot="validationContext"
                            style="width: 100%"
                            name="phone"
                        >
                          <vue-phone-number-input
                                  id="input-2"
                                  v-model="form.phone"
                                  class="form-input"
                                  :default-country-code="countryCode"
                                  error-color="#FF0000"
                                  clearable
                                  @update="changeCountry"
                                  :translations="translations"
                                  color="#FF0000"
                          />
                          <p class="error-text">
                            {{ validationContext.errors[0] }}
                          </p>
                        </validation-provider>

                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                          :label="$t('dashboard.fields.address')"
                          label-for="input-4"
                          v-slot="validationContext"
                          description=""
                          class="d-flex mb-0 mt-2"
                          name="address"
                      >
                        <span v-b-tooltip.hover :title="$t('dashboard.tooltip.address')" class="ml-2">
                              <svg-icon class="base-icon" name="question-mark"></svg-icon>
                        </span>
                      </b-form-group>

                      <GmapAutocomplete
                            style="width: 100%; border: 1px solid #ced4da; border-radius: 4px;"
                            @place_changed="setPlace"
                        ></GmapAutocomplete>

                      <p class="error-text" v-if="errors.address">
                        {{ errors.address[0] }}
                      </p>
                    </b-col>
                    <template v-for="(social, index) in form.socialMedia">
                      <b-col sm="6" class="mb-3">
                        <b-form-group
                            :label="$t('dashboard.fields.' + index)"
                            label-for="input-4"
                            description=""
                            class="d-flex mb-0 mt-2"
                        >
                          <span v-b-tooltip.hover :title="$t('dashboard.tooltip.' + index)" class="ml-2">
                              <svg-icon class="base-icon" name="question-mark"></svg-icon>
                          </span>
                        </b-form-group>
                        <b-form-input
                              style="width: 100%; border: 1px solid #ced4da; border-radius: 4px;"
                              @place_changed="setPlace"
                              v-model="form.socialMedia[index]"
                      ></b-form-input>

                        <p class="error-text">
                          {{ errorMessage }}
                        </p>
                      </b-col>
                    </template>

                    <b-col sm="6" class="mb-3">
                      <b-form-group
                              :label="$t('dashboard.fields.email')"
                              label-for="input-4"
                              v-slot="validationContext"
                              description=""
                              name="email"
                              class="d-flex mb-0 mt-2"
                      >
                        <span v-b-tooltip.hover :title="$t('dashboard.tooltip.email')" class="ml-2">
                              <svg-icon class="base-icon" name="question-mark"></svg-icon>
                        </span>
                      </b-form-group>
                      <b-form-input
                              name="email"
                              style="width: 100%; border: 1px solid #ced4da; border-radius: 4px;"
                              @place_changed="setPlace"
                              v-model="form.email"
                      ></b-form-input>

                      <p class="error-text" v-if="errors.email">
                        {{ errors.email[0] }}
                      </p>
                    </b-col>
                    <b-col lg="3" sm="6">
                      <b-form-group class="d-flex mb-0 mt-2">
                        {{ $t('dashboard.statuses.title') }}
                        <span v-b-tooltip.hover :title="$t('dashboard.tooltip.status')" class="ml-2">
                              <svg-icon class="base-icon" name="question-mark"></svg-icon>
                        </span>
                      </b-form-group>

                        <validation-provider
                            v-slot="validationContext"
                            :rules="{ required: true }"
                            :name="$t('dashboard.statuses.title')"
                        >

                          <b-form-radio-group
                              v-model="form.status"
                              class="d-flex flex-wrap my-2"
                              :options="optionsStatus"
                              name="status"
                          ></b-form-radio-group>
                          <p class="error-text">
                            {{ validationContext.errors[0] }}
                          </p>
                        </validation-provider>
                    </b-col>
                    <b-col lg="3" sm="6">
                      <b-form-group class="d-flex mb-0 mt-2">
                        {{ $t('dashboard.statuses.cardPayment') }}

                        <span v-b-tooltip.hover :title="$t('dashboard.tooltip.cardPayment')" class="ml-2">
                              <svg-icon class="base-icon" name="question-mark"></svg-icon>
                        </span>
                      </b-form-group>

                      <validation-provider
                            v-slot="validationContext"
                            :rules="{ required: true }"
                            :name="$t('dashboard.statuses.cardPayment')"
                        >

                          <b-form-radio-group
                              v-model="form.card_payment"
                              class="d-flex flex-wrap my-2"
                              :options="optionsCardPayment"
                              name="card_payment"
                          ></b-form-radio-group>
                          <p class="error-text">
                            {{ validationContext.errors[0] }}
                          </p>
                        </validation-provider>
                    </b-col>
                    <b-col sm="12">
                      <GmapMap
                          :center="mapCenter"
                          :zoom="16"
                          style="width: 100%; height: 400px"

                      >
                        <GmapMarker
                            :position="{ lat: form.lat, lng: form.lng }"
                            :clickable="true"
                            :draggable="true"
                            @drag="dragAddress"
                        />
                      </GmapMap>
                    </b-col>
                    <b-col sm="12" class="pt-2">
                      <TranslationField
                          :name="form.name"
                          :description="form.description"
                      ></TranslationField>
                    </b-col>
                    <div class="pl-4 pb-2" v-if="transError">
                      <p class="error-text">
                        {{ $t("dashboard.list.translationFields") }}.
                      </p>
                    </div>
                  </b-row>
                  <b-row>
                    <b-col class="pt-3" sm="12">
                      <div class="multiple-upload image-upload-box mb-3">
                        <div class="control-form">
                          <div class="upload-img-content">
                            <div>
                              <label for="fileUpload"
                                     class="text-center my-2 d-flex align-items-center justify-content-center">
                                <span class="mr-2">{{ $t("dashboard.upload.images") }}</span>
                                <svg-icon class="md-icon" name="download"></svg-icon>
                                <span v-b-tooltip.hover :title="$t('dashboard.tooltip.uploadImages')" class="ml-2">
                                  <svg-icon class="base-icon" name="question-mark"></svg-icon>
                                </span>
                              </label>
                              <b-form-file
                                  type="file"
                                  id="fileUpload"
                                  class="upload-file"
                                  @change="addImg"
                                  ref="inputer"
                                  style="display: none"
                                  multiple
                                  accept="image/png,image/jpeg,image/gif,image/jpg">
                              </b-form-file>
                            </div>
                            <ul class=" border upload-img-content p-2 d-flex flex-wrap">
                              <li v-for="(value, key) in images" v-bind:key="key">
                                <p class="img"
                                   :class="{ isDefault: value.default === 1 }"
                                >
                                  <img :src="value.url" class="image"
                                  />
                                  <a
                                      class="close"
                                      @click="changeLogo(key)"
                                      style="top: 4px; right: 5px"
                                      title="Set Default"
                                  >
                                    <img v-if="value.default === 0"
                                         style="width: 47px; height: 18px;padding: 0px ;"
                                         :src="require('@/assets/img/check-icon.png')"
                                         class="image"/>
                                  </a>
                                  <a class="close" @click="deleteImg(key)">×</a>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <p class="help-block text-center">
                            ({{ $t('dashboard.list.imageFormat') }})
                            ()
                          </p>
                        </div>
                      </div>
                      <div class="pl-4 pb-2" v-if="imageError">
                        <p class="error-text">
                          {{ $t('dashboard.list.PleaseUploadImages') }}.
                        </p>
                      </div>
                    </b-col>
                  </b-row>
                  <div style="text-align: center">
                    <button type="submit" class="btn btn-blue btn-form mb-2"> {{ $t("dashboard.btn.submit") }}
                    </button>
                    <button type="button" @click="branchNext" class="btn btn-success btn-form float-right"> {{ $t("dashboard.btn.branchNext") }}
                    </button>
                  </div>
                </b-form>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </validation-observer>
  </b-container>
</template>
<script>
import TranslationField from "../../../components/buisness/branch/add/translation-fields"
import AutocompleteAddress from "../../../components/utilities/autocomplete-address"
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import global from "~/mixins/global.js"

export default {
  mixins: [global],

  components: {
    TranslationField,
    AutocompleteAddress,
    VuePhoneNumberInput
  },

  data() {
    return {
      countryCode: 'AM',
      next: false,
      transError: false,
      errors: {},
      imageError: false,
      errorMessage: null,
      form: {
        logo: null,
        address: "",
        phone: "",
        email: "",
        city: {
          lat: null,
          lng: null,
          name: null
        },
        lat: 44,
        lng: 44,
        status: 1,
        card_payment: 1,
        name: {
          fr: "",
          am: "",
          ru: "",
          ch: "",
          de: "",
          sp: "",
          en: ""
        },
        socialMedia: {
          whatsapp: null,
          viber: null,
        },
        description: {
          fr: "",
          am: "",
          ru: "",
          ch: "",
          de: "",
          sp: "",
          en: ""
        }
      },
      mapCenter: {
        lat: 44,
        lng: 44
      },
      cityName: null,
      images: [],
      logo: null,
      optionsCountry: [],
      optionsCurrency: [],
      optionsStatus: [
        {value: 1, text: "Active"},
        {value: 0, text: "Inactive"}
      ],
      optionsCardPayment: [
        {value: 1, text: "Yes"},
        {value: 0, text: "No"}
      ],
      translations: {
        example: this.$t("phoneNumber.example"),
        countrySelectorLabel: this.$t("phoneNumber.countrySelectorLabel"),
        countrySelectorError: this.$t("phoneNumber.countrySelectorError"),
      },
    }
  },
  methods: {
    dragAddress(e) {
      this.form.lat = e.latLng.lat()
      this.form.lng = e.latLng.lng()
    },
    setPlace(address) {
      this.errorMessage = null

      if (address.geometry) {
        this.form.lat = address.geometry.location.lat()
        this.form.lng = address.geometry.location.lng()

        this.mapCenter.lat = address.geometry.location.lat()
        this.mapCenter.lng = address.geometry.location.lng()
        this.form.address = address.formatted_address

        const city = address.address_components.find(item => {
          if (item.types[0] === "locality") {
            return true
          }
        })

        if (city) {
          this.geocodeGetCity(city.long_name)
        }

      } else {
        this.errorMessage = "Address not found. Please type correct name."
      }
    },

    geocodeGetCity(city) {
      fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyC3SC8deKRcyq8xsWSwW5TzHlcL6bJdHTg&language=en&type=locality`
      )
          .then(response => response.json())
          .then(({results}) => {
            const [response] = results

            const city = response.address_components.find(item => {
              if (item.types[0] === "locality") {
                return true
              }
            })

            if (city) {
              this.form.city.lat = response.geometry.location.lat
              this.form.city.lng = response.geometry.location.lng
              this.form.city.name = city.long_name
            } else {
              this.errorMessage =
                  "Address not found. Please type correct name."
            }
          })
          .catch(error => {
            console.log(error)
          })
    },

    changeCountry(event){
      this.form['phone_country'] = event.countryCode;
      this.form['phone_code'] = '+' + event.countryCallingCode;
    },

    addBranch(next) {

      this.transError = false
      this.imageError = false
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
        } else if (prop === "description") {
          for (let previewKey in this.form[prop]) {
            formData.append(
                `description[${previewKey}]`,
                this.form[prop][previewKey]
            )
          }
        } else if (prop === "city") {
          for (let previewKey in this.form[prop]) {
            formData.append(
                `city[${previewKey}]`,
                this.form[prop][previewKey]
            )
          }
        } else if (prop === "socialMedia") {
          for (let previewKey in this.form[prop]) {
            formData.append(
                `socialMedia[${previewKey}]`,
                this.form[prop][previewKey]
            )
          }
        } else {
          formData.append(prop, this.form[prop])
        }
      }

      const media = this.images

      formData.append("logo", this.form.logo)

      for (let previewKey in media) {
        formData.append(`media[${previewKey}]`, media[previewKey].file)
        formData.append(`mediaKey[${previewKey}]`, media[previewKey].default)
      }

      let data = formData
      this.$axios
          .post("/branches/create", data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.$bvToast.toast(response.data.message, {
              variant: "success",
              solid: true
            })
            let slug = response.data.branch.slug
            if (next == 1){
              let path = this.prepareUrl(`/office/branches/` + slug + '#next');
              this.$router.push({
                path: path,
              })
            }else{
              this.$router.push('/office/branches')
            }
          })
          .catch(error => {
            switch (error.response.status) {
              case 422:
                const {errors} = error.response.data
                this.$refs.branchAdd.setErrors(errors)
                this.errors = errors;
                for (const prop in errors) {
                  if (
                      prop.search("description.en") > -1 ||
                      prop.search("name.en") > -1
                  ) {
                    this.transError = true
                  }
                }
                break
            }
          })
    },

    branchNext(){
      this.addBranch(1)
    },

    addImg(event) {
      this.imageError = false
      Object.keys(event.target.files).map(item => {
        const img = {
          url: URL.createObjectURL(event.target.files[item]),
          file: event.target.files[item],
          default: this.images.length === 0 ? 1 : 0
        }
        this.$set(this.images, this.images.length, img)
      })
    },
    showPreviewOne(event) {
      if (event.target.files.length > 0) {
        this.logo = URL.createObjectURL(event.target.files[0])
        this.form.logo = event.target.files[0];
        let src = URL.createObjectURL(event.target.files[0]);
      }
    },
    deleteImg(idx) {
      this.images = this.images.filter((item, index) => {
        if (index !== idx) {
          return item
        }
      })

      const existDefault = this.images.find((item, index) => {
        if (item.default === 1) {
          return item
        }
      })

      if (!existDefault && this.images.length > 0) {
        this.images[0].default = 1
      }
    },

    changeLogo(idx) {
      this.images = this.images.map((item, index) => {
        if (index === idx) {
          return {
            ...item,
            default: 1
          }
        }
        return {
          ...item,
          default: 0
        }
      })
    },

  },
  mounted() {
    let url = window.location.href;
    if (url.includes('#')){
      this.next = true;
    }
  }
}
</script>
<style>
.isDefault {
  border-color: green !important;
  border-width: 4px !important;
}
</style>