<template>
   <b-container>
      <div class="form-box">
         <validation-observer ref="StaticForm" v-slot="{ handleSubmit }" class="observer">
            <b-form action="#" method="post" @submit.stop.prevent="handleSubmit(submit)">
               <b-row>
                  <b-col cols="12">
                     <div>
                        <b-card no-body>
                           <b-tabs card>
                              <b-tab title="Ру" active>
                                 <b-form-group
                                         :label="$t('dashboard.fields.title')"
                                         label-for="input-1">
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.title.ru"
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                         label="Description"
                                         label-for="static-textarea">
                                    <ckeditor v-model="form.description_ru"></ckeditor>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="Eng">
                                 <b-form-group
                                         :label="$t('dashboard.fields.title')"
                                         label-for="input-1">
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.title.en"
                                            placeholder=""
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                         label="Description"
                                         label-for="static-textarea">
                                   <ckeditor v-model="form.description_en"></ckeditor>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="Fra">
                                 <b-form-group
                                         :label="$t('dashboard.fields.title')"
                                         label-for="input-1">
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.title.fr"
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                         label="Description"
                                         label-for="static-textarea">
                                   <ckeditor v-model="form.description_fr"></ckeditor>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="中文">
                                 <b-form-group
                                         :label="$t('dashboard.fields.title')"
                                         label-for="input-1">
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.title.ch"
                                            placeholder=""
                                    ></b-form-input>
                                 </b-form-group>

                                 <b-form-group
                                         label="Description"
                                         label-for="static-textarea">
                                   <ckeditor v-model="form.description_ch"></ckeditor>
                                 </b-form-group>
                              </b-tab>

                              <b-tab title="Հայ">
                                 <b-form-group
                                         :label="$t('dashboard.fields.title')"
                                         label-for="input-1" >
                                    <b-form-input
                                            id="input-1"
                                            v-model="form.title.am"
                                            placeholder=""
                                    ></b-form-input>
                                 </b-form-group>
                                 <b-form-group
                                         label="Description"
                                         label-for="static-textarea">
                                   <ckeditor v-model="form.description_am"></ckeditor>
                                 </b-form-group>
                              </b-tab>
                           </b-tabs>
                        </b-card>
                     </div>
                  </b-col>
                  <p class="error-text">{{ translationFieldsError }}</p>
<!--                  {{ formData.meta_keywords }}-->
                  <b-col sm="12" class="pt-2">
                  <b-col cols="12" class="px-0">
                        <div>
                           <b-card no-body header="SEO">
                              <b-tabs card>
                                 <b-tab title="Eng" active>
                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.title')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_title.en"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.description')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_description.en"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.keywords')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_keywords.en"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>
                                 </b-tab>
                                 <b-tab title="Рус">
                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.title')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_title.ru"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.description')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_description.ru"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.keywords')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_keywords.ru"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>
                                 </b-tab>
                                 <b-tab title="Fra">
                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.title')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_title.fr"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.description')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_description.fr"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.keywords')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_keywords.fr"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>
                                 </b-tab>

                                 <b-tab title="中文">
                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.title')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_title.ch"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.description')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_description.ch"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.keywords')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_keywords.ch"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>
                                 </b-tab>

                                 <b-tab title="Հայ">
                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.title')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_title.am"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.description')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_description.am"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                            :label="$t('dashboard.seo.meta.keywords')"
                                            label-for="input-11"
                                    >
                                       <b-form-input
                                               id="input-11"
                                               v-model="form.meta_keywords.am"
                                               placeholder=""
                                       ></b-form-input>
                                    </b-form-group>
                                 </b-tab>
                              </b-tabs>
                           </b-card>
                        </div>
                     </b-col>
                  </b-col>
               </b-row>
               <div class="text-center p-2">
                  <button type="submit" class="btn btn-blue btn-form">
                     {{ $t("dashboard.btn.submit") }}
                  </button>
               </div>
            </b-form>
         </validation-observer>
      </div>
   </b-container>
</template>

<script>
import SeoTranslationField from "../../../components/buisness/branch/add/seo-translation-fields"

export default {
   components: {
      SeoTranslationField,
   },
   name: "form-static",
   props: ["statics","translationFieldsError","formData"],
   data() {
      return {
         form: {
            title: {},
            description: {},
            meta_title: {},
            meta_description: {},
            meta_keywords: {}
         },
      }
   },
   filters: {
      getTransValue(val, lang) {
         return val[lang];
      }
   },
   methods: {
      submit() {
         this.$emit('submit', this.form)
      }
   },
   mounted() {
      this.form = JSON.parse(JSON.stringify(this.formData))
   }

};
</script>