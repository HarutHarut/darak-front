<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
                    <PageTitle :title="title" :image="image"/>
                    <DatePicker @setDate="setDate"/>
                </div>
                <IconBox :data="counts"/>
                <OrdersTable :orders="orders"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import PageTitle from '@/components/office/page-title.vue'
import DatePicker from '@/components/office/datepicker.vue'
import IconBox from '@/components/office/icon-box.vue'
import OrdersTable from '@/components/office/orders-table.vue'

export default {

    components: {
        PageTitle,
        DatePicker,
        IconBox,
        OrdersTable,
    },

    data() {
        return {
            orders: null,
            counts: null,
            dateRange: {
                startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                endDate: this.roundMinutes(new Date(Date.now())),
            },
            today: new Date(),
            title: this.$t('dashboard.list.office'),
            image: 'home',
        }
    },
    async asyncData({ $axios }) {
        let end = new Date(Date.now());
        end.setHours(end.getHours() + Math.round(end.getMinutes() / 60))
        end.setMinutes(0, 0, 0);
        const dateRange = {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: end,
        }
        let lastOrders;
        const { data } = await $axios.post(`/dashboard`, dateRange)
        await $axios.post('/dashboard/orders', {count: 10}).then((res) => {
          console.log(res.data)
            lastOrders = res.data;
        })
        return {
            counts: data,
            orders: lastOrders,
        }
    },

    methods: {
        roundMinutes(date) {
            date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
            date.setMinutes(0, 0, 0);
            return date;
        },
        setDate(val) {
            this.$axios.post('/dashboard', val).then((res) => {
               this.counts = res.data
            })
        }
    }
}

</script>