<template>
   <div>
      <div class="search-form-book-map d-flex mx-auto">
         <span>wifi</span>
         <span>wifi</span>
         <span>wifi</span>
         <span>wifi</span>
         <!-- <form action="#" class="search-form d-flex flex-wrap flex-grow-1">
            <div class="form-input d-flex">
               <label for="search-input" class="search-location">
                  <svg-icon class="base-icon" name="find"/>
               </label>
               <input type="text" id="search-input" placeholder="City, address, location..." aria-label=""
                        class="search-location-input flex-grow-1 h-100">
            </div>
         </form>
         <button v-b-modal.modal-datepicker class="d-flex align-items-center btn" type="button">
            <svg-icon class="base-icon mr-2" name="filter"></svg-icon>
            <span>Filter</span></button> -->
      </div>   
      <div class="map-page-content map-main-page d-flex">
         <div class="map-sidebar">
            <!-- Modal datepicker -->
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
               <li class="place-card-item" v-for="(branch, index) in filteredBranches" v-bind:key="index">
                  <BranchCard :branch="branch"/>
               </li>
            </ul>
         </div>

         <div class="map-content h-100">
            <GmapMap
               :center="{lat: int(city.lat), lng: int(city.lng)}"
               :zoom="11"
               map-type-id="terrain"
               style="width: 100%; height: 850px"
               @bounds_changed="updateCenter"
            >

               <GmapMarker
                  v-for="(branch, index) in filteredBranches"
                  :key="index"
                  :position="{lat:branch.lat, lng:branch.long}"
                  :clickable="true"
                  :draggable="true"
               />

            </GmapMap>
         </div>
      </div>
   </div>
</template>

<script>
import moment from 'moment';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import BranchCard from '../../../components/user/BranchCard';

export default {
   layout: 'map-layout',
   components: {
      DateRangePicker,
      BranchCard
   },
   async asyncData({store, route}) {
      const {id} = route.params;
      await store.dispatch('map/getCity', id);
      await store.dispatch('map/getBranches');
   },
   filters: {
      date(val) {
         const date = moment(val).format("DD.MM.YYYY HH:mm");
         return date.toString();
      }
   },
   mounted() {
      console.log()
      this.$axios.get(`/branches/${this.$route.params.id}`).then((res)  => {
         console.log(res)
      })
   },
   methods: {
      int(i){
         return parseInt(i);
      },
      checkLat(lat, north, south){
         if ((lat > north && lat < south) || (lat < north && lat > south)) {
            return true;
         }
      },
      checkLng(lng, east, west){
         if ((lng > east && lng < west) || (lng < east && lng > west)) {
            return true;
         }
      },
      updateCenter(event) {

         if (event) {

            const {north, south, east, west} = event.toJSON();

            this.filteredBranches = this.branches.filter((branch) => {

               const {lat, lng} = branch;

               return this.checkLat(lat, north, south) && this.checkLng(lng, east, west);
            });
         }
      }
   },

   computed: {
      city() {
         return this.$store.getters['map/city'];
      },
      branches() {
         return this.$store.getters['map/branches'];
      },
   },
   data() {
      return {
         today: new Date(),
         filteredBranches:[],
         zoom: 11
      }
   }
}
</script> 
