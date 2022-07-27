<template>
    <aside class="aside-nav" :class="open ? 'opened' : ''">
        <nav class="sidebar">
            <ul class="menu">
<!--                <li class="menu-item" >-->
<!--                    <NuxtLink to="/dashboard" class="menu-link">-->
<!--                        <svg-icon class="base-icon" name="home"></svg-icon>-->
<!--                        <span class="link-text">{{$t("dashboard.list.dashboard")}}</span>-->
<!--                    </NuxtLink>-->
<!--                </li>-->
                <li class="menu-item">
                    <NuxtLink :to="prepareUrl('/dashboard/business')" class="menu-link">
                        <svg-icon class="base-icon" name="portfolio"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.business")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/branches')" class="menu-link">
                        <svg-icon class="base-icon" name="business-branchs"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.branchs")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/blogs')" class="menu-link">
                        <svg-icon class="base-icon" name="pages"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.blogs")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/users')" class="menu-link">
                        <svg-icon class="base-icon" name="users"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.users")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/reviews')" class="menu-link">
                        <svg-icon class="base-icon" name="writing"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.reviews")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/orders')" class="menu-link">
                        <svg-icon class="base-icon" name="basket"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.orders")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/sizes')" class="menu-link">
                        <svg-icon class="base-icon" name="reduce"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.sizes")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/static-pages')" class="menu-link">
                        <svg-icon class="base-icon" name="pages"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.staticPages")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/cities')" class="menu-link">
                        <svg-icon class="base-icon" name="city-solid"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.cities")}}</span>
                    </NuxtLink>
                </li>
                <li class="menu-item" >
                    <NuxtLink :to="prepareUrl('/dashboard/invoices')" class="menu-link" >
                        <svg-icon class="base-icon" name="balance"></svg-icon>
                        <span class="link-text">{{$t("dashboard.list.invoices")}}</span>
                    </NuxtLink>
                </li>
<!--                <li class="menu-item" >-->
<!--                    <NuxtLink to="/dashboard/country" class="menu-link">-->
<!--                       <svg-icon class="base-icon" name="country"></svg-icon>-->
<!--                       <span class="link-text">{{$t("dashboard.list.countries")}}</span>-->
<!--                   </NuxtLink>-->
<!--                </li>-->
<!--                <li class="menu-item" >-->
<!--                    <NuxtLink to="/dashboard/mailbox" class="menu-link" >-->
<!--                        <svg-icon class="base-icon" name="inbox"></svg-icon>-->
<!--                        <span class="link-text">{{$t("dashboard.list.mailbox")}}</span>-->
<!--                    </NuxtLink>-->
<!--                </li>-->
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
})
</script>
