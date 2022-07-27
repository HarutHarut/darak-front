<template>
    <b-container fluid class="orders-page">
        <b-row>
            <b-col>
                <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
                    <PageTitle :title="title" :image="image" />
                    <b-row class="invoices-filter">
                        <b-col>
                            <b-form-group
                                    class="mr-2 w-100"
                            >
                                <b-form-select
                                        v-model="businessId"
                                        id="lockers-size"
                                        class="select my-2 w-100" sm="4"
                                >
                                    <b-form-select-option  value="">{{ $t("dashboard.fields.business") }} </b-form-select-option>
                                    <b-form-select-option
                                            :value="business.id"
                                             v-for="business in businesses"
                                            :key="business.id"
                                    >
                                        {{
                                        business.name
                                        | getTransValue($i18n.locale)
                                        }}
                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col >
                            <b-form-group
                                    class="mr-2 w-100"
                            >
                                <b-form-select
                                        v-model="datas.yearId"
                                        id="lockers-size"
                                        class="select my-2 w-100" sm="4"
                                >
                                    <b-form-select-option  value="">{{ $t("dashboard.fields.years") }}</b-form-select-option>
                                    <b-form-select-option
                                             v-for="year in datas.years"
                                             :value="year"
                                             :key="year"
                                    >
                                        {{ year }}
                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col >
                            <b-form-group
                                    class="mr-2 w-100"
                            >
                                <b-form-select
                                        v-model="datas.monthId"
                                        id="lockers-size"
                                        class="select my-2 w-100" sm="4"
                                >
                                    <b-form-select-option  value="">{{ $t("dashboard.fields.months") }} </b-form-select-option>
                                    <b-form-select-option
                                             v-for="(month, key) in datas.months"
                                             :value="key"
                                             :key="key"
                                    >
                                        {{ $t(`dashboard.fields.${month}`) }}

                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col >
                            <b-form-group
                                    class="mr-2 w-100"
                            >
                                <b-form-input
                                        v-model="datas.search"
                                        placeholder="Search"
                                        class="select my-2 w-100" sm="4"
                                >

                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col>
                            <b-button
                                    type="button"
                                    class="btn btn-color my-2 btn-form"
                                    @click="searchInvoices()"
                            >{{ $t("form.find") }}
                            </b-button
                            >
                        </b-col>
                    </b-row>
                </div>
<!--                <Chart/>-->
                <section class="static-section invoices-section mb-3">
                    <div class="title-box d-flex align-items-center justify-content-between" v-b-toggle.collapse-orders>
                        <h4 class="title p-3">{{ $t("dashboard.list.invoices") }}</h4>
                        <span class="when-opened">
                            <svg-icon class="base-icon" name="up-chevron"></svg-icon>
                        </span>
                    </div>
                    <b-collapse visible id="collapse-orders">
                        <b-table-simple responsive class="static-table">
                            <b-thead>
                                <b-tr>
                                    <b-th>{{ $t("dashboard.fields.businessName") }}</b-th>
                                    <b-th>{{ $t("dashboard.fields.amount") }}</b-th>
<!--                                    <b-th>{{ $t("dashboard.fields.amountCurrency") }}</b-th>-->
                                    <b-th>{{ $t("dashboard.fields.businessAmount") }}</b-th>
<!--                                    <b-th>{{ $t("dashboard.fields.businessCurrency") }}</b-th>-->
                                    <b-th>{{ $t("dashboard.fields.month") }}</b-th>
                                    <b-th>PDF</b-th>
                                    <b-th>{{ $t("dashboard.fields.dueBy") }}</b-th>
                                    <b-th>{{ $t("dashboard.fields.invoiceNumber") }}</b-th>
                                    <b-th>{{ $t("dashboard.fields.status") }}</b-th>
                                    <b-th>{{ $t("dashboard.fields.city") }}</b-th>
                                    <b-th>{{ $t("dashboard.fields.action") }}</b-th>
                                </b-tr>
                            </b-thead>
                            <b-tbody>
                                <b-tr :key="invoice.id" v-for="invoice in invoices" :class="'invoice-row' + ' ' + statuses[invoice.status]">

                                    <b-td>{{ invoice.business.name.en }}</b-td>
                                    <b-td>{{ invoice.amount }}{{ invoice.amount_currency }} </b-td>
<!--                                    <b-td>{{ invoice.amount_currency }}</b-td>-->
                                    <b-td>{{ invoice.business_amount }}{{ invoice.business_currency }}</b-td>
