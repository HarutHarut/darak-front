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
                            <h2 class="title-secondary text-center">
                                {{ $t("dashboard.edit.blog") }}
                            </h2>
                            <div class="form-box">
                                <b-form
                                        action="#"
                                        method="post"
                                        @submit.stop.prevent="handleSubmit(updateBlog)"
                                >
                                    <b-row>
                                        <b-col sm="12">
                                            <div class="image-upload-box mb-3">
                                                <label for="file-ip-1" class="text-center p-3">
                                                    <span class="mb-3 d-block">{{ $t("dashboard.upload.wallpaper") }}</span>
                                                    <span class="upload-preview">
                          <img v-if="form.logo || logo" id="file-ip-1-preview" :src="form.logo" alt="">
                          <img v-else :src="require('@/assets/img/upload.png')" alt=""/>
                        </span>
                                                </label>
                                                <input type="file" :src="form.logo" multiple name="logo" id="file-ip-1"
                                                       accept="image/*" @change="showPreviewOne">

                                            </div>
                                        </b-col>

                                        <b-col sm="12" class="pt-2">
                                            <TranslationField
                                                    :title="form.title"
                                                    :description="form.desc"
                                            ></TranslationField>
                                        </b-col>
                                        <div class="pl-4 pb-2" v-if="transError">
                                            <p class="error-text">
                                                {{ $t("dashboard.list.translationFields") }}.
                                            </p>
                                        </div>
                                    </b-row>
                                    <div style="text-align: center">
                                        <button
                                                type="submit"
                                                class="btn btn-blue btn-form mb-2 mt-3"
                                        >
                                            {{ $t("dashboard.btn.submit") }}
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
    // import SeoTranslationField from "../../../../components/buisness/branch/add/seo-translation-fields"
    import TranslationField from "../../../../components/dashboard/blog/add/translation-fields"

    export default {
        components: {
            // SeoTranslationField,
            TranslationField,
        },

        data() {
            return {
                logo: null,
                form: {
                    title: {
                        fr: "",
                        am: "",
                        ru: "",
                        ch: "",
                        de: "",
                        sp: "",
                        en: ""
                    },
                    desc: {
                        fr: "",
                        am: "",
                        ru: "",
                        ch: "",
                        de: "",
                        sp: "",
                        en: ""
                    }
                },
                blog_id: null,
                transError: false,
                imageError: false,
                errorMessage: null,
                translations: {
                    example: this.$t("phoneNumber.example"),
                    countrySelectorLabel: this.$t("phoneNumber.countrySelectorLabel"),
                    countrySelectorError: this.$t("phoneNumber.countrySelectorError"),
                },
            }
        },
        // props: ['blog'],

        async asyncData({$axios, route}) {
            // console.log(route.params)
            const {data} = await $axios.get(`/blogs/${route.params.slug}`)
            return {
                // socialMedia: socialLinks,
                form: data.blog,
                blog_id: data.blog.id,
            }
        },

        methods: {
            int(i) {
                return +i;
            },

            showPreviewOne(event) {
                if (event.target.files.length > 0) {
                    this.logo = event.target.files[0]
                    this.form.logo = URL.createObjectURL(event.target.files[0]);
                }
            },

            updateBlog() {

                const formData = new FormData()
                if (this.logo) {
                  formData.append("logo", this.logo);
                }

                for (const prop in this.form) {
                    if (prop === "title") {
                        for (let previewKey in this.form[prop]) {
                            formData.append(
                              `title[${previewKey}]`,
                              this.form[prop][previewKey]
                      )
                    }
                  } else if (prop === "desc") {
                    for (let previewKey in this.form[prop]) {
                      formData.append(
                              `desc[${previewKey}]`,
                              this.form[prop][previewKey]
                      )
                    }
                  }

                  else  if (prop !== 'logo'){
                    formData.append(prop, this.form[prop])
                  }
                }
                formData.append("_method", "patch")
                this.transError = false
                this.imageError = false
                this.$axios
                    .post("admin/blogs/" + this.blog_id, formData,
                        {
                              headers: {
                                'Content-Type': 'multipart/form-data'
                              }
                            }
                    )
                    .then((res) => {
                        console.log(res.data.message)
                        this.$bvToast.toast(res.data.message, {
                            title: '',
                            variant: "success",
                            solid: true
                        })
                        // window.location.reload();
                    }).catch(error => {
                  switch (error.response.status) {
                    case 422:
                      const {errors} = error.response.data
                      // this.$refs.branchAdd.setErrors(errors)
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
