<template>
   <b-container fluid>
      <b-row class="justify-content-center">
         <b-col xl="9" lg="7">
            <div class="base-card card p-3 mb-3">
               <div class="card-body">
                  <h2 class="title-secondary text-center">{{ $t("dashboard.add.city") }}</h2>
                  <div class="form-box">
                     <validation-observer ref="loginForm" v-slot="{ handleSubmit }" class="observer">
                        <b-form @submit.stop.prevent="handleSubmit(create)">
                           <b-row>
                              <b-col sm="12">
                                 <b-form-group
                                      :label="$t('dashboard.fields.name')"
                                      label-for="input-1">
                                    
                                     <GmapAutocomplete name="Name" :rules="{ required: true, max: 255}"
                                          style="width: 100%; border: 1px solid #ced4da; border-radius: 4px;" placeholder="" 
                                          @place_changed="geocodeGetCity"
                                      ></GmapAutocomplete>
                                 </b-form-group>
                                 <p class="error-text">{{ errorMessage }}</p>
                              </b-col>
                              <b-col sm="12">
                                 <GmapMap
                                      :center="{lat:form.lat , lng:form.lng }"
                                      :zoom="9"
                                      map-type-id="terrain"
                                      style="width: 100%; height: 400px"
                                 >
                                    <GmapMarker
                                         v-if="form.name"
                                         :position="{lat: form.lat, lng: form.lng}"
                                         :clickable="false"
                                         :draggable="false"
                                    />
                                 </GmapMap>
                              </b-col>
                              <b-col sm="6" class="mt-3">
                                 <b-form-group :label="$t('dashboard.fields.isTopDestination')">
                                    <b-form-radio-group
                                         class="d-flex"
                                         :options="optionsDestination"
                                         name="radio-validation"
                                         v-model="form.top"
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
                                             <li v-if="logo.file">
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
                                             <li v-if="banner.file">
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
                                 <p class="error-text">{{ errorLogoMessage }}</p>
                              </b-col>
                           </b-row>
                           <div class="text-center">
                              <button type="submit" class="btn btn-blue btn-form mb-3">
                                 {{ $t("dashboard.btn.submit") }}
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
import CityDescTranslation from "../../../components/dashboard/city/city-desc-translation"


export default {

   components: {
      CityDescTranslation
   },
   data() {
      return {
         name: '',
         form: {
            name: '',
            about_city: {
               fr: null,
               am: null,
               ru: null,
               ch: null,
               de: null,
               sp: null,
               en: null
            },
            description: {
               fr: null,
               am: null,
               ru: null,
               ch: null,
               de: null,
               sp: null,
               en: null
            },
            image: null,
            preview: null,
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
         if (!this.logo.file) {
            this.errorLogoMessage = 'Logo is required.';
            return false;
         }
         // if (!this.banner.file) {
         //    this.errorBannerMessage = 'Banner is required.';
         //    return false;
         // }
         if (!this.form.name) {
            this.errorMessage = 'City not found. Please type correct name.';
            return false;
         }

         this.form.image = this.logo.file;
         this.form.preview = this.banner.file;
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

         this.$axios.post('/admin/cities', formData).then((response) => {
            this.$router.push('/dashboard/cities')
         })
      },

      geocodeGetCity(address) {
   
         if(address){
            this.name = address.name;
         }
         
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
      },
      deleteBanner() {
         this.banner = {
            url: null,
            file: null
         }
      }
   },
   mounted() {
      this.geocodeGetCity()
   }
}
</script>