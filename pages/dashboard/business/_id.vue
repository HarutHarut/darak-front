<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col lg="9" xl="7">
        <div class="base-card card p-3 mb-3">
          <div class="card-body">
            <h2 class="title-secondary text-center">{{ $t("dashboard.fields.createBusiness") }}</h2>
<!--            <div class="form-box" v-if="loading">-->
              <b-form method="post" v-if="show" enctype='multipart/form-data'>
                <b-row>
                  <b-col sm="6">
                    <b-form-group
                        :label="$t('dashboard.fields.name')"
                        label-for="input-1">
                      <b-form-input
                          id="input-1"
                          v-model="business.name"
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
                      <b-form-input
                          id="input-2"
                          v-model="business.phone"
                          placeholder=""
                          type="text"
                          required
                      ></b-form-input>
                      <p class="error-text" v-if="errors.phone">
                        {{ errors.phone['0'] }}
                      </p>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group
                        :label="$t('dashboard.fields.address')"
                        label-for="input-4"
                        description=""

                    >
                      <!--                                        <b-form-input-->
                      <!--                                        id="input-4"-->
                      <!--                                        v-model="business.address"-->
                      <!--                                        type="text"-->
                      <!--                                        placeholder=""-->
                      <!--                                        required-->
                      <!--                                        ></b-form-input>-->
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
                </b-row>
                <b-row>
                  <b-col>
                    <div class="image-upload-box mb-3">
                      <label for="file-ip-1" class="text-center p-3">
                        <span class="mb-3 d-block">{{ $t("dashboard.upload.image") }}</span>
                        <span class="upload-preview">
                          <img id="file-ip-1-preview" :src="business.logo ? business.logo : require('@/assets/img/upload.png')" alt="">
<!--                          <img v-else :src="require('@/assets/img/upload.png')" class="file-ip-1-preview" alt=""/>-->
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
<!--                <button type="button" @click="onReset" class="btn btn-color btn-form mb-2">-->
<!--                  {{ $t("dashboard.btn.cancel") }}-->
<!--                </button>-->
              </b-form>
<!--            </div>-->
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import moment from "moment";

export default {
  props: {
    // 'business' :
  },
  data() {
    return {
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
      business: {
        name: null,
        phone: null,
      },
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
      ],
      test: {},
      // loading: false
    }
  },
  //
  async asyncData({$axios, route}) {
    const {data} = await $axios.get(`/business/edit/${route.params.id}`)
      return {
        form: data,
      }
    },

  methods: {
    setPlace(e) {
      this.business.lat = Number(e.geometry.location.lat());
      this.business.lng = Number(e.geometry.location.lng());
      this.business.address = e.formatted_address;
    },
    onSubmit(event) {
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
      formData.append("name",this.business.name);
      formData.append('phone',this.business.phone);
      if (this.business.currency){
        formData.append('currency',this.business.currency);
      }else{
        formData.append('currency', 'EUR');
      }
      if (this.business.address){
        formData.append('address',this.business.address);
      }
      formData.append('_method', 'put');

      // console.log(this.business.currency, this.business.address)

      this.$axios.post('/business/update', formData, config).then((res) => {
        this.$router.push('/dashboard/business'),
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
        // console.log(src)
        preview.src = src;
        preview.style.display = "block";
      }
    },
  },
  mounted() {
    this.business = this.form;
    this.business.name = this.business.name.en;
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