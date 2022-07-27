import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyC3SC8deKRcyq8xsWSwW5TzHlcL6bJdHTg",
        libraries: "places",
        language: 'en'
    }
});
