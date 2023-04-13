<template>
   <header class="office-header d-flex justify-content-between">
        <div class="logo-box d-flex align-items-center justify-content-center justify-content-lg-between p-3">
            <NuxtLink :to="prepareUrl('/')" class="logo-img mr-3">
                <img :src="require('@/assets/img/logo/logo-white-text.png')" class="logo-img img-fluid" alt="logo" />
            </NuxtLink>
            <button type="button" @click="$emit('toggleNav')" class="menu-burger">
                <svg-icon class="base-icon" name="menu"></svg-icon>
            </button>
        </div>

        <b-navbar-nav class="ml-auto mr-5 flex-row align-items-center">

<!--            <b-nav-item-dropdown class="mr-3">-->
<!--              <template #button-content>-->
<!--                <span class="notification-img"><svg-icon class="md-icon" name="bell"></svg-icon><span class="message"></span></span>-->
<!--              </template>-->
<!--              <b-dropdown-item href="#"><svg-icon name="envelope" class="sm-icon mr-2"></svg-icon><span>4 new messages</span></b-dropdown-item>-->
<!--              <b-dropdown-item href="#"><svg-icon name="users" class="sm-icon mr-2"></svg-icon><span>8 friend requests</span></b-dropdown-item>-->
<!--            </b-nav-item-dropdown>-->

            <b-nav-item-dropdown class="">
                <template #button-content>
                    <img
                            :src="require('@/assets/img/lang/' + flag)"
                            alt="flag"
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

             <b-nav-item-dropdown class="ml-3">
              <template #button-content>
                  <span class="ml-2 text-white mr-2 align-middle">
                      {{ userData }}
                  </span>
                <span class="user align-middle">
                    <img :src="require('@/assets/img/user.png')" alt="" />
                </span>
              </template>
<!--              <b-dropdown-item href="#"><span>{{$t("dashboard.list.profile")}}</span></b-dropdown-item>-->
              <div>
                 <NuxtLink
                         class="dropdown-item"
                         :to="prepareUrl('/account')"
                         active-class="active"
                         no-prefetch
                 >
                     {{$t("list.account")}}
                 </NuxtLink>
              </div>
<!--              <b-dropdown-item href="#"><span>{{$t("dashboard.form.logIn")}}</span></b-dropdown-item>-->
               <b-dropdown-item href="#" @click="logout"><span>{{$t("dashboard.form.logOut")}}</span></b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
   
   </header>
</template>
<script>

import global from "~/mixins/global.js"

export default {

    mixins: [global],
    data: function () {
        return {
            userData: null,
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
        }
    },
   methods: {
      logout() {
         this.$auth.logout()
      },
       selectLang(lang, name) {
           if(this.$i18n.locale !== lang) {
               this.$i18n.setLocale(lang)
               this.flag = name + '.png';
           }
       }
   },
   mounted() {
       this.userData = this.$auth.user.name
       this.flag = this.locationArr[this.$i18n.locale] + '.png'
   }
}
</script>