<template>
   <div id="app">
      <div class="wrapper office-page-wrapper d-flex flex-column">
         <Header @toggleNav="navOpen = !navOpen" />
         <SideBar :open="navOpen" />
         <main class="office-page-main py-3" :class="{ paddingLeft: navOpen }">
            <Nuxt />
         </main>
      </div>
   </div>
</template>

<script>
import Header from "../components/layout/office/header.vue"
import SideBar from "../components/layout/office/sidebar.vue"

export default {
   head() {
      return {

      };
   },
   data() {
      return {
         navOpen: true
      }
   },
   components: {
      Header,
      SideBar
   },
   middleware: ["auth", "businessOrAdmin"],

   mounted() {
      if (
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
         )
      ) {
         this.navOpen = false
      }
   }
}
</script>
