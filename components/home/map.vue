<template>
   <div class="map-section pb-1 pr-1">
      <GMap
           ref="gMap"
           language="en"
           :cluster="{options: {styles: clusterStyle}}"
           :center="{lat: locations[0].lat, lng: locations[0].lng}"
           :options="{fullscreenControl: false, styles: mapStyle}"
           :zoom="6"
           @center_changed="test"
      />


   </div>
</template>

<script>

export default ({
   data() {
      return {
         currentLocation: {},
         circleOptions: {},
         locations: [
            {
               lat: 40.19,
               lng: 44.52
            },
            {
               lat: 45.815,
               lng: "15.9819"
            },
            {
               lat: "45.12",
               lng: "16.21"
            }
         ],
         pins: {
            selected: "data:image/png;base64,iVBORw0KGgo...",
            notSelected: "data:image/png;base64,iVBORw0KGgo..."
         },
         mapStyle: [],
         clusterStyle: [
            {
               url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
               width: 56,
               height: 56,
               textColor: "#fff"
            }
         ]
      }


   },

})
</script>
