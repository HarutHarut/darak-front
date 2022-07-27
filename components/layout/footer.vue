<template>
    <footer class="footer">
        <div class="footer-top">
            <b-container>
                <b-row>
                    <b-col lg="5" cols="12">
                        <a href="#" class="logo-link">
                            <img :src="require('@/assets/img/logo/logo-white-text.png')" class="logo-img img-fluid" alt="" />
                        </a>
                        <p class="footer-text">{{$t('footer.text')}}</p>
                        <div class="app-links mb-4 d-flex flex-wrap justify-content-md-start justify-content-center">
                            <a href="https://www.apple.com/ru/ios/app-store" class="app-link mb-2" target="_blank" rel="nofollow">
                                <img :src="require('@/assets/img/app-store.png')" alt="" />
                            </a>
                            <a href="https://play.google.com/store/apps" class="app-link mb-2" target="_blank" rel="nofollow">
                                <img :src="require('@/assets/img/google-play.png')" alt="" />
                            </a>
                        </div>
                        <ul class="social mb-4 d-flex align-items-center justify-content-center justify-content-lg-start">
                            <li class="social-item">
                                <a href="https://www.facebook.com/LuggageStorageNetwork" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                    <svg-icon class="base-icon" name="facebook" />
                                </a>
                            </li>
                            <li class="social-item">
                                <a href="https://www.instagram.com/luglockers/" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                    <svg-icon class="base-icon" name="instagram" />
                                </a>
                            </li>
                            <li class="social-item">
                                <a href="https://www.youtube.com/channel/UC0V40JwBTiwe90dq1IyCdmA" target="_blank" rel="nofollow" class="social-link d-flex align-items-center justify-content-center">
                                        <svg-icon class="base-icon" name="youtube" />
                                </a>
                            </li>
                        </ul>
                    </b-col>
                    <b-col lg="6" cols="12">
                        <b-row>
                            <b-col lg="4" cols="12">
                                <h4 class="title-quaternary">{{$t('title.menu')}}</h4>
                                <ul class="menu mb-4">
                                    <li class="menu-item" v-for="(navLink, index) in navLinks" v-bind:key="index">
                                        <NuxtLink  class="menu-link" :to="prepareUrl(navLink.url)" no-prefetch>{{navLink.name}}</NuxtLink>
                                    </li>
                                </ul>
                            </b-col>
                            <b-col lg="8" cols="12">
                                <h4 class="title-quaternary">{{$t('title.contact')}}</h4>
                                <ul class="contact-list mb-4">
                                    <li class="contact-item d-flex justify-content-between">
                                        <p class="contact-info">
                                            <svg-icon class="contact-icon" name="envelope" />
                                            <span class="contact-text">{{$t('mail.forCustomers')}}</span>
                                        </p>
                                        <a href="mailto:info@luglockers.com" target="_blank" rel="nofollow"  class="contact-link">info@luglockers.com</a>
                                    </li>
                                    <li class="contact-item d-flex justify-content-between">
                                        <p class="contact-info">
                                            <svg-icon class="contact-icon" name="envelope" />
                                            <span class="contact-text">{{$t('mail.forPartners')}}</span>
                                        </p>
                                        <a href="mailto:partners@luglockers.com"  target="_blank" rel="nofollow" class="contact-link">partners@luglockers.com</a>
                                    </li>
                                    <li class="text-right" style="margin-top: 35px;">
                                        "ATA Storage" LLC,</br> Artsakh st. 1-6, Yerevan, Armenia
                                    </li>
                                    <li class="text-right">0048596</li>
                                    <li class="text-right">info@luglockers.com </li>
                                </ul>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div class="footer-bottom">
            <div class="coyright-info">
                <p><span>&copy; 2021</span> <a href="luglocker.com" class="main-link">luglocker.com</a><span>&vert; {{$t('footer.copyright')}}</span></p>
            </div>
        </div>
    </footer>
</template>

<script>

import global from "~/mixins/global.js"

export default ({
    mixins: [global],
    data: function() {
    return {

    navLinks: [
        {
          url: "/who-we-are",
          name: this.$t('list.whoWeAre'),
        },
        {
          url: "/how-works",
          name: this.$t('list.howWorks'),
        },
        {
          url: "/contact-us",
          name: this.$t('list.contactUs'),
        },
        {
          url: "/faq",
          name: this.$t('list.faq'),
        },
        {
          url: "/privacy-policy",
          name: this.$t('list.pPolicy'),
        },
        // {
        //   url: "/privacy-policy-for-business",
        //   name: this.$t('list.pPolicyBusiness'),
        // },
        {
          url: "/terms-and-conditions",
          name: this.$t('list.tConditions'),
        },
      ]
    };
  }
})
</script>
