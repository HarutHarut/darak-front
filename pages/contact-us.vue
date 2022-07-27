<template>
  <div>
    <Banner :title="title" :image="image"></Banner>
    <b-container>
      <section class="contact-us-section py-4 py-lg-5">
        <b-row class="justify-content-center">
          <b-col lg="8">
            <h2 class="title-secondary text-center">{{ $t("title.contact") }}</h2>
            <ul class="contact-list d-flex flex-wrap justify-content-between mb-5">
              <li class="contact-item d-flex flex-column align-items-center mr-3">
                <p class="contact-info">
                  <svg-icon class="contact-icon" name="envelope"/>
                  <span class="contact-text">{{
                      $t("mail.forCustomers")
                    }}</span>
                </p>
                <a href="mailto:info@luglockers.com"
                   target="_blank"
                   rel="nofollow"
                   class="contact-link">
                  info@luglockers.com
                </a>
              </li>
              <li class="contact-item d-flex flex-column align-items-center mr-3">
                <p class="contact-info">
                  <svg-icon class="contact-icon" name="envelope"/>
                  <span class="contact-text">{{ $t("mail.forPartners") }}</span>
                </p>
                <a href="mailto:partners@luglockers.com"
                   target="_blank"
                   rel="nofollow"
                   class="contact-link">
                  partners@luglockers.com
                </a>
              </li>
            </ul>
          </b-col>
          <b-col lg="8">
            <div class="form-box">
              <h2 class="title-secondary text-center ">
                {{ $t("title.getInTouch") }}
              </h2>
              <validation-observer
                  ref="contactForm"
                  v-slot="{ handleSubmit }"
                  class="observer"
              >
                <b-form
                    action="#"
                    method="post"
                    @submit.stop.prevent="handleSubmit(submit)"
                >
                  <b-row>
                    <b-col sm="6">
                      <b-form-group
                          class="input-required"
                          :label="$t('form.input.name')"
                          label-for="input-1"
                      >
                        <validation-provider
                            style="width: 100%"
                            v-slot="validationContext"
                            :rules="{
                                          required: true,
                                          max: 255
                                       }"
                            name="Name"
                        >
                          <b-form-input
                              v-model="form.name"
                              :placeholder="$t('form.input.name')"
                              class="form-input"
                          ></b-form-input>
                          <p class="error-text">
                            {{ validationContext.errors[0] }}
                          </p>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                          class="input-required"
                          :label="$t('form.input.lastName')"
                          label-for="input-1"
                      >
                        <validation-provider
                            style="width: 100%"
                            v-slot="validationContext"
                            :rules="{
                                          required: true,
                                          max: 255
                                       }"
                            name="lastName"
                        >
                          <b-form-input
                              v-model="form.last_name"
                              :placeholder="$t('form.input.lastName')"
                              class="form-input"
                          ></b-form-input>
                          <p class="error-text">
                            {{ validationContext.errors[0] }}
                          </p>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                          class="input phone-number-input"
                          :label="$t('form.input.tel')"
                          label-for="input-2"
                          description=""
                      >
                        <validation-provider v-slot="validationContext"
                                             :rules="{ required: false, max: 255}"
                                             name="Phone">
                          <vue-phone-number-input
                              v-model="form.phone"
                              class="form-input"
                              default-country-code="AM"
                              @update="updatePhoneNumber"
                              error-color="#FF0000"
                              clearable
                              :translations="translations"
                              color="#FF0000"
                          />
                          <p class="error-text">
                            {{ errorMessage }}
                          </p>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                          class="input-required"
                          :label="$t('form.input.email')"
                          label-for="input-3"
                          description=""
                      >
                        <validation-provider
                            style="width: 100%"
                            v-slot="validationContext"
                            :rules="{
                                          required: true,
                                          email: true,
                                          max: 255
                                       }"
                            name="email"
                        >
                          <b-form-input
                              v-model="form.email"
                              :placeholder="$t('form.input.email')"
                              class="form-input"
                          ></b-form-input>
                          <p class="error-text">
                            {{ validationContext.errors[0] }}
                          </p>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                          class="input"
                          label="Address"
                          label-for="input-4"
                          description=""
                      >
                        <b-form-input
                            v-model="form.address"
                            placeholder="Address"
                            class="form-input"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="12">
                      <b-form-group
                          class="input-required"
                          :label="$t('form.input.message')"
                          label-for="input-5"
                          description=""
                      >
                        <validation-provider
                            style="width: 100%"
                            v-slot="validationContext"
                            :rules="{
                                          required: true,
                                       }"
                            name="message"
                        >
                          <b-form-textarea
                              class="contact-textarea scroll-box"
                              rows="4"
                              v-model="form.message"
                          ></b-form-textarea>
                          <p class="error-text">
                            {{ validationContext.errors[0] }}
                          </p>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-button
                      type="submit"
                      class="btn btn-color btn-form">{{ $t("form.btn.btnSend") }}
                  </b-button
                  >
                </b-form>
              </validation-observer>
            </div>
          </b-col>
        </b-row>
      </section>
    </b-container>
    <Seo
        :meta_title="$t('meta.contactUsTitle')"
        :meta_keywords="$t('meta.contactUsKeywords')"
        :meta_description="$t('meta.contactUsDescription')"
        :og_image="image"
        :twitter_image="'/_nuxt/assets/img/logo/logo-black-text.png'"
    >
    </Seo>
  </div>
</template>

<script>
import Banner from "../components/banner.vue";
import VuePhoneNumberInput from 'vue-phone-number-input';
import Seo from '../components/seo/index.vue'
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  components: {
    Banner,
    Seo,
    VuePhoneNumberInput
  },
  data() {
    return {
      title: this.$t("list.contactUs"),
      image: "contact-us.jpg",
      errorMessage: null,
      phoneNumber: null,
      translations: {
        example: this.$t("phoneNumber.example"),
        countrySelectorLabel: this.$t("phoneNumber.countrySelectorLabel"),
        countrySelectorError: this.$t("phoneNumber.countrySelectorError"),
      },

      form: {
        name: null,
        last_name: null,
        address: null,
        email: null,
        message: null,
        phone: null
      }
    }
  },
  methods: {
    updatePhoneNumber(data) {
      this.errorMessage = null
      if (data.isValid) {
        this.phoneNumber = '+' + data.countryCallingCode + data.nationalNumber
      } else {
        this.errorMessage = this.$t("phoneNumber.countrySelectorError")
      }
    },
    submit() {
      if (!this.errorMessage) {
        this.form.phone = this.phoneNumber
        this.$axios
            .post("/contacts", this.form)
            .then(response => {
              this.form = {
                name: '',
                last_name: '',
                address: null,
                email: null,
                message: null,
                phone: null
              }
              this.$refs.contactForm.reset()


              this.$bvToast.toast('Message successfully sent.', {
                title: `Message sent`,
                variant: 'success',
                solid: true
              });
            })
            .catch(error => {
              switch (error.response.status) {
                case 422:
                  const {errors} = error.response.data
                  this.$refs.contactForm.setErrors(errors)

                  break
              }
            })
      }
    }
  }
}
</script>

<style scoped>
.phone-number-input span {
  display: block;
}
</style>