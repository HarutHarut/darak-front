<template>
   <div id="app-page">
      <div class="wrapper">
         <Header :class="this.$router.history.current.path.includes('emailVerify') && 'header-white-bg'"/>
         <main class="main-page">
            <Nuxt/>
         </main>
      </div>
      <Footer/>
   </div>
</template>
<script>
import Header from '../components/layout/header.vue'
import Footer from '../components/layout/footer.vue'
export default {
   components: {
      Header,
      Footer,
   }
}

</script>
