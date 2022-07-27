<template>
  <div>
    <Header class="header-white-bg"/>
    <main>
      <Nuxt/>
    </main>
  </div>
</template>

<script>

import Header from '../components/layout/header.vue'

export default {
  components: {
    Header
  }
}

</script>