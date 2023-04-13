<template>
    <b-col v-else sm="10" lg="4" xl="4" class="text-center mx-auto pt-5 price-calc-block success-block pb-5" style="margin-top: 8rem; margin-bottom: 4rem;">
        <div class="check-icon">
            <svg-icon
                    class="lg-icon mb-2"
                    name="accept"
            />
        </div>
        <h4 class="font-weight-bold">{{ $t('list.successfullyVerify') }}</h4>
    </b-col>
</template>

<script>
    export default {
        name: "",
        mounted() {
            this.$axios.get(`/email-verify?hash=${this.$route.query.hash}`)
                .then(response => {
                    if(response.data.isBusiness === true){
                        this.$auth.loginWith('user', {
                            url: `${this.$axios.defaults.baseURL}/login`,
                            data: {
                                email: response.data.email,
                                password: atob(response.data.password)
                            }
                        })
                            .then((res) => {
                                const {user} = this.$auth;
                                this.$router.push('/office/branches/add')
                            })
                    }
                })
        }
    }
</script>

<style scoped>

</style>