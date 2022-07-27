<template>
    <div>
        <div class="search-form-book-map mx-auto">

            <div class="search-item">
                <input @change="getBranches" id="openToday" type="checkbox" v-model="queryParams.openToday">
                <label for="openToday">
                    {{ $t('map.openToday') }}
                </label>
            </div>
            <div class="search-item">
                <input @change="getBranches" id="openDayNight" type="checkbox" v-model="queryParams.openDayNight">
                <label for="openDayNight">
                    {{ $t('map.openDayAndNight') }}

                </label>
            </div>
            <!-- <label for="specificTime">
              Specific Time
              <input @change="getBranches" id="specificTime" type="checkbox" v-model="queryParams.specificTime">
            </label> -->
            <div class="search-item">
                <input @change="getBranches" id="bestRate" type="checkbox" v-model="queryParams.bestRate">
                <label for="bestRate">
                    {{ $t('map.bestRate') }}

                </label>
            </div>
            <div class="search-item">
                <input @change="getBranches" id="cardPayment" type="checkbox" v-model="queryParams.cardPayment">
                <label for="cardPayment">
                    {{ $t('map.cardPayment') }}

                </label>
            </div>

        </div>
        <div class="map-page-content map-main-page d-flex">
            <div class="map-sidebar">

                <b-modal id="modal-datepicker" hide-footer scrollable title="Filter location">
                    <div class="datepicker-box d-flex flex-wrap justify-content-center">
                        <date-range-picker
                                ref="picker"
                                :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
                                :timePicker="true"
                                :timePicker24Hour="true"
                                :date-range="{ startDate: null, endDate: null }"
                        >
                            <template v-slot:input="picker" style="max-width: 500px;">

                     <span class="picker-box d-flex align-items-center h-100">
                         <span class="rangepicker-icon"><svg-icon name="calendar"
                                                                  class="base-icon"></svg-icon></span>
                         <span class="rangepicker-text d-flex justify-content-between">
                             <span class="mr-2" v-if="picker.startDate">{{ picker.startDate | date }}</span>
                             <span class="mr-2" v-else>Check in</span>
                             <span v-if="picker.endDate">{{ picker.endDate | date }}</span>
                             <span v-else>Check out</span>
                         </span>
                     </span>
                            </template>
                        </date-range-picker>
                        <button type="button" class="btn-blue px-3">Search</button>
                    </div>
                </b-modal>


                <ul class="place-cards scroll-box">
                    <li v-if="filteredBranches.length">
                        <p>{{ filteredBranches.length + ' ' + $t('map.mapArea') }}</p>
                    </li>
                    <li v-else>
                        <p>{{ $t('map.notFound') }}</p>
                    </li>
                    <li class="place-card-item" v-for="(branch, index) in filteredBranches" v-bind:key="index">
                        <BranchCard :branch="branch"/>
                    </li>
                </ul>
            </div>
            <div class="map-content h-100">
                <GmapMap
                        :center="{lat: lot, lng: lng}"
                        :zoom="11"
                        style="width: 100%; height: 100%"
                        @bounds_changed="saveCoordinates"
                        @dragend="updateCenter"
                        ref="map"
                >
                    <GmapMarker
                            v-for="(branch, index) in filteredBranches"
                            :key="index"
                            :position="{lat: int(branch.lat), lng: int(branch.lng)}"
                            :clickable="true"
                            :draggable="false"
                            @click="currentLocation = location"
                    />
                </Gmapmap>
            </div>

            <div class="map-tabs d-flex align-items-center justify-content-between">
                <a href="#" class="tab-item list w-100  p-4 text-center" data-tab="list" @click="openMap">List</a>
                <a href="#" class="tab-item map w-100  p-4 text-center active" data-tab="map" @click="openMap">Map</a>
            </div>
        </div>

        <Seo
             :meta_title="$t('meta.cityTitle', { city: this.cityName })"
             :meta_keywords="$t('meta.cityKeywords', { city: this.cityName })"
             :meta_description="$t('meta.cityDescription', { city: this.cityName })"
             :og_image="cityLogo ? cityLogo : '/_nuxt/assets/img/logo/logo-black-text.png'"
             :twitter_image="'/_nuxt/assets/img/logo/logo-black-text.png'"
             >
        </Seo>
    </div>

