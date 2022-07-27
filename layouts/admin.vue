<template>
  <div id="app">
    <div class="wrapper dashboard-page-wrapper d-flex flex-column">
      <Header @toggleNav="navOpen = !navOpen"/>
      <SideBar :open="navOpen"/>
      <main class="dashboard-page-main py-3" :class="{ paddingLeft: navOpen }">
        <Nuxt/>
      </main>
    </div>
  </div>
</template>

<script>

import Header from '../components/layout/dashboard/header.vue'
import SideBar from '../components/layout/dashboard/sidebar.vue'

export default {
  data() {
    return {
      navOpen: true,
    }
  },
  components: {
    Header,
    SideBar
  },
  middleware: ['auth', 'admin'],

  mounted() {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.navOpen = false;
    }
  }
}

</script>