<!--                                    <b-td>{{ invoice.business_currency }}</b-td>-->
                                    <b-td>{{ invoice.month }}</b-td>
                                    <b-td>
                                        <b-col class="item invoice-col pdf-col">
                                            <b-link target="_blank" :href="$config.cdnUrl + '/storage/' + invoice.file_name">{{$t("dashboard.invoice.downloadPdf")}}</b-link>
                                        </b-col>
                                    </b-td>
                                    <b-td>{{ invoice.due_by | dateDueBy() }}</b-td>
                                    <b-td>{{ invoice.invoice_number }}</b-td>
                                    <b-td>
                                        <span class="item status-col toCapitalFirst">
                                          {{ statuses[invoice.status]}}
                                        </span>
                                    </b-td>
                                    <b-td v-if="invoice.business.city">{{ invoice.business.city.name }}</b-td>
                                    <b-td v-else></b-td>
                                    <b-td>
                                        <span>
                                            <span v-if="invoice.status !== 1" class="view-cell">
                                               <button @click="changeStatus(invoice.id, 1)">
                                                  <svg-icon class="base-icon" name="add-button" />
                                               </button>
                                            </span>
                                        </span>
                                    </b-td>

<!--                                    <b-td>-->
<!--                                        <button v-if="check(order.check_in) && order.status != 'canceled'" v-b-modal.cancel-order-modal class="btn btn-cancel" @click="openCancelModal(order.id)">{{ $t("form.btn.cancel") }}</button>-->
<!--                                    </b-td>-->
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                    </b-collapse>
                </section>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>

    import PageTitle from '@/components/office/page-title.vue'
    import DateRangePicker from 'vue2-daterange-picker'
    import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
    import moment from 'moment'

    export default {

        components: {
            PageTitle,
            DateRangePicker,
        },

        data () {
            let date = new Date();
            return {
                // dueBy: '',
                title: this.$t('dashboard.list.invoices'),
                image: 'balance',
                businessId: '',
                dateRange: {
                    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
                    endDate: new Date()
                },
                businesses: {},
                invoices: null,
                type:'business_owner',
                statuses: {
                    0: "default",
                    1: "success",
                    2: "pending",
                    3: "error",
                    4: "decline",
                },
                datas:{
                    years: {},
                    months: {},
                    yearId: '',
                    monthId: '',
                    search: ''
                }
            }
        },

        filters: {
            date(val) {
                return val ? val.toLocaleString() : ''
            },
            monthStart(val) {
                const data = moment(Date.now()).format("DD.MM.YYYY HH:mm");
                return data.toString();
            },
            getTransValue(val, lang) {
                return val[lang]
            },
            dateTable(val) {
                const date = moment(val).format('D MMMM YYYY, h:mm:ss ')
                return date.toString()
            },
            dateDueBy(val) {
                const date = moment(val).format('D MMMM YYYY ')
                return date.toString()
            },

        },

        methods:{
            getInvoices() {
                this.$axios
                    .post("dashboard/invoices"
                    //     , {
                    //     type:this.type,
                    //     branch_id:this.branchId,
                    //     check_in: moment(this.dateRange.startDate).format(
                    //         "YYYY-MM-DD HH:mm:ss"
                    //     ),
                    //     check_out: moment(this.dateRange.endDate).format(
                    //         "YYYY-MM-DD HH:mm:ss"
                    //     ),
                    // }
                    )
                    .then(response => {
                        this.invoices = response.data
                    })
            },
            check(check_in) {
                const date = new Date(Date.now() + 1 * (60 * 60 * 1000));
                const now = moment(date).format("YYYY-MM-DD HH:mm:ss")
                if (check_in < now) {
                    return false;
                }else {
                    return true;
                }

            },
            getBusinessesList() {
                this.$axios
                    .get("/business/list")
                    .then(({ data }) => {
                        console.log(data)
                        this.businesses = data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
                    .finally(() => {
                    });
            },
            getYearAndMonthList() {
                this.$axios
                    .get("/invoices/datas")
                    .then(({ data }) => {
                        this.datas.months = data.months,
                        this.datas.years = data.years
                    })
                    .catch(e => {
                        console.log(e);
                    })
                    .finally(() => {
                    });
            },

            searchInvoices() {
                this.$axios
                    .post("dashboard/invoices", {
                        business_id: this.businessId,
                        year: this.datas.yearId,
                        month: this.datas.monthId,
                        search: this.datas.search,

                    })
                    .then(response => {
                        this.invoices = response.data
                    })
            },
            changeStatus(id, status){
                this.$axios
                    .post("invoices/change-status", {
                        invoice_id: id,
                        status: status
                    })
                    .then((res) => {
                        this.getInvoices();
                    })
            },

        },

        mounted() {
            this.getBusinessesList(),
            this.getInvoices(),
            this.getYearAndMonthList()
        },
    }

</script>
