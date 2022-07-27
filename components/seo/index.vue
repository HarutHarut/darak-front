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
        if(this.meta_title){
            if(this.meta_title[this.$i18n.locale] && this.meta_title[this.$i18n.locale] !== null){
                return this.meta_title[this.$i18n.locale]
            }else{
                 return this.$t("meta.title")
            }
        }

    },
    setMetaDescription() {
      let metaDescription = this.$store.app.head.meta.filter(function (elem) {
        if (elem.hid == "description") return elem.name;
      })
      let metaDesc = ""
      if (this.meta_description) {
          metaDesc = this.meta_description
          if(this.meta_description[this.$i18n.locale]){
              metaDesc = this.meta_description[this.$i18n.locale]
          }
      }
      else if (metaDescription[0].content > 0) {
        metaDesc = this.$t("meta.description")
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
      let ogImage = ''
      if (this.og_image) {
        ogImage = this.og_image
      } else if (defaultOgImage[0].content > 0) {
        ogImage = defaultOgImage[0].content
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
      let twitterImage = ''
      if (this.twitter_image) {
        twitterImage = this.twitter_image
      } else if (defaultTwitterImage[0].content > 0) {
        twitterImage = defaultTwitterImage[0].content
      }

      return {
        hid: 'og:image',
        property: 'og:image',
        content: twitterImage
      }
    }
  }
}
</script>
