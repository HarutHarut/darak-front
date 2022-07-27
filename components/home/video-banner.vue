<template>
    <div class="video-banner">
        <div class="video-player-box">
            <div class="video-player card-overlay">

                <iframe width="1920"
                        height="969"
                        src="https://www.youtube.com/embed/0GJWTGvt_nw?autoplay=1&amp;&mute=1;&loop=1&playlist=0GJWTGvt_nw"
                        title="LugLockers.com"
                        frameborder="0"
                        allow="autoplay"
                        allowfullscreen
                ></iframe>

            </div>
        </div>
        <div class="video-banner-text-box d-flex align-items-end h-100">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col>
                        <div class="text-center">
                            <h1 class="title-primary">{{ $t("home.mainTitle") }}...</h1>
                            <p class="subtitle-primary">{{ $t("home.subTitle") }}</p>
                            <div class="search-form-book d-flex mx-auto">
                                <form action="#"
                                      class="search-form d-flex flex-wrap justify-content-center flex-grow-1">
                                    <div class="form-input d-flex">
                                        <label for="search-input" class="search-location">
                                            <svg-icon class="base-icon" name="find"/>
                                        </label>
                                        <!-- @click="locatorButtonPressed" -->

                                        <GmapAutocomplete
                                                :placeholder="$t('form.input.searchLocation')"
                                                aria-label=""
                                                class="search-location-input flex-grow-1 h-100"
                                                type="text"
                                                id="search-input"
                                                @place_changed="setPlace"
                                                @click="locatorButtonPressed"
                                        ></GmapAutocomplete>
                                        <button type="button" @click="searchInHomePage()"
                                                class="btn-color btn btn-search">{{ $t("form.find") }}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>
<script>

    import DateRangePicker from 'vue2-daterange-picker'
    import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
    import moment from 'moment'
    import global from "~/mixins/global.js"

    export default {
        mixins: [global],
        components: {
            DateRangePicker
        },
        filters: {
            date(val) {
                const date = moment(val).format("DD.MM.YYYY HH:mm");
                return date.toString();
            },
        },
        data() {
            return {
                today: new Date(),
                searchText: null,
                dateRange: {
                    startDate: null,
                    endDate: null
                },
                location: null
            }
        },
        methods: {
            setPlace(event) {
                console.log("event", event)
                this.searchText = event
            },
            searchInHomePage() {
                if (!this.searchText & !this.lng & !this.lat) {
                    return
                }
                const data = {
                    search_text: this.searchText.name,
                    check_in: '',
                    check_out: '',
                };
                if (this.dateRange.startDate && this.dateRange.endDate) {
                    data.check_in = moment(this.dateRange.startDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                    data.check_out = moment(this.dateRange.endDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                }
                let location;
                if (this.searchText.geometry) {
                    let lng, lat
                    if (typeof this.searchText.geometry.location.lng === 'function') {
                        lng = this.searchText.geometry.location.lng();
                        lat = this.searchText.geometry.location.lat();
                    } else {
                        lng = this.searchText.geometry.location.lng;
                        lat = this.searchText.geometry.location.lat;
                    }
                    location = {
                        lng: lng,
                        lot: lat,
                    }
                } else {
                    location = {
                        lng: this.lng,
                        lot: this.lat,
                    }
                }
                let path = this.prepareUrl("/lockers/map");
                this.$router.push({
                    // name: `lockers-map___en`,
                    path: path,
                    query: {q: this.searchText.formatted_address, lng: location.lng, lot: location.lot}
                })
            },
            locatorButtonPressed() {
                let options = {}
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.reverseGeocodingWithGoogle(position.coords.latitude, position.coords.longitude)
                    }, (err) => {
                        console.log("err in map", err)
                    }, options
                )
            },
            reverseGeocodingWithGoogle(latitude, longitude) {
                fetch(this.$config.mapUrl + "&address=" + latitude + ',' + longitude)
                    .then(res => res.json())
                    .then(response => {
                        if (response.results[0]) {
                            let searchText = document.getElementById('search-input')
                            let currentPlace = JSON.parse(JSON.stringify(response.results[0]));
                            currentPlace.address_components = currentPlace.address_components.filter(el => (el.types[0] === "administrative_area_level_1" || el.types[0] === "country"))
                            currentPlace.formatted_address = currentPlace.address_components[0].long_name + ", " + currentPlace.address_components[1].long_name
                            searchText.value = currentPlace.formatted_address
                            this.searchText = JSON.parse(JSON.stringify(currentPlace))
                        }
                    })

            }
        }
    }
</script>

