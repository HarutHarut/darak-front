<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col xl="7" lg="9">
        <div class="base-card card p-3 mb-3">
          <div class="card-body">
            <h2 class="title-secondary text-center">{{ $t("dashboard.edit.city") }}</h2>
            <div class="form-box">
              <validation-observer ref="loginForm" v-slot="{ handleSubmit }" class="observer">
                <b-form v-if="city" @submit.stop.prevent="handleSubmit(create)">
                  <b-row>
                    <b-col sm="12">
                      <b-form-group
                          :label="$t('dashboard.fields.city')"
                          label-for="input-1">
                        <validation-provider
                            v-slot="validationContext"
                            name="Name"
                            style="width: 100%"
                        >
                          <div>
                            <AutocompleteAddress :city="city" @setPlace="setPlace"
                                                 style="width: 100%; border: 1px solid #ced4da; border-radius: 4px;"></AutocompleteAddress>
                          </div>
                          <p class="error-text">
                            {{ errorMessage }}
                          </p>
                          <p class="error-text">{{ validationContext.errors[0] }}</p>
                          <p class="error-text">{{ errorMessage }}</p>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group :label="$t('dashboard.fields.isTopDestination')">
                        <b-form-radio-group
                            class="d-flex"
                            :options="optionsDestination"
                            name="radio-validation"
                            v-model="city.top"
                        ></b-form-radio-group>
                      </b-form-group>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                      <CityDescTranslation
                              :about_city="form.about_city"
                              :description="form.description"
                      ></CityDescTranslation>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="multiple-upload image-upload-box mb-3">
                        <div class="control-form">
                          <div class="upload-img-content">
                            <div>
                              <label for="file"
                                     class="text-center my-2 d-flex align-items-center justify-content-center">
                                <span class="mr-2">{{ $t("dashboard.upload.logo") }}</span>
                                <svg-icon class="md-icon" name="download"></svg-icon>
                              </label>
                              <b-form-file type="file" id="file" class="upload-file d-none" @change="addLogo"
                                           ref="inputer"
                                           accept="image/png,image/jpeg,image/gif,image/jpg"></b-form-file>
                            </div>
                            <ul class=" border upload-img-content p-2 d-flex flex-wrap">
                              <li v-if="logo.file || city.logo">
                                <p class="img">
                                  <img :src="logo.url" class="image"/>
                                  <a class="close" @click="deleteLogo()">×</a>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <p class="help-block text-center">{{ $t("dashboard.upload.imageRecommendations") }}</p>
                        </div>
                      </div>
                      <p class="error-text">{{ errorLogoMessage }}</p>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <div class="multiple-upload image-upload-box mb-3">
                        <div class="control-form">
                          <div class="upload-img-content">
                            <div>
                              <label for="preview_file"
                                     class="text-center my-2 d-flex align-items-center justify-content-center">
                                <span class="mr-2">{{ $t("dashboard.upload.wallpaper") }}</span>
                                <svg-icon class="md-icon" name="download"></svg-icon>
                              </label>
                              <b-form-file type="file" id="preview_file" class="upload-file d-none" @change="addBanner"
                                           ref="inputer"
                                           accept="image/png,image/jpeg,image/gif,image/jpg"></b-form-file>
                            </div>
                            <ul class=" border upload-img-content p-2 d-flex flex-wrap">
                              <li v-if="banner.file || city.preview">
                                <p class="img">
                                  <img :src="banner.url" class="image"/>
                                  <a class="close" @click="deleteBanner()">×</a>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <p class="help-block text-center">{{ $t("dashboard.upload.imageRecommendations") }}</p>
                        </div>
                      </div>
                      <p class="error-text">{{ errorBannerMessage }}</p>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <button type="submit" class="btn btn-blue btn-form mb-3">
                      {{ $t("dashboard.btn.update") }}
                    </button>
                  </div>
                </b-form>
              </validation-observer>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from 'lodash'
import AutocompleteAddress from "../../../../components/utilities/autocomplete-address"
import CityDescTranslation from "../../../../components/dashboard/city/city-desc-translation"


