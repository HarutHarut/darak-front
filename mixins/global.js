export default {
    components: {
    },
    data() {
        return {}
    },
    methods: {
        prepareUrl(url){
            if (this.$i18n.locale == 'en')
                return url;
            return "/" + this.$i18n.locale + url
        }
    }
}