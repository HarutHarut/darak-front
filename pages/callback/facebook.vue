<template>
    <div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                hash: ""
            }
        },
        methods: {},
        // mounted() {
        //     this.hash = window.location.hash;
        //     this.$axios.post("/socLogin/facebook", this.hash)
        //         .then((response) => {
        //             this.$auth.setUser(response.data.user)
        //             const {user} = this.$auth;
        //             console.log("user", user)
        //             this.$bvModal.hide('modal-sign');
        //             switch (user.role.name) {
        //                 case "business_owner":
        //                     this.$router.push('/office/branches')
        //                     break;
        //                 case "admin":
        //                     this.$router.push('/dashboard/business')
        //                     break;
        //                 default:
        //                     this.$router.push('/account')
        //             }
        //         })
        // }
    }

</script>
