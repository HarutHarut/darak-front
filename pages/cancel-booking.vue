<template>
    <b-col v-else sm="10" lg="4" xl="4" class="text-center mx-auto pt-5 price-calc-block success-block pb-5" style="margin-top: 8rem; margin-bottom: 4rem;">
        <div v-if="successMessage" class="check-icon">
            <svg-icon
                    class="lg-icon mb-2"
                    name="accept"
            />
        </div>
        <h4 class="font-weight-bold">{{ this.message }}</h4>
    </b-col>
</template>

<script>
    export default {
        data() {
            return {
                message: null,
                successMessage: false,
            }
        },

        name: "",
        mounted() {
            this.$axios.get(`/cancel-booking?booking_number=${this.$route.query.booking_number}`)
            .then(res => {
                this.message = res.data.message
                this.successMessage = true
            })
            .catch(res => {
                this.message = res.message
            })
        }
    }
</script>

<style>

.header {
    background-color: #fff;
    color: #212529;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.header .menu-link, .header .navbar-nav .dropdown-toggle {
    color: #212529 !important;
}
.header .navbar-nav .dropdown-toggle svg {
    fill: #212529 !important;
}
.header .navbar-collapse .menu-link.btn-color {
    color: #fff !important;
}
.header .logo-img.logo-white {
    display: none;
}
.header .logo-img.logo-black {
    display: block;
}

</style>