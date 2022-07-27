<template>
    <section class="dashboard-section">
        <h2 class="title-primary">{{$t("list.account")}}</h2>
        <p>{{ $t("account.hello")}} {{user.name}} ({{user.name}} &quest; <NuxtLink to="/account/logout">{{ $t("form.logOut")}}</NuxtLink> )</p>
        <p>{{ $t("account.fromYourAccount")}} <NuxtLink to="/account">{{ $t("account.dashboard")}}</NuxtLink> {{ $t("account.youCanViewYour")}} <NuxtLink to="/account/orders">{{ $t("account.recentOrders")}}</NuxtLink> {{ $t("account.andEditYour")}} <NuxtLink to="/account/details">{{ $t("account.passwordAndAccountDetails")}}</NuxtLink></p>
    </section>
</template>
<script>
  export default {
    data() {
      return {
        user: {},
      }
    },
    mounted() {
      this.$axios.get('/user').then((res) => {
        this.user = res.data;
      })
    }
  }
</script>
