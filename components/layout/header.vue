<template>
   <header class="header">
      <b-container>
         <b-navbar toggleable="lg" class="">
            <NuxtLink class="logo-link" :to="prepareUrl('/')">
               <img
                  :src="require('@/assets/img/logo/logo-white-text.png')"
                  class="logo-img logo-white img-fluid"
                  alt="logo"
               />
               <img
                  :src="require('@/assets/img/logo/logo-black-text.png')"
                  class="logo-img logo-black img-fluid"
                  alt="logo"
               />
            </NuxtLink>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="order-lg-2 ml-auto flex-row align-items-center">
               <b-nav-item-dropdown class="menu-center menu-lang">
                  <template #button-content>
                     <img
                        :src="require('../../assets/img/lang/' + flag)"
                        alt='flag'
                        class="lang-img"
                     />
                  </template>
                  <b-dropdown-item
                     href="#"
                     @click="selectLang('en', 'united-kingdom')"
                  >
                     <img
                        :src="require('@/assets/img/lang/united-kingdom.png')"
                        alt="united kingdom"
                        class="lang-img"
                     />
                  </b-dropdown-item>
                  <b-dropdown-item
                     href="#"
                     @click="selectLang('am','armenia')"
                  >
                     <img
                        :src="require('@/assets/img/lang/armenia.png')"
                        alt="armenia"
                        class="lang-img"
                     />
                  </b-dropdown-item>
                  <b-dropdown-item
                     href="#"
                     @click="selectLang('ru', 'russia')"
                  >
                     <img
                        :src="require('@/assets/img/lang/russia.png')"
                        alt="russia"
                        class="lang-img"
                     />
                  </b-dropdown-item>
                  <b-dropdown-item
                     href="#"
                     @click="selectLang('fr', 'france')"
                  >
                     <img
                        :src="require('@/assets/img/lang/france.png')"
                        alt="france"
                        class="lang-img"
                     />
                  </b-dropdown-item>

                  <b-dropdown-item
                     href="#"
                     @click="selectLang('ch', 'china')"
                  >
                     <img
                        :src="require('@/assets/img/lang/china.png')"
                        alt="china"
                        class="lang-img"
                     />
                  </b-dropdown-item>
               </b-nav-item-dropdown>

               <div class="mr-2">
                  <b-nav-item-dropdown :text="selectedCurrency" class="menu-center">
                     <b-dropdown-item
                        v-for="(currency, index) in currencies"
                        :key="index"
                        :active="currency === selectedCurrency"
                        @click="selectCurrency(currency)"
                        href="#"
                        >{{ currency }}
                     </b-dropdown-item>
                  </b-nav-item-dropdown>
               </div>
               <div v-if="!userData" v-b-modal.modal-sign class="signin-link flex-shrink-0">    
                  {{ $t("form.signIn") }}
               </div>

               <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template #button-content>
                     <span v-if="userData">
                        {{ userData.name }}
                     </span>
                     <!-- <svg-icon class="base-icon" name="user" /> -->
                  </template>
                  <div>
                     <div v-if="userData && userData.role.name">
                        <NuxtLink
                        class="dropdown-item"
                        :to="prepareUrl('/account')"
                        active-class="active"
                        no-prefetch
                        >
                              {{$t("list.account")}}
                        </NuxtLink>

<!--                        <b-dropdown-item href="/account">{{-->
<!--                           $t("list.account")-->
<!--                        }}</b-dropdown-item>-->
                     </div>
                     <div
                        v-if="
                           userData && userData.role.name === `business_owner`
                        "
                     >

                        <NuxtLink
                                class="dropdown-item"
                                :to="prepareUrl('/office/branches')"
                                active-class="active"
                                no-prefetch
                        >
                           {{ $t("list.office") }}
                        </NuxtLink>

<!--                        <b-dropdown-item href="/office/branches">{{-->
<!--                           $t("list.office")-->
<!--                        }}</b-dropdown-item>-->
                     </div>
                     <div v-if="userData && userData.role.name === `admin`">
                        <NuxtLink
                                class="dropdown-item"
                                :to="prepareUrl('/dashboard/business')"
                                active-class="active"
                                no-prefetch
                        >
                           {{ $t("list.dashboard") }}
                        </NuxtLink>
