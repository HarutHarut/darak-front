<template>
  <b-container fluid>
    <validation-observer
        ref="branchAdd"
        v-slot="{ handleSubmit }"
        class="observer"
    >
      <b-row class="justify-content-center">
        <b-col xl="7" lg="9">
          <div class="base-card card mb-3">
            <div class="card-body">
              <h2 class="title-secondary text-center ">
                {{ $t("dashboard.add.blog") }}
              </h2>
              <div class="form-box">
                <b-form
                    action="#"
                    method="post"
                    @submit.stop.prevent="handleSubmit(addBlog)"
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
                        </label>
                        <input type="file" :src="form.logo" multiple name="logo"
                               id="file-ip-1"
                               accept="image/*" @change="showPreviewOne">
                      </div>
                    </b-col>
                    <b-col sm="12" class="pt-2">
                      <TranslationField
                          :title="form.title"
                          :description="form.description"
                      ></TranslationField>
                    </b-col>
                    <div class="pl-4 pb-2" v-if="transError">
                      <p class="error-text">
                        {{ $t("dashboard.list.translationFields") }}.
                      </p>
                    </div>

                  </b-row>
                  <div style="text-align: center">
                    <button type="submit" class="btn btn-blue btn-form mb-2 mt-3"> {{ $t("dashboard.btn.submit") }}
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
// import SeoTranslationField from "../../../components/buisness/branch/add/seo-translation-fields"
import TranslationField from "../../../components/dashboard/blog/add/translation-fields"
import moment from "moment";

export default {
  components: {
    // SeoTranslationField,
    TranslationField,
  },

  data() {
    return {
      transError: false,
      imageError: false,
      errorMessage: null,
      errors: {},

      form: {
        logo: null,
        title: {
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
        meta_title: {
          fr: "",
          am: "",
          ru: "",
          ch: "",
          de: "",
          sp: "",
          en: ""
        },
        meta_description: {
          fr: "",
          am: "",
          ru: "",
          ch: "",
          de: "",
          sp: "",
          en: ""
        },
        meta_keywords: {
          fr: "",
          am: "",
          ru: "",
          ch: "",
          de: "",
          sp: "",
          en: ""
        }
      },
      images: [],
      logo: null,
    }
  },
  methods: {
    addBlog() {

      this.transError = false
      this.imageError = false
      const formData = new FormData()

      for (const prop in this.form) {
        if (prop === "title") {
          for (let previewKey in this.form[prop]) {
            formData.append(
                `title[${previewKey}]`,
                this.form[prop][previewKey]
            )
          }
        } else if (prop === "description") {
          for (let previewKey in this.form[prop]) {
            formData.append(
                `desc[${previewKey}]`,
                this.form[prop][previewKey]
            )
          }
        }
        // else if (prop === "meta_title") {
        //   for (let previewKey in this.form[prop]) {
        //     formData.append(
        //         `meta_title[${previewKey}]`,
        //         this.form[prop][previewKey]
        //     )
        //   }
        // }
        // else if (prop === "meta_description") {
        //   for (let previewKey in this.form[prop]) {
        //     formData.append(
        //         `meta_description[${previewKey}]`,
        //         this.form[prop][previewKey]
        //     )
        //   }
        // }
        // else if (prop === "meta_keywords") {
        //   for (let previewKey in this.form[prop]) {
        //     formData.append(
        //         `meta_keywords[${previewKey}]`,
        //         this.form[prop][previewKey]
        //     )
        //   }
        // }
       else {
          formData.append(prop, this.form[prop])
        }
      }
      formData.append("logo", this.form.logo)

      let data = formData

      this.$axios
          .post("admin/blogs", data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.$router.push('/dashboard/blogs')
          })
          .catch(error => {
            // console.log(error.response.data)
            switch (error.response.status) {
              case 422:
                const {errors} = error.response.data
                    this.errors = errors;
                // console.log(errors)

                this.$refs.branchAdd.setErrors(errors)

                for (const prop in errors) {
                  if (
                      prop.search("description") > -1 ||
                      prop.search("title") > -1
                  ) {
                    this.transError = true
                  }
                }
                break
            }
          })
    },

    showPreviewOne(event) {
      if (event.target.files.length > 0) {
        this.logo = URL.createObjectURL(event.target.files[0])
        this.form.logo = event.target.files[0];
        let src = URL.createObjectURL(event.target.files[0]);
      }
    },

  },
  mounted() {
    // this.getBusinesses()
  },
  filters: {
    getTransValue(val, lang) {
      return val[lang]
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