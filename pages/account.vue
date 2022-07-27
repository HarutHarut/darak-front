<template>
   <div class="account-page">
      <Banner :title="title" :image="image"></Banner>
      <b-container class="account-page-content">
         <b-row class="py-5">
            <b-col lg="3 mt-5 mb-4 mb-lg-0">
               <div class="sidebar-account">
                  <ul class="menu d-flex flex-row flex-wrap flex-lg-column">
                     <li class="menu-item mr-4" v-for="(navLink, index) in navLinks" v-bind:key="index">
                        <NuxtLink class="menu-link d-flex align-items-center" exact active-class="active"
                                  :to="prepareUrl(navLink.url)" no-prefetch>
                           <svg-icon class="base-icon mr-3" :name="navLink.icon"></svg-icon>
                           <span>{{ navLink.name }}</span>
                        </NuxtLink>
                     </li>
                  </ul>
               </div>
            </b-col>

            <b-col lg="9">
               <NuxtChild/>
            </b-col>
         </b-row>
      </b-container>
   </div>
</template>

<script>

import Banner from '../components/banner.vue'
import global from "~/mixins/global.js"

export default ({
   mixins: [global],
   components: {
      Banner
   },

   layout:'account',
   data() {

      return {
         title: this.$t('list.account'),
         image: 'account-bg.jpg',

         navLinks: [
            {
               url: "/account",
               name: "Dashboard",
               icon: "dashboard",
            },
            {
               url: "/account/orders",
               name: this.$t('list.orders'),
               icon: "basket",
            },
            {
               url: "/account/details",
               name: this.$t('list.accountDetails'),
               icon: "user",
            },
           {
             url: "/account/password",
             name: this.$t('list.security'),
             icon: "security",
           },
            {
               url: "/account/logout",
               name: this.$t('form.logOut'),
               icon: "logout",
            },

         ]
      };
   }
})
</script>