<!--                        <b-dropdown-item href="/dashboard/business">{{-->
<!--                           $t("list.dashboard")-->
<!--                        }}</b-dropdown-item>-->
                     </div>
                     <div v-if="userData && userData.role">
                        <b-dropdown-item @click="onLogout">{{
                           $t("form.logOut")
                        }}</b-dropdown-item>
                     </div>
                     <!-- <b-ds -->
                  </div>
               </b-nav-item-dropdown>
            </b-navbar-nav>

            <button id="buttonToggle">
               <svg-icon class="base-icon ml-3" name="menu" @click="openCloseMenu()"></svg-icon>
            </button>

            <b-collapse id="nav-collapse" is-nav :class="menu == true ? 'show-menu' : ''">
               <b-navbar-nav class="nav ml-lg-auto mr-lg-4">
                  <ul class="menu d-flex justify-content-between align-items-start align-items-lg-center">
                     <li
                        class="menu-item"
                        v-for="(navLink, index) in navLinks"
                        v-bind:key="index"
                     >
                        <NuxtLink
                           class="menu-link"
                           :class="navLink.class"
                           :to="prepareUrl(navLink.url)"
                           active-class="active"
                           exact
                           no-prefetch
                           >{{ $t(navLink.name) }}
                        </NuxtLink>
                     </li>
                  </ul>
               </b-navbar-nav>
            </b-collapse>
         </b-navbar>
      </b-container>
      <!-- Modal Sign in form -->
      <Form />
   </header>
</template>

<script>
import Form from "../auth/auth-modal.vue"
import global from "~/mixins/global.js"
import Cookies from 'js-cookie';
export default {
   components: {
      Form,
   },
   mixins: [global],

   data: function () {
      return {
         userData: {
            role: {
               name: null,
            },
         },
         locationArr: {
           'en': 'united-kingdom',
           'am': 'armenia',
           'ru': 'russia',
           'ch': 'china',
           'ge': 'germany',
           'sp': 'spain',
           'fr': 'france',
         },
         flag: 'united-kingdom.png',
         accountPage: this.accountPage,
         navLinks: [
            {
               url: "/who-we-are",
               name: "list.whoWeAre",
            },
            {
               url: "/cities",
               name: "list.cities",
            },
            {
               url: "/how-works",
               name: "list.howWorks",
            },
            {
                url: "/faq",
                name: "list.faq",
            },
            {
               url: "/contact-us",
               name: "list.contactUs",
            },
            {
              url: "/blog",
              name: "list.blog",
            },
            /*{
               url: "/become-a-partner",
               name: "list.partner",
               class: "btn-color btn-large",
            },*/
         ],
         selectedCurrency: "EUR",
         currencies: ["AMD", "USD", "RUB", "EUR", "GBP", "GEL"],
         menu: false
      }
   },

   methods: {
      async onLogout() {
         const response = await this.$auth.logout().then((res) => {
           this.userData = null;
         })
      },
      selectCurrency(currency) {
         this.selectedCurrency = currency
         this.$axios.post("/user/currency", {
            currency: this.selectedCurrency,
         }).then(({user}) => {
            window.location.reload();
         })
      },
     selectLang(lang, name) {
        if(this.$i18n.locale !== lang) {
          this.$i18n.setLocale(lang)
          this.flag = name + '.png';
        }
     },
     openCloseMenu() {
        var navbar = document.getElementById('nav-collapse');
        navbar.classList.remove('show');
        this.menu = !this.menu;
     },
     scrollListener() {
         if(window.scrollY > 50) {
            document.querySelector('.header').classList.add('fixed');
         } else {
            document.querySelector('.header').classList.remove('fixed');
         }
      }
   },
   mounted() {
      this.userData = this.$auth.user
     if (!this.userData || this.userData.role.name !== `business_owner`) {
       this.navLinks.push({
         url: "/become-a-partner",
         name: "list.partner",
         class: "btn-color btn-large",
       })
     }
      if(this.userData && this.userData.currency) {
         this.selectedCurrency = this.userData.currency
      }
      else {
         this.selectedCurrency = this.$store.getters['home/currency']
      }
     this.flag = this.locationArr[this.$i18n.locale] + '.png'

     window.addEventListener('mouseup', function(event){
         var navbar = document.getElementById('nav-collapse');
         var toggleButton = document.getElementById('buttonToggle');
         if (event.target != navbar && event.target.parentNode != navbar && event.target != toggleButton && event.target.parentNode != toggleButton){
            navbar.classList.remove('show');
            navbar.classList.remove('show-menu');
         }
      });
      window.addEventListener('scroll', this.scrollListener)
   },
   watch:{
      selectedCurrency(newSelectedCurrency) {
         this.$store.dispatch("home/getCurrency", newSelectedCurrency)
      }
   }
}
</script>
