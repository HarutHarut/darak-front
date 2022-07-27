<template>
    <div>
        <b-container fluid>
            <b-row>
                <!--____________________ User details____________________ -->
                
                <b-col lg="6" xl="3">
                    <div class="base-card card mb-3">
                        <div class="card-body">
                            <div class="card-img mx-auto mb-2"><img :src="require('@/assets/img/user.png')" class="logo-img" alt="" /></div>
                            <h3 class="text-center">{{$t("dashboard.fields.user")}}</h3>
                            <ul class="card-list">
                                <li class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.fields.name")}}</p><p>{{ user.name }}</p></li>
                                <li class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.fields.lastName")}}</p><p>{{ user.last_name }}</p></li>
                                <li class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.fields.email")}}</p><p>{{ user.email }}</p></li>
                                <li v-if="role === 'business_owner' && user.business" class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.fields.phone")}}</p><p>{{ user.business.phone }}</p></li>
                                <li v-if="role === 'business_owner' && user.business && user.business.city" class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.fields.city")}}</p><p>{{ user.business.city.name }}</p></li>
                                <li v-if="role === 'business_owner' && user.business" class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.fields.address")}}</p><p class="w-50 text-right">{{ user.business.address }}</p></li>

                            </ul>
                            <button v-b-modal.modal-users type="button" class="btn-add ml-auto"><svg-icon class="base-icon" name="edit"></svg-icon></button>
<!--                            <NuxtLink to="/dashboard/add-user" class="btn btn-color btn-edit pt-1"><svg-icon class="base-icon" name="edit"></svg-icon></NuxtLink>-->
                        </div>
                    </div>
                </b-col>
                <div>
                    <AddUser :userProp="user" v-on:submit="updateUser"></AddUser>
                </div>

            </b-row>
        </b-container>
    </div>
</template>

<script>

import AddUser from "@/components/dashboard/user/add-user.vue";

export default {
    components: {AddUser},
    comments: {
      AddUser
    },

    data() {
        return {
            user: {},
            role: '',
        }
    },

    methods: {
        updateUser(data){
            this.$axios
                .post(`/admin/users/update`, data)
                .then((res) => {
                    console.log(res)
                    this.$bvToast.toast(res.data.message, {
                        title: `Success Registered`,
                        variant: 'success',
                        autoHideDelay: 5000,
                        solid: true
                    });
                    window.location.reload()
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    this.$nuxt.$loading.finish()
                })
            console.log(data)
        }
    },
    mounted() {
        this.$axios.get(`/admin/user/${this.$route.params.id}`)
            .then((res) => {
                this.user = res.data
                this.role = res.data.role.name
        })
    }
}
</script>
