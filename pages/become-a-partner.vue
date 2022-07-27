<template>
  <div class="become-a-partner-page">
    <Banner :title="title" :image="image" :btn="btn"></Banner>
    <b-container class="container-big">
      <section class="py-4 py-lg-5">
        <h2 class="title-secondary text-center">
          {{ $t("title.benefitsFromJoin") }}
        </h2>
        <b-row>
          <b-col md="6" lg="4" class="mb-4">
            <div class="join-us-box">
              <div class="icon-box text-center mb-4">
                <svg-icon class="lg-icon" name="link"></svg-icon>
              </div>
              <h4 class="title-tertiary text-center">{{ $t("becomePartner.header.join") }}</h4>
              <p>{{ $t("becomePartner.text.join") }}</p>
            </div>
          </b-col>
          <b-col md="6" lg="4" class="mb-4">
            <div class="join-us-box">
              <div class="icon-box text-center mb-4">
                <svg-icon class="lg-icon" name="dollar"></svg-icon>
              </div>
              <h4 class="title-tertiary text-center">{{ $t("becomePartner.header.profit") }}</h4>
              <p>
                {{ $t("becomePartner.text.profit") }}
              </p>
            </div>
          </b-col>
          <b-col md="6" lg="4" class="mb-4">
            <div class="join-us-box">
              <div class="icon-box text-center mb-4">
                <svg-icon class="lg-icon" name="megaphone"></svg-icon>
              </div>
              <h4 class="title-tertiary text-center">{{ $t("becomePartner.header.advertise") }}</h4>
              <p>{{ $t("becomePartner.text.advertise") }}</p>
            </div>
          </b-col>
        </b-row>
      </section>
      <section class="py-4 py-lg-5">
        <h2 class="title-secondary text-center">
          {{ $t("title.ourPartners") }}
        </h2>
        <b-row>
          <b-col
              cols="6"
              md="3"
              class="mb-3"
              v-for="(partner, index) in partnersList"
              v-bind:key="index"
          >
            <div class="partner-box p-2">
              <img
                  :src="require('@/assets/img/partners/' + partner)"
                  alt=""
              />
            </div>
          </b-col>
        </b-row>
      </section>
    </b-container>

    <b-modal
        id="modal-sign-partner"
        size="lg"
        class="modal-form p-0"
        hide-footer
        hide-header
        centered
    >
      <b-container class="p-0 123">
        <b-row class="m-0">
          <b-col cols="6" class="p-0 d-none d-md-block">
            <div class="modal-leftside tab-content d-flex flex-column p-5">
              <div class="title-box">
                <h2 class="title-secondary">
                  {{ $t("form.register") }}
                </h2>
                <p>{{ $t("form.signInText") }}</p>
              </div>
              <div class="img-box mt-auto">
                <img :src="require('@/assets/img/logo/logo-white-text.png')"
                     class="img-fluid"
                     alt=""/>
              </div>
            </div>
          </b-col>
          <b-col md="6" class="p-0">
            <div class="modal-sign-form">
              <b-tabs class="tabs-content d-flex flex-column">
                <b-tab
                    :title="$t('form.register')"
                    @click="clickTab('register')"
                >
                  <BecomePartner
                      :errors="this.errors"
                      v-on:submit="this.submit"
                  ></BecomePartner>
                </b-tab>
              </b-tabs>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import Banner from "../components/banner.vue"
import BecomePartner from "../components/auth/become-partner"

export default {
  components: {
    Banner,
    BecomePartner
  },

  data() {
    return {
      errors: [],
      title: this.$t("list.partner"),
      image: "become-a-partner-bg.jpeg",
      btn: this.$t("form.register"),

      partnersList: [
        "partner01.png",
        "partner02.png",
        "partner03.png",
        "partner01.png"
      ]
    }
  },
  methods: {
    clickTab(text) {
      this.tab = text
    },
    makeToast(variant = null) {
      this.$bvToast.toast('verify your email', {
        title: `Success Registered`,
        variant: 'success',
        autoHideDelay: 5000,
        solid: true
      });
      this.$bvModal.hide('modal-sign-partner');
    },
    async submit(form) {
      await this.$axios.post('/register', form).then(async (res) => {
        this.makeToast()
      }).catch((error) => {
        this.$emit('loading', false);
        const {errors} = error.response.data;
        this.errors = errors
      })
    }
  }
}
</script>
