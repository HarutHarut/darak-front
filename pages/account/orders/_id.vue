<template>
  <b-container>
    <b-row>
      <b-col>
        <h2 class="title-primary d-flex align-items-center">{{ $t("dashboard.fields.order") }}
          #{{ singleOrderData.booking_number }} <span class="status-order ml-3"
                                                      :class="singleOrderData.status">{{
              singleOrderData.status
            }}</span>
        </h2>

        <h2>{{$t("account.branch")}}</h2>

        <b-col>
          <ul class="card-list">
            <li class="d-flex justify-content-between"><p class="item-title">{{$t("account.name")}}</p><p>{{ singleOrderData.bookings[0].branch.name.en | dateTable }}</p></li>
            <li class="d-flex justify-content-between"><p class="item-title">{{$t("account.email")}}</p><p>{{ singleOrderData.bookings[0].branch.email | dateTable }}</p></li>
            <li class="d-flex justify-content-between"><p class="item-title">{{$t("account.address")}}</p><p>{{ singleOrderData.bookings[0].branch.address }}</p></li>
            <li class="d-flex justify-content-between"><p class="item-title">{{$t("account.phone")}}</p><p>{{ JSON.parse(singleOrderData.bookings[0].branch.country_code).code + ' ' + singleOrderData.bookings[0].branch.phone }}</p></li>
          </ul>
        </b-col>
        <h3 class="mt-4">{{ singleOrderData.user.name }}</h3>
        <!-- <p class="mt-2">{{singleOrderData.user.}}<br> -->
        <!-- +1-231-550-3613<br> -->
        <p>{{ singleOrderData.user.email }}</p>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="12">
        <div class="user-info mb-5">

          <h3 class="title-tertiary">{{$t("dashboard.fields.price")}}</h3>
          <!-- <p>phone</p> -->
          <p>{{ singleOrderData.price }}{{ singleOrderData.currency }}</p>
        </div>
      </b-col>
      <b-col xl="5" lg="6" :key="booking.id" v-for="(booking) in arrSizeCount">
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

    <div v-if="!feedback && singleOrderData.status == 'completed'" class="order-feedback">
      <div class="my-2">
        <h3>{{ $t("feedback.title") }}</h3>
      </div>
      <form autocomplete="on" class="author-form">
        <b-form-group
            :label="$t('form.input.message')"
            label-for="feedbackMessage"
        >
          <b-form-textarea
              id="feedbackMessage"
              name="feedbackMessage"
              rows="4"
              v-model="feedbackForm.text"
              :placeholder="$t('form.input.message')"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
            :label="$t('feedback.rating')"
            label-for="feedbackRating"
        >
          <b-form-rating id="feedbackRating" v-model="feedbackForm.rating" color="#e56943" size="sm" inline
                         no-border name="feedbackRating"></b-form-rating>
        </b-form-group>

        <div class="text-center">
          <b-button class="mt-3 btn-success" @click="feedbackOrder()"> {{ $t("form.btn.btnSend") }}</b-button>
        </div>
      </form>

    </div>
    <div v-else class="order-feedback">
      <div v-if="feedback">
        <div class="my-2">
          <h3>{{ $t('feedback.yourFeedback') }}</h3>
        </div>
        <div v-if="feedback.text">{{ feedback.text }}</div>
        <div v-if="feedback.rating">
          <b-form-rating id="feedbackRating" v-model="feedback.rating" color="#e56943" size="sm" inline readonly
                         no-border name="feedbackRating"></b-form-rating>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>

import moment from 'moment'

export default {
  data() {
    return {
      feedbackForm: {
        text: '',
        rating: 5
      },
      bookingCount: null,
      singleOrderData: null,
    }
  },
  filters: {
    date(val) {
      const date = moment(val).format('D MMMM YYYY, h:mm:ss ')
      return date.toString()
    },

    getTransValue(val, lang) {
      return val[lang]
    }
  },
  async asyncData({$axios, route}) {
    const {data} = await $axios.post(`orders/single/${route.params.id}`);
    console.log(data)
    var count = 0;
    data.order.bookings.forEach(e => {
      count += e.amount;
    });
    return {
      arrSizeCount: data.order.arrSizeCount,
      singleOrderData: data.order,
      branchCount: count,
      feedback: data.order.feedback,
    }
  },
  methods: {
    feedbackOrder() {
      this.$axios.post(`user/feedback/create`, {
        order_id: this.singleOrderData.id,
        feedback: this.feedbackForm.text,
        rating: this.feedbackForm.rating,
      }).then(({data: {feedback}}) => {
        this.$bvToast.toast(`Feedback created successfully.`, {
          title: `Feedback created successfully.`,
          variant: "success",
          solid: true
        });
        this.feedback = feedback
      }).catch((error) => {
        console.log(error)
      })
    },
  }
}
</script>
