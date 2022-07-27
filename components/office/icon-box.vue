<template>
    <div class="icon-box d-flex align-items-center justify-content-between flex-wrap mb-3">
        <ul class="left-icon-list d-flex flex-wrap align-items-center justify-content-center mb-3">
            <li class="icon-item mb-2" v-for="(menuLink, index) in menuLinks" v-bind:key="index">
                <NuxtLink :to="prepareUrl(`${menuLink.url}`)" exact no-prefetch active-class="active"
                          class="icon-link d-flex flex-column align-items-center justify-content-center">
                    <svg-icon class="md-icon mb-1" :name="menuLink.icon"></svg-icon>
                    <span class="icon-text">{{ menuLink.title }}</span>
                </NuxtLink>
            </li>
        </ul>

        <ul class="right-icon-list d-flex flex-wrap justify-content-center">
            <li class="mb-2">
                <a class="d-flex align-items-center" href="#">
                    <svg-icon class="md-icon" name="basket"/>
                    <span>{{ $t("dashboard.list.orders") }}</span>
                    <span class="count">{{ data.orders }}</span>
                </a>
            </li>
            <li class="mb-2">
                <a class="d-flex align-items-center" href="#">
                    <svg-icon class="md-icon" name="hand"></svg-icon>
                    <span>{{ $t("dashboard.list.sales") }}</span>
                    <span class="count">{{ data.sales }}</span>
                </a>
            </li>
            <li class="mb-2">
                <a class="d-flex align-items-center" href="#">
                    <svg-icon class="md-icon" name="fees"/>
                    <span>{{ $t("dashboard.list.lockers") }}</span>
                    <span class="count">{{ data.locker }}</span>
                </a>
            </li>
            <li class="mb-2">
                <a class="d-flex align-items-center" href="#">
                    <svg-icon class="md-icon" name="text-message-4656"/>
                    <span>{{ $t("dashboard.fields.feedbacks") }}</span>
                    <span class="count">{{ data.feedback }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

import global from "~/mixins/global.js"
    export default ({
        props: ['data'],
        mixins: [global],
        data: function () {
            return {
                loading: true,
                menuLinks: [
                    /*{
                        url: "/office",
                        title: this.$t('dashboard.list.office'),
                        icon: "home",
                    },*/
                    {
                        url: "/office/lockers",
                        title: this.$t('dashboard.list.lockers'),
                        icon: "luggage",
                    },
                    {
                        url: "/office/orders",
                        title: this.$t('dashboard.list.orders'),
                        icon: "basket"
                    },
                    {
                        url: "/office/reviews",
                        title: this.$t('dashboard.list.reviews'),
                        icon: "writing"
                    },
                    {
                        url: "/office/branches",
                        title: this.$t('dashboard.list.branchs'),
                        icon: "portfolio"
                    },
                    {
                        url: "/office/sizes",
                        title: this.$t('dashboard.list.sizes'),
                        icon: "reduce"
                    },
                    {
                        url: "/office/create-business",
                        title: this.$t('dashboard.list.settings'),
                        icon: "settings"
                    },
                    {
                        url: "/office/invoices",
                        title: this.$t('dashboard.list.invoices'),
                        icon: "balance"
                    },
                ]
            };
        },
    })
</script>