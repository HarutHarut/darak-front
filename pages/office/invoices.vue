<template>
    <b-container fluid class="invoices-section">
        <div class="page-content-top">
            <PageTitle :title="title" :image="image"/>
        </div>
        <div class="card base-card">
            <div class="card-body" v-if="business">
                <p>{{$t("dashboard.invoice.legalCompanyName")}}: <span v-if="business.name" class="text-primary">{{business.name.en}}<b-icon icon="exclamation-circle-fill" variant="primary" class="ml-1"></b-icon></span></p>
                <p class="mt-2">{{$t("dashboard.invoice.hereYouCanSeeTheHistory")}}</p>
                <b-button v-if="showButton" @click="pay" variant="primary" class="mt-4">{{$t("dashboard.invoice.payInvoicesOnline")}}</b-button>
                <p class="mb-2 mt-3 font-weight-bold">{{$t("dashboard.invoice.selectTheInvoices")}}</p>
                <p v-if="error" class="note-block">{{$t("dashboard.invoice.pleaseMakeSure")}}</p>

                <b-row class="mt-5">
                    <b-col lg="2" cols="12" class="px-4">
                        <p class="pl-2 mb-2">{{$t("dashboard.invoice.filterByYear")}}</p>
<!--                        <b-button @click="getInvoices()" variant="primary" class="year-btn">{{ $t("dashboard.invoice.all") }}</b-button>-->

                        <b-button v-for="(item, index) in filterDate" v-bind:key="index" @click="filterByYear(item)" variant="primary" class="year-btn" :class="index == 0 ? 'active' : ''">{{ item }}</b-button>
                    </b-col>
                    <b-col>
                            <b-container>
                                <b-row class="mb-2">
                                    <b-col cols class="item">
                                        {{$t("dashboard.invoice.invoice")}}
                                    </b-col>
                                    <b-col cols class="item">
                                        {{$t("dashboard.invoice.description")}}
                                    </b-col>
                                    <b-col cols class="item">
                                        {{$t("dashboard.invoice.dueBy")}}
                                    </b-col>
                                    <b-col cols class="item">
                                        {{$t("dashboard.invoice.invoiceAmount")}}
                                    </b-col>
                                    <b-col cols class="item">
                                        {{$t("dashboard.invoice.status")}}
                                    </b-col>
                                </b-row>
                                <b-row v-for="(invoice, index) in invoices" :key="index" lg="10" cols="12" :class="'invoice-row' + ' ' + statuses[invoice.status]">
                                    <b-col cols class="item invoice-col">
                                        <p class="font-weight-bold"><b-icon icon="check" variant="success" class="font-weight"></b-icon>{{invoice.invoice_number}}</p>
                                        <b-link target="_blank" :href="$config.cdnUrl + '/storage/' + invoice.file_name">{{$t("dashboard.invoice.downloadPdf")}}</b-link>
                                    </b-col>
                                    <b-col cols class="item desc">
                                        <p><span>{{$t("dashboard.invoice.period")}}:</span>{{ invoice.period_first_day | date('date') }} - {{ invoice.period_last_day | date('date') }}</p>
                                        <p><span>{{$t("dashboard.invoice.date")}}:</span>{{invoice.created_at | date('date')}}</p>
                                        <p><span>{{$t("dashboard.invoice.invoiceType")}}:Commission</span></p>
                                    </b-col>
                                    <b-col cols class="item">
                                        {{ invoice.due_by | date('date')}}
                                    </b-col>
                                    <b-col cols class="item">
                                        {{invoice.amount + invoice.amount_currency}}
                                    </b-col>
                                    <b-col cols class="item status-col toCapitalFirst">
                                        {{ statuses[invoice.status]}}
                                    </b-col>
                                </b-row>
                            </b-container>
                    </b-col>


                </b-row>
            </div>
        </div>
    </b-container>

</template>

<script>
import moment from "moment";
import invoices from "./invoices";
import PageTitle from '@/components/office/page-title.vue'
export default {
  components: {
    PageTitle
  },

  data() {
    return {
      paymentUrl: '',
      error: '',
      showButton: false,
      statuses: {
        0: "default",
        1: "success",
        2: "pending",
        3: "error",
        4: "decline",
      },
      options: { year: 'numeric', month: 'long', day: 'numeric' , hour: null, minute: '2-digit'},
      invoices: {},
      balanceVal: "",
      selected: 'payment',
      business: {},
      filterDate: [],
      title: this.$t('dashboard.list.invoices'),
      image: 'balance',
    };
  },
  filters: {
    date(val, type) {
      let date ;
      if(type === 'date') {
        date = moment(val).format("ddd D MMM YYYY");
      } else {
        date = moment(val).format("D MMM YYYY");
      }
      return date.toString();
    },
    period(val) {
      let start = moment().month(val - 1).startOf('month').format('D MMM YYYY');
      let end = moment().month(val - 1 ).endOf('month').format('D MMM YYYY');
      let date = start + " - " + end;
      return date.toString()
    }
  },
  methods: {
    addBalance() {
        document.querySelector('.balance-val').innerHTML = this.balanceVal + '€';
        document.querySelector('.balance-form').classList.remove("disabled");
    },
    pay() {
      this.$axios.post(this.paymentUrl).then((res) => {
        window.location.href = res.data.formUrl;
      }).catch((res) => {
          this.makeToast();
      })
    },
    filterByYear(item){
        let allYearBtn = document.querySelectorAll('.year-btn');
        allYearBtn.forEach((item) =>{
            item.classList.remove('active');
        })
        event.target.classList.toggle('active');
      this.getInvoices(item)
    },
    getInvoices(item = ''){
        this.$axios.get('/invoices?year=' + item).then((res) => {
            this.business = res.data.business;
            this.invoices = res.data.invoices;
            this.filterDate = res.data.filterDate;
            this.invoices.forEach((invoice) => {
                if(invoice.status === 0) {
                    this.showButton = true;
                    this.paymentUrl = '/newPay/' + invoice.id
                }
            })
        })
    },
  makeToast(variant = null) {
      this.$bvToast.toast('Error processing your request', {
          title: `Error`,
          variant: 'danger',
          autoHideDelay: 5000,
          solid: true
      });
      this.$bvModal.hide('modal-sign');
  },
  },
  mounted() {
    this.getInvoices()
  }
};
</script>