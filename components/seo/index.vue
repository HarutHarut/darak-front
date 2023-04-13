<template></template>
<script>
export default {
  props: [
    'meta_title',
    'meta_keywords',
    'meta_description',
    'og_image',
    'twitter_image'
  ],
  head() {
    return {
      title: this.setMetaTitle(),
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        this.setMetaDescription(),
        this.setMetaKeywords(),
        this.setOgImage(),
        this.setTwitterImage(),
      ]
    }
  },
  methods: {
    setMetaTitle() {
        let metaDesc = '';
        if(this.meta_title){
            metaDesc = this.meta_title;
            if(this.meta_title[this.$i18n.locale] && this.meta_title[this.$i18n.locale] !== null){
                metaDesc = this.meta_title[this.$i18n.locale];
                // return this.meta_title[this.$i18n.locale]
            }else{
                metaDesc = this.$t("meta.title");
                 // return this.$t("meta.title")
            }
        }
        if(this.meta_title[this.$i18n.locale] === undefined){
            metaDesc = this.meta_title  //this.$t("meta.cityTitle");
        }

        if(this.meta_title === ''){
            metaDesc = this.$t('home.subTitle');
        }

        return metaDesc;

    },
    setMetaDescription() {
      let metaDescription = this.$store.app.head.meta.filter(function (elem) {
        if (elem.hid == "description") return elem.name;
      })
      let metaDesc = ""
      if (this.meta_description) {
          metaDesc = this.meta_description
          if(this.meta_description[this.$i18n.locale] && this.meta_description[this.$i18n.locale] !== null){
              metaDesc = this.meta_description[this.$i18n.locale]
          }
          else{
              metaDesc = this.meta_description.en
          }
      }
      else if (metaDescription[0].content > 0) {
        metaDesc = this.$t("meta.description")
      }

      if(metaDesc === undefined){
          metaDesc = this.meta_description
      }

        if(this.meta_description === ''){
            metaDesc = this.$t("meta.homeMetaDescription")
        }

        return {
        hid: 'description',
        name: 'description',
        content: metaDesc
      }
    },
    setMetaKeywords() {
      let metaKeywords = this.$store.app.head.meta.filter(function (elem) {
        if (elem.hid == "keywords") return elem.name;
      })
      let metaKeyword = ''
      if (this.meta_keywords) {
          metaKeyword = this.meta_keywords
          if(this.meta_keywords[this.$i18n.locale]){
              metaKeyword = this.meta_keywords[this.$i18n.locale]
          }

      } else if (metaKeywords[0].content > 0) {
        metaKeyword = this.$t("meta.keywords")
      }

        if(this.meta_keywords === ''){
            metaKeyword = this.$t("meta.keywords")
        }

      return {
        hid: 'keywords',
        name: 'keywords',
        content: metaKeyword
      }
    },
    setOgImage() {
      let defaultOgImage = this.$store.app.head.meta.filter(function (elem) {
        if (elem.hid == "og:image") return elem.name;
      })
      let ogImage = this.og_image

        if(this.og_image === ''){
            ogImage = this.$config.cdnUrl + '/img/logo.jpg'
        }

      return {
        hid: 'og:image',
        property: 'og:image',
        content: ogImage
      }
    },
    setTwitterImage() {
      let defaultTwitterImage = this.$store.app.head.meta.filter(function (elem) {
        if (elem.hid == "twitter:image") return elem.name;
      })
      let twitterImage = this.og_image

        if(this.og_image === ''){
            twitterImage = this.$config.cdnUrl + '/img/logo.jpg'
        }

      return {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: twitterImage
      }
    }
  }
}
</script>
