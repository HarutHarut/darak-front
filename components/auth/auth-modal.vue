<template>
    <b-modal id="modal-sign" size="lg" class="modal-form p-0" hide-footer
             hide-header centered>
        <b-container class="p-0">
            <b-row class="m-0">
                <b-col cols="6" class="p-0 d-none d-md-block">
                    <div class="modal-leftside tab-content d-flex flex-column p-5">
                        <div class="title-box" v-if="tab === 'sign-in'">
                            <h2 class="title-secondary text-white">{{ $t("form.signIn") }}</h2>
                            <p>{{ $t("becomePartner.registerProfit") }}</p>
                        </div>
                        <div class="title-box" v-else>
                            <h2 class="title-secondary text-white">{{ $t("form.signUp") }}</h2>
                            <p>{{ $t("form.signUpText") }}</p>
                        </div>
                        <div class="img-box mt-auto">
                            <img :src="require('@/assets/img/logo/logo-white-text.png')" class="img-fluid" alt=""/>
                        </div>
                    </div>
                </b-col>
                <b-col md="6" class="p-0">
                    <div class="modal-sign-form">
                        <b-tabs class="tabs-content d-flex flex-column">
                            <b-tab :title="$t('form.signIn')" active @click="clickTab('sign-in')">
                                <Login v-on:loading="turnOffModalCloseToggle"/>
                                <!-- <ForgotPassword v-if="showForgot" :forgot="showForgot" /> -->
                            </b-tab>
                            <b-tab :title="$t('form.signUp')" @click="clickTab('sign-up')">
                                <Registration v-on:loading="turnOffModalCloseToggle"/>
                            </b-tab>

<!--                            <button @click="socLogin('facebook')" class="btn"-->
<!--                                    style="background-color: #3B5998; color: white; margin: 0 auto; display: block">-->
<!--                                <i class="fa fa-facebook fa-fw"></i> {{ $t('form.LoginWithFacebook') }}-->
<!--                            </button>-->

                        </b-tabs>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>
    // import ForgotPassword from './forgot-password.vue';
    import Login from './login';
    import Registration from './registration';

    export default {
        components: {
            Login,
            Registration,
            // ForgotPassword,
        },
        data() {
            return {
                loading: false,
                tab: 'sign-in'
            }
        },
        methods: {
            async socLogin(provider) {
                await this.$auth.loginWith(provider);
            },
            clickTab(text) {
                this.tab = text;
            },
            turnOffModalCloseToggle(load) {
                this.loading = load;
            },
        },
        mounted() {
            this.hash = window.location.hash;
            if (this.hash.length) {
                this.$axios.post("/socLogin/facebook", this.hash)
                    .then((response) => {
                        // this.$auth.loginWith("user")
                        this.$auth.setUser(response.data.user)
                        this.$auth.setUserToken(response.data.access_token, response.data.refresh_token)
                        const {user} = this.$auth;
                        console.log("user", user)
                        this.$bvModal.hide('modal-sign');
                        switch (user.role.name) {
                            case "business_owner":
                                this.$router.push('/office/branches')
                                break;
                            case "admin":
                                this.$router.push('/dashboard/business')
                                break;
                            default:
                                this.$router.push('/account')
                        }
                    })
            }
        }
    }
</script>

