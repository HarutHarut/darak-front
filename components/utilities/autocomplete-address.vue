<template>
     <GmapAutocomplete
         :value="city.name"
         :placeholder="$t('form.input.searchLocation')"
         aria-label=""
         class="search-location-input flex-grow-1 h-100"
         type="text"
         id="search-input"
         :options="options"
         @place_changed="setPlace"
     ></GmapAutocomplete>
</template>

<script>
export default {
   name: "autocomplete-address",
  props: ['city'],
  data() {
     return {
       options: {
         types: ['(cities)'],
       }
     }
  },
   methods: {
      selectAddress (e) {
         this.api-luglockers.xsoft.am('selectAddress',e.target.value)
      },
     setPlace(event){
        this.$emit('setPlace', event)
     },
   },

};
</script>

<style scoped>
.input{
   width: 100%;
   border: 1px solid #ced4da;
   border-radius: 4px;
}
</style>