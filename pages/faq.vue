<template>
  <div>
    <Banner :title="title" :image="image"></Banner>
<!--    <section class="faq-section static-content py-4 py-lg-5">-->
<!--      <b-container>-->
<!--        <b-row class="justify-content-center">-->
<!--          <b-col md="10" cols="12">-->
<!--            <h2 class="title-secondary text-center mb-2">{{$t ("title.faq.title") }}</h2>-->
<!--            <p class="text-center mb-4">{{$t ("title.faq.subtitle")}}</p>-->
<!--            <div class="accordion" role="tablist">-->
<!--              <b-card no-body class="mb-1">-->
<!--                <div role="tab" class="question">-->
<!--                  <button class="d-flex justify-content-between w-100  text-left p-3" block v-b-toggle.accordion-1>-->
<!--                    <span>{{$t("faqs.question1.title")}}</span>-->
<!--                    <span class="when-opened ml-2">-->
<!--                        <svg-icon class="base-icon" name="up-chevron"></svg-icon>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">-->
<!--                  <b-card-body>-->
<!--                    <b-card-text>{{$t("faqs.question1.p1")}}</b-card-text>-->
<!--                  </b-card-body>-->
<!--                </b-collapse>-->
<!--              </b-card>-->

<!--              <b-card no-body class="mb-1">-->
<!--                <div role="tab" class="question">-->
<!--                  <button class="d-flex justify-content-between w-100  text-left p-3" block v-b-toggle.accordion-2 >-->
<!--                    <span>{{$t("faqs.question2.title")}}</span>-->
<!--                    <span class="when-opened ml-2">-->
<!--                        <svg-icon class="base-icon" name="up-chevron"></svg-icon>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">-->
<!--                  <b-card-body>-->
<!--                    <b-card-text>{{$t("faqs.question2.p1")}}</b-card-text>-->
<!--                  </b-card-body>-->
<!--                </b-collapse>-->
<!--              </b-card>-->
<!--              <b-card no-body class="mb-1">-->
<!--                <div role="tab" class="question">-->
<!--                  <button class="d-flex justify-content-between w-100  text-left p-3" block v-b-toggle.accordion-3 >-->
<!--                    <span>{{$t("faqs.question3.title")}}</span>-->
<!--                    <span class="when-opened ml-2">-->
<!--                      <svg-icon class="base-icon" name="up-chevron"></svg-icon>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">-->
<!--                  <b-card-body>-->
<!--                    <b-card-text>{{$t("faqs.question3.p1")}}</b-card-text>-->
<!--                  </b-card-body>-->
<!--                </b-collapse>-->
<!--              </b-card>-->
<!--              <b-card no-body class="mb-1">-->
<!--                <div role="tab" class="question">-->
<!--                  <button class="d-flex justify-content-between w-100  text-left p-3" block v-b-toggle.accordion-4 >-->
<!--                    <span>{{$t("faqs.question4.title")}}</span>-->
<!--                    <span class="when-opened ml-2">-->
<!--                      <svg-icon class="base-icon" name="up-chevron"></svg-icon>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">-->
<!--                  <b-card-body>-->
<!--                    <b-card-text>{{$t("faqs.question4.p1")}}</b-card-text>-->
<!--                  </b-card-body>-->
<!--                </b-collapse>-->
<!--              </b-card>-->
<!--              <b-card no-body class="mb-1">-->
<!--                <div role="tab" class="question">-->
<!--                  <button class="d-flex justify-content-between w-100  text-left p-3" block v-b-toggle.accordion-5 >-->
<!--                    <span>{{$t("faqs.question5.title")}}</span>-->
<!--                    <span class="when-opened ml-2">-->
<!--                      <svg-icon class="base-icon" name="up-chevron"></svg-icon>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">-->
<!--                  <b-card-body>-->
<!--                    <b-card-text>{{$t("faqs.question5.p1")}}</b-card-text>-->
<!--                  </b-card-body>-->
<!--                </b-collapse>-->
<!--              </b-card>-->
<!--              <b-card no-body class="mb-1">-->
<!--                <div role="tab" class="question">-->
<!--                  <button class="d-flex justify-content-between w-100  text-left p-3" block v-b-toggle.accordion-6 >-->
<!--                    <span>{{$t("faqs.question6.title")}}</span>-->
<!--                    <span class="when-opened ml-2">-->
<!--                      <svg-icon class="base-icon" name="up-chevron"></svg-icon>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">-->
<!--                  <b-card-body>-->
<!--                    <b-card-text>{{$t("faqs.question6.p1")}}</b-card-text>-->
<!--                  </b-card-body>-->
<!--                </b-collapse>-->
<!--              </b-card>-->
<!--              <b-card no-body class="mb-1">-->
<!--                <div role="tab" class="question">-->
<!--                  <button class="d-flex justify-content-between w-100  text-left p-3" block v-b-toggle.accordion-7 >-->
<!--                    <span>{{$t("faqs.question7.title")}}</span>-->
<!--                    <span class="when-opened ml-2">-->
<!--                      <svg-icon class="base-icon" name="up-chevron"></svg-icon>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">-->
<!--                  <b-card-body>-->
<!--                    <b-card-text>{{$t("faqs.question7.p1")}}</b-card-text>-->
<!--                  </b-card-body>-->
<!--                </b-collapse>-->
<!--              </b-card>-->
<!--            </div>-->
<!--          </b-col>-->
<!--        </b-row>-->
<!--      </b-container>-->
<!--    </section>-->

    <section class="how-works-section static-content py-4 py-lg-5">
      <b-container>
        <b-row v-if="data">
          <b-col v-html="data['description_' + $i18n.locale]" />
        </b-row>
      </b-container>
    </section>

    <Seo v-if="data"
         :meta_title="data.meta_title ? data.meta_title : ''"
         :meta_keywords="data.meta_keywords ? data.meta_keywords : ''"
         :meta_description="data.meta_description ? data.meta_description : ''"
         :og_image="this.$config.cdnUrl + '/img/logo.jpg'"
         :twitter_image="this.$config.cdnUrl + '/img/logo.jpg'"
    >
    </Seo>
  </div>
</template>

<script>

import Banner from '../components/banner.vue'
import Seo from '../components/seo/index.vue'

export default {
  components: {
    Banner,
    Seo
  },
  data () {
    return {
      data: null,
      title: this.$t('title.faq.title'),
      image: 'faq-page-banner.jpg'
    }
  },
  mounted() {
    this.$axios.get('/static-page?name=faq').then((res) => {
      this.data = res.data
      this.title = this.getTransValue(this.data.title,this.$i18n.locale)
    })
  },
  methods: {
    getTransValue(val, lang) {
      return val[lang]
    }
  }
}

</script>