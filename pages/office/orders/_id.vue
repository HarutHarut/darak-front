<template>
    <b-container class="base-card bg-white">
        <b-row class="py-4 px-3">
            <b-col xl="7" lg="9">
                <div class="d-flex flex-wrap align-items-start justify-content-between mb-4">
                    <div class="orders-info d-flex align-items-center mb-4">
                        <h2 class="title-secondary mr-3 mb-0">{{$t("dashboard.fields.order")}} #{{singleOrderData.order.booking_number}}</h2>
                        <span class="status-order ml-3" :class="singleOrderData.order.status">{{ singleOrderData.order.status }}</span>
<!--                        <span class="status-order complated">{{singleOrderData.order.status}}</span>-->
                    </div>
                    <!-- <button class="btn btn-color">{{$t("dashboard.btn.cancel")}}</button> -->
                </div>
            </b-col>
            <b-col md="6">
                <div class="place-info mb-5">
                    <h3 class="title-tertiary">{{singleOrderData.order.bookings[0].branch.name | getTransValue($i18n.locale) }}</h3>
                    <p>{{ JSON.parse(singleOrderData.order.bookings[0].branch.country_code).code + singleOrderData.order.bookings[0].branch.phone }}</p>
                    <p>{{ singleOrderData.order.bookings[0].branch.address }}</p>
                </div>
            </b-col>
            <b-col md="6">
                <div class="user-info mb-5">
                    <h3 class="title-tertiary">{{singleOrderData.order.user.name }}</h3>
                    <!-- <p>phone</p> -->
                    <p>{{singleOrderData.order.user.email }}</p>
                </div>
            </b-col>
            <b-col md="12">
                <div class="user-info mb-5">

                    <h3 class="title-tertiary">{{$t("dashboard.fields.price")}}</h3>
                    <!-- <p>phone</p> -->
                    <p>{{singleOrderData.order.price}}{{singleOrderData.order.currency}}</p>
                </div>
            </b-col>
            <b-col lg="6" xl="4" :key="booking.id" v-for="(booking) in arrSizeCount">
                <div class="card mb-3" >
                    <div class="card-body">
                        <h3 class="title-tertiary">{{$t("dashboard.fields.lockerDetails")}}</h3>
                        <ul class="card-list">
                            <li class="d-flex justify-content-between"><p class="item-title">{{$t("form.checkIn")}}</p><p>{{ booking.order.check_in | dateTable }}</p></li>
                            <li class="d-flex justify-content-between"><p class="item-title">{{$t("form.checkOut")}}</p><p>{{ booking.order.check_out | dateTable }}</p></li>
                             <li class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.fields.size")}}</p><p>{{ booking.locker.size.name.en }}</p></li>
                            <li class="d-flex justify-content-between"><p class="item-title">{{$t("dashboard.form.count")}}</p><p>{{ booking.count }}</p></li>
                        </ul>

                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import PageTitle from "../../../components/office/page-title.vue"
import moment from 'moment'

export default {

    components: {
        PageTitle,
    },

    filters:{
        dateTable(val) {
            const date = moment(val).format('D MMMM YYYY, h:mm:ss ')
            return date.toString()
        },

        getTransValue(val, lang) {
            return val[lang]
        }
    },

    data() {
        return{
            bookingNumber: null ,
            singleOrderData: null,
            branchCount: null,
        }
    },

    async asyncData({ $axios, route }) {
        const { data } = await $axios.post(`orders/single/${route.params.id}`);
        var count = 0;
        data.order.bookings.forEach(e => {
            count += e.amount;
        });
        return {
            arrSizeCount: data.order.arrSizeCount,
            singleOrderData: data,
            branchCount: count
        }
    },



    methods:{},

    mounted() {
        //console.log(this.singleOrderData)
    }
}
</script>
