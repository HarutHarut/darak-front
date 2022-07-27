<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
                    <PageTitle :title="title" :image="image" />
                    <div class="d-flex flex-wrap align-items-center mb-3">
                        <div class="mr-3 mb-2 mb-sm-0">
                            <b-form-select v-model="selected" :options="optionsCities"></b-form-select>
                        </div>
                    </div>
                </div>
                
                <section class="static-section  mb-3 position-relative">
                    <NuxtLink to="/dashboard/add-country"  class="btn-add ml-auto">
                        <svg-icon class="base-icon" name="add-button"></svg-icon>
                    </NuxtLink>
                    <div class="title-box">
                        <h4 class="title p-3">Title</h4>
                    </div>
                    <b-table-simple responsive class="static-table">
                        <b-thead>
                            <b-tr>
                                <b-th>{{$t("dashboard.fields.image")}}</b-th>
                                <b-th>{{$t("dashboard.fields.country")}}</b-th>
                                <b-th class="p-1">{{$t("dashboard.fields.actions")}}</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr>
                                <b-td><img :src="require('@/assets/img/country/country01.jpeg')" alt="" class="image-cell mx-auto" /></b-td>
                                <b-td>Test name</b-td>
                                <b-td><button type="button" class="edit-cell" v-b-modal.destination><svg-icon class="base-icon" name="edit"></svg-icon></button></b-td>
                            </b-tr>
                            <b-tr>
                                <b-td><img :src="require('@/assets/img/country/country02.jpeg')" alt="" class="image-cell mx-auto" /></b-td>
                                <b-td>Test name</b-td>
                                <b-td><button type="button" class="edit-cell" v-b-modal.destination><svg-icon class="base-icon" name="edit"></svg-icon></button></b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>

                    <b-modal hide-footer id="destination" size="md" title="Update image">
                        <b-container>
                            <div class="form-box my-2">
                                <b-row>
                                    <b-col>
                                        <b-form action="#" method="post"  @reset="onReset" v-if="show">
                                            <b-form-group
                                                label="Name"
                                                label-for="input-1"
                                                >
                                                <b-form-input
                                                id="input-1"
                                                type="text"
                                                required
                                                ></b-form-input>
                                            </b-form-group>      
                                            <div class="image-upload-box mb-3">
                                                <label for="file-ip-1" class="text-center p-3">
                                                    <span class="mb-3 d-block">{{$t("dashboard.upload.image")}}</span>
                                                    <span class="upload-preview"><img id="file-ip-1-preview" :src="require('@/assets/img/upload.png')" alt="" /></span>
                                                </label>
                                                <input type="file" multiple name="img_one" id="file-ip-1" accept="image/*" @change="showPreviewOne">
                                            </div>
                                            <button type="button"  class="btn btn-blue btn-form mb-2 mr-2">{{$t("dashboard.btn.submit")}}</button>
                                            <button type="button" @click="onReset" class="btn btn-color btn-form mb-2">{{$t("dashboard.btn.cancel")}}</button>
                                        </b-form>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-container>
                    </b-modal>
                </section>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import PageTitle from '@/components/dashboard/page-title.vue'
import DatePicker from '@/components/dashboard/datepicker.vue'

export default {
 
    components: {
        PageTitle,
        DatePicker,
    },

    data () {
        return {
            title:  this.$t('dashboard.list.countries'),
            image: 'country',
        
            form: {
                    preview: null,
                    image: null,
                    preview_list: [],
                    image_list: []
                },

            destination: false,
            show: true,
            value: '',
            selected : null,

            optionsCities: [
                { value: 'null', text: 'Cities', disabled: true },
                { value: 'City1', text: 'City1' },
                { value: 'City2', text: 'City2' },
                { value: 'City3', text: 'City3' },
            ],

            optionsCountry: [
                { value: 'null', text: 'Country', disabled: true },
                { value: 'Country1', text: 'Country1' },
                { value: 'Country2', text: 'Country2' },
                { value: 'Country3', text: 'Country3' },
            ]
        }
    },
  
    methods: {
        onSubmit(event) {
        },

        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.selected = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
        },

        showPreviewOne(event){
            if(event.target.files.length > 0){
                let src = URL.createObjectURL(event.target.files[0]);
                let preview = document.getElementById("file-ip-1-preview");
                preview.src = src;
                preview.style.display = "block";
            } 
        },

        changeDestination() {
            this.destination = !this.destination;
        },
        
    }
}

</script>