export default {
  components: {
    AutocompleteAddress,
    CityDescTranslation
  },
  data() {
    return {
      city: {},
      name: '',
      form: {
        name: "something",
        about_city: {
          fr: "",
          am: "",
          ru: "",
          ch: "",
          de: "",
          sp: "",
          en: ""
        },
        description: {
          fr: "",
          am: "",
          ru: "",
          ch: "",
          de: "",
          sp: "",
          en: ""
        },
        lat: 40.177,
        lng: 44.503,
        top: 1
      },
      optionsDestination: [
        {value: 1, text: 'Yes'},
        {value: 0, text: 'No'},
      ],
      logo: {
        url: null,
        file: null
      },
      banner: {
        url: null,
        file: null
      },
      errorMessage: null,
      errorLogoMessage: null,
      errorBannerMessage: null,
    }
  },
  methods: {
    create() {
      if (!this.logo.file && !this.city.logo || this.logo.file === 'null') {
        this.errorLogoMessage = 'Logo is required.';
        return false;
      }
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        }
      }
      const formData = new FormData();

      for (const prop in this.form) {
        if (prop === "name") {
          formData.append(
                  `name`,
                  this.form.name
          )
        } else if (prop === "description") {
          for (let previewKey in this.form[prop]) {
            formData.append(
                    `description[${previewKey}]`,
                    this.form[prop][previewKey]
            )
          }
        }else if (prop === "about_city") {
          for (let previewKey in this.form[prop]) {
            formData.append(
                    `about_city[${previewKey}]`,
                    this.form[prop][previewKey]
            )
          }
        }else if (prop === "lat") {
          formData.append(
                  `lat`,
                  this.form.lat
          )
        }else if (prop === "lng") {
          formData.append(
                  `lng`,
                  this.form.lng
          )
        }else if (prop === "top") {
          formData.append(
                  `top`,
                  this.form.top
          )
        }else{
          formData.append(prop, this.form[prop]);
        }
      }

      if (this.logo.file && this.logo.file) {
        formData.append('image', this.logo.file);
      }
      if (this.banner.file && this.banner.file) {
        formData.append('banner', this.banner.file);
      }
      formData.append('_method', 'put');

      this.$axios.post(`admin/cities/${this.city.id}`, formData, config).then((response) => {
        this.$router.push('/dashboard/cities')
      }).catch((error) => {
        console.log(error)
      })
    },

    geocodeGetCity() {
      if (this.name.length > 2) {
        this.form.name = '';
        this.errorMessage = '';
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.name}&key=AIzaSyC3SC8deKRcyq8xsWSwW5TzHlcL6bJdHTg&language=en&type=locality`)
            .then(response => response.json())
            .then(({results}) => {

              if (!_.isEmpty(results[0])) {

                const [response] = results
                const city = response.address_components.find((item) => {
                  if (item.types[0] === "locality") {
                    return true
                  }
                })

                if (city) {

                  this.form.lat = response.geometry.location.lat;
                  this.form.lng = response.geometry.location.lng;
                  this.form.name = city.long_name;
                } else {
                  this.errorMessage = 'City not found. Please type correct name.';
                }

              } else {

                this.form.lat = 40.177;
                this.form.lng = 44.503;
                this.form.name = null;
                this.errorMessage = 'City not found. Please type correct name.';
              }

            }).catch((error) => {
        })
      }
    },

    addLogo(event) {
      this.logo = {
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      };
    },

    addBanner(event) {
      this.banner = {
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      };
    },

    deleteLogo() {
      this.logo = {
        url: null,
        file: null
      }
      this.city.logo = null
    },

    deleteBanner() {
      this.banner = {
        url: null,
        file: null
      }
      this.city.preview = null
    },

    getCityById(id) {
      this.$axios.get(`admin/cities/${id}`).then((response) => {
        this.city = response.data.city
        this.form = response.data.city
        this.logo.url = response.data.city.logo
        this.banner.url = response.data.city.preview
      })
    },

    setPlace(val) {
      this.city.lat = val.geometry.location.lat();
      this.city.lng = val.geometry.location.lng();
      this.city.name = val.name
    }
  },
  mounted() {
    this.getCityById(this.$route.params.id);
    this.geocodeGetCity()
  }
}
</script>