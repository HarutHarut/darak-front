<template>
    <section class="logout-section text-center">
        <b-row>
            <b-col md="8">
                <h2 class="title-primary">{{$t("form.logOut")}}</h2>
                <p class="title-line d-flex align-items-center"><span><svg-icon class="base-icon ml-2 mr-1" name="exclamation"></svg-icon></span><span>{{$t("form.loggedOut")}}</span></p>
                <a href="#" @click="logout()" class="btn btn-blue">{{$t('form.logOut')}}</a>
            </b-col>
        </b-row>
    </section>
</template>

<script>

    export default {
        data: function () {
            return {

            }
        },
        methods: {
            logout() {
                this.$auth.logout()
            }
        }
    }

</script>
