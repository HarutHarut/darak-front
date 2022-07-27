<template>
   <b-container fluid>
      <b-row>
         <b-col>
            <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
               <PageTitle :title="title" :image="image"/>
               <div class="d-flex flex-wrap align-items-center mb-3">
                  <!--                        <div class="mr-3 mb-2 mb-sm-0">-->
                  <!--                            <b-form-select v-model="selected" :options="optionsCities"></b-form-select>-->
                  <!--                        </div>-->
                  <!--                        <div class="mr-3 mb-2 mb-sm-0">-->
                  <!--                            <b-form-select v-model="selected" :options="optionsCountry"></b-form-select>-->
                  <!--                        </div>-->
               </div>
            </div>

            <section class="static-section  mb-3 position-relative">
               <NuxtLink :to="prepareUrl('/dashboard/cities/add')" class="btn-add ml-auto">
                  <svg-icon class="base-icon" name="add-button"></svg-icon>
               </NuxtLink>
               <div class="title-box">
                  <h4 class="title p-3">Title</h4>
               </div>
               <b-table-simple responsive class="static-table">
                  <b-thead>
                     <b-tr>
                        <b-th>{{ $t("dashboard.fields.image") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.city") }}</b-th>
                        <!--                        <b-th>{{ $t("dashboard.fields.country") }}</b-th>-->
                        <b-th>{{ $t("dashboard.fields.isTopDestination") }}</b-th>
                        <b-th class="p-1">{{ $t("dashboard.fields.actions") }}</b-th>
                     </b-tr>
                  </b-thead>
                  <b-tbody>
                     <b-tr v-bind:key="city.id" v-for=" (city) in cities">
                        <b-td><img :src="city.logo" alt="" class="image-cell mx-auto"/>
                        </b-td>
                        <b-td>{{ city.name }}</b-td>
                        <!--                        <b-td>Test name</b-td>-->
                        <b-td>
                           <button type="button">
                              <span v-if="!city.top">No</span>
                              <span v-else>Yes</span>
                           </button>
                        </b-td>
                        <b-td>
                           <button type="button" class="edit-cell" @click="openEditPage(city.id)">
                              <svg-icon class="base-icon" name="edit"></svg-icon>
                           </button>
                        </b-td>
                     </b-tr>
                  </b-tbody>
               </b-table-simple>
               <div class="p-2" v-if="total > perPage || currentPage !== 1">
                  <b-pagination
                       pills
                       class="justify-content-center"
                       size="md"
                       v-model="currentPage"
                       :total-rows="total"
                       :per-page="perPage"
                       @change="getCities"
                       aria-controls="my-table"
                  ></b-pagination>
               </div>


               <b-modal hide-footer id="destination" size="md" title="Update image">
                  <b-container>
                     <div class="form-box mb-5">
                        <b-form action="#" method="post">
                           <div class="image-upload-box mb-3">
                              <label for="file-ip-1" class="text-center p-3">
                                 <span class="mb-3 d-block">{{ $t("dashboard.upload.image") }}</span>
                                 <span class="upload-preview">
                                    <img id="file-ip-1-preview" :src="logo.url" alt="" v-if="logo.url"/></span>
                              </label>
                              <input type="file" multiple name="img_one" id="file-ip-1" accept="image/*"
                                     @change="upload">
                           </div>
                           <p class="error-text">{{ errorLogoMessage }}</p>

                           <div class="text-center">
                              <button type="button" class="btn btn-blue btn-form mb-2 mr-2" @click="updateImage">
                                 {{ $t("dashboard.btn.submit") }}
                              </button>
                              <button type="button" @click="cancel" class="btn btn-color btn-form mb-2">
                                 {{ $t("dashboard.btn.cancel") }}
                              </button>
                           </div>
                        </b-form>
                     </div>
                  </b-container>
               </b-modal>
            </section>
         </b-col>
      </b-row>
   </b-container>
</template>
<script>

import PageTitle from '@/components/dashboard/page-title.vue';
import global from "~/mixins/global.js"

export default {
   mixins: [global],
   components: {
      PageTitle,
   },

   data() {
      return {
         title: this.$t('dashboard.list.cities'),
         image: 'city-solid',
         cities: [],
         selected: null,
         currentPage: 1,
         perPage: 15,
         total: 0,
         logo: {
            url: null,
            file: null
         },
         errorLogoMessage: null
      }
   },

   mounted() {
      this.getCities()
   },

   methods: {
      openEditPage(id) {
         return this.$router.push(`cities/edit/${id}`)
      },
      getCities(page = 1) {

         this.$axios.get(`admin/cities?page=${page}`).then(({data}) => {
            this.cities = data.cities.data;
            this.currentPage = data.cities.current_page
            this.total = data.cities.total

         }).catch((e) => {

         })
      },

      openModal(id) {
         this.errorLogoMessage = null;
         this.selected = id;
         this.$bvModal.show('destination');
      },

      upload(event) {
         if (event.target.files.length > 0) {
            this.logo.url = URL.createObjectURL(event.target.files[0]);
            this.logo.file = event.target.files[0];
         }
      },

      cancel() {
         this.logo.url = null;
         this.logo.file = null;
         this.$bvModal.hide('destination');
      },

      updateImage() {
         if (!this.logo.file) {
            this.errorLogoMessage = 'Logo is required.';
            return false;
         }
         const formData = new FormData;
         formData.append('logo', this.logo.file);
         formData.append('_method', 'put');

         this.$axios.post(`admin/cities/${this.selected}`, formData)
              .then(({data}) => {

                 const index = this.cities.findIndex((item) => {
                    return item.id === this.selected
                 })
                 this.cities[index] = data.city;
                 this.selected = null;
                 this.logo.url = null;
                 this.logo.file = null;
                 this.$bvModal.hide('destination');

              }).catch((e) => {

              })
      }
   }
}

</script>