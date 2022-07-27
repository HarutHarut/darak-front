<template>
    <aside class="aside-nav" :class="open ? 'opened' : ''">
        <nav class="sidebar">
            <ul class="menu">
<!--                <li class="menu-item" >-->
<!--                    <NuxtLink to="/office" class="menu-link">-->
<!--                        <svg-icon class="base-icon" name="home"></svg-icon>-->
<!--                        <span class="link-text">{{$t("dashboard.list.office")}}</span>-->
<!--                    </NuxtLink>-->
<!--                </li>-->
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/office/branches')" class="menu-link">
                        <svg-icon class="base-icon" name="portfolio"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.branchs")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item">
                    <NuxtLink :to="prepareUrl('/office/lockers')" class="menu-link">
                        <svg-icon class="base-icon" name="luggage"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.lockers")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/office/orders')" class="menu-link">
                        <svg-icon class="base-icon" name="basket"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.orders")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/office/reviews')" class="menu-link">
                        <svg-icon class="base-icon" name="writing"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.reviews")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/office/sizes')" class="menu-link">
                        <svg-icon class="base-icon" name="reduce"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.sizes")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/office/create-business')" class="menu-link">
                        <svg-icon class="base-icon" name="settings"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.settings")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/office/invoices')" class="menu-link" >
                        <svg-icon class="base-icon" name="balance"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.invoices")}}</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>

import global from "~/mixins/global.js"

export default ({

    mixins: [global],
    props: [
        'open'
    ],
  data: function() {
    return {
        
        }
    },

   /*  mounted () {
        var menuItem = document.querySelectorAll('.dropdown');
        for(var i = 0; i < menuItem.length; i++) {
            menuItem[i].addEventListener('click', function(){

                if(this.querySelector('.dropdown-list')) {
                    this.querySelector('.dropdown-list').classList.toggle('showList');
                }
            });
        }
    }, */
})
</script>
