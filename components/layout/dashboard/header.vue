<template>
    <header class="dashboard-header d-flex justify-content-between">
        <div class="logo-box d-flex align-items-center justify-content-center justify-content-lg-between p-3">
            <NuxtLink :to="prepareUrl('/')" class="logo-img mr-3">
               <span>{{ $t('list.admin') }}</span>
            </NuxtLink>
            <button type="button" @click="$emit('toggleNav')" class="menu-burger">
                <svg-icon class="base-icon" name="menu"></svg-icon>
            </button>
        </div>

        <b-navbar-nav class="ml-auto mr-5 flex-row align-items-center">
            <b-navbar-nav class="ml-auto flex-row align-items-center">
                <b-nav-item-dropdown>
                    <template #button-content>
                        <img
                                :src="require('@/assets/img/lang/' + flag)"
                                alt=""
                                class="lang-img"
                        />
                    </template>
                    <b-dropdown-item
                            href="#"
                            @click="selectLang('en', 'united-kingdom')"
                    >
                        <img
                                :src="require('@/assets/img/lang/united-kingdom.png')"
                                alt=""
                                class="lang-img"
                        />
                    </b-dropdown-item>
                    <b-dropdown-item
                            href="#"
                            @click="selectLang('am','armenia')"
                    >
                        <img
                                :src="require('@/assets/img/lang/armenia.png')"
                                alt=""
                                class="lang-img"
                        />
                    </b-dropdown-item>
                    <b-dropdown-item
                            href="#"
                            @click="selectLang('ru', 'russia')"
                    >
                        <img
                                :src="require('@/assets/img/lang/russia.png')"
                                alt=""
                                class="lang-img"
                        />
                    </b-dropdown-item>
                    <b-dropdown-item
                            href="#"
                            @click="selectLang('fr', 'france')"
                    >
                        <img
                                :src="require('@/assets/img/lang/france.png')"
                                alt=""
                                class="lang-img"
                        />
                    </b-dropdown-item>

                    <b-dropdown-item
                            href="#"
                            @click="selectLang('ch', 'china')"
                    >
                        <img
                                :src="require('@/assets/img/lang/china.png')"
                                alt=""
                                class="lang-img"
                        />
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

            <b-nav-item-dropdown class="ml-3">
              <template #button-content>
                  <span class="ml-2 text-white mr-2 align-middle">
                      {{ userData }}
                  </span>
                <span class="user align-middle">
                    <img :src="require('@/assets/img/user.png')" alt="" />
                </span>
              </template>
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