</template>
<script>
    import BranchCard from "../../../components/user/BranchCard"
    import DateRangePicker from 'vue2-daterange-picker'
    import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
    import Seo from '../../../components/seo/index.vue'
    import moment from 'moment'

    export default {
        layout: "map-layout",
        components: {
            BranchCard,
            DateRangePicker,
            Seo
        },
        data() {
            return {
                cityName: '',
                cityLogo: '',
                test: {"en":"He trusts to you how it was YOUR table","ru":"Alice coming. 'There's PLENTY of room!' said Alice in a hurry to get to,' said the Mock Turtle to the game, feeling very glad she had never been in a.","ch":"I suppose I ought to have no notion how long ago anything had happened.) So she was now about a foot.","am":"Queen, 'and he shall tell you his history,' As they walked off together, Alice heard the Rabbit asked. 'No, I give it up,' Alice replied: 'what's the.","fr":"THAT'S a good deal frightened by this time). 'Don't grunt,' said Alice; 'you needn't be afraid of interrupting him,) 'I'll give him sixpence. _I_ don't."},                lot: null,
                lng: null,
                showByIndex: null,
                zoom: 11,
                filteredBranches: [],
                initialCoords: {
                    north: null,
                    south: null,
                    east: null,
                    west: null,
                    firstLoad: true,
                },
                queryParams: {
                    north: null,
                    south: null,
                    east: null,
                    west: null,
                    lng: Number(this.$route.query.lng),
                    log: Number(this.$route.query.lot),
                    openToday: 0,
                    openDayNight: 0,
                    bestRate: 0,
                    cardPayment: 0,
                },
                dateRange: {
                    startDate: null,
                    endDate: null
                },
                today: moment(new Date()).format("YYYY.MM.DD HH:mm"),
                searchFields: {
                    openToday: 'open today',
                    openDayNight: 'open day and night',
                    specificTime: 'specific time',
                    bestRate: 'best rate',
                    cardPayment: 'payment system'
                }
            };
        },
        methods: {
            int(i) {
                return Number(i);
            },
            checkLat(lat, north, south) {
                if ((lat > north && lat < south) || (lat < north && lat > south)) {
                    return true;
                }
            },
            checkLng(lng, east, west) {
                if ((lng > east && lng < west) || (lng < east && lng > west)) {
                    return true;
                }
            },
            saveCoordinates(event){
                if (event) {
                    const {north, south, east, west} = event.toJSON();
                    this.initialCoords.north = north;
                    this.initialCoords.south = south;
                    this.initialCoords.east = east;
                    this.initialCoords.west = west;
                    if(this.initialCoords.firstLoad){
                        this.initialCoords.firstLoad = false;
                        this.updateCenter();
                    }
                }
            },
            updateCenter() {
                this.queryParams.north = this.initialCoords.north
                this.queryParams.south = this.initialCoords.south
                this.queryParams.east = this.initialCoords.east
                this.queryParams.west = this.initialCoords.west
                this.getBranches()
            },
            setPlace(event) {
                this.lot = event.geometry.location.lat();
                this.lng = event.geometry.location.lng();
            },
            getBranches() {
                this.$store.dispatch('map/getBranches', this.queryParams).then((res) => {
                    //this.$refs.map.$el.setAttribute('style', 'width:100%;height:99.9%;')
                    this.filteredBranches = this.branches;
                });
            },
            getCity() {
                this.$axios.get(`/city-logo?name=${this.cityName}`).then(({data}) => {
                    this.cityLogo = data.logo;
                }).catch((e) => {

                })
            },

            openMap: function(event) {
                var tabItem = document.querySelectorAll('.tab-item');
                for(var i = 0; i < tabItem.length; i++) {
                    tabItem[i].classList.remove('active');
                }
                event.target.classList.add('active');
                if(event.target.getAttribute('data-tab') == 'list') {
                    document.querySelector('.map-sidebar').classList.add('opened');
                }
                else {
                    document.querySelector('.map-sidebar').classList.remove('opened');
                }
            }

        },
        mounted() {
            this.lng = Number(this.$route.query.lng)
            this.lot = Number(this.$route.query.lot)
            this.cityName = this.$route.query.q;
            console.log(this.cityName, 'nanwsnananan')
            this.getCity();
            // this.logo = this.props.cityLogo;
            // this.cityDesc = this.$t('meta.cityDescription', { city: this.city })
        },
        computed: {
            city() {
                return this.$store.getters['map/city'];
            },
            branches() {
                return this.$store.getters['map/branches'];
            },
        }
    }
</script>