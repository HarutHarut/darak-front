<template>
  <section class="static-section">
    <div class="title-box">
      <h4 class="title p-3">Title</h4>
    </div>
    <b-table-simple responsive class="w-100 static-table">
      <b-thead>
        <b-tr>
          <b-th>{{ $t("dashboard.fields.bookNumber") }}</b-th>
          <b-th>{{ $t("dashboard.form.guestName") }}</b-th>
          <b-th>{{ $t("form.checkIn") }}</b-th>
          <b-th>{{ $t("form.checkOut") }}</b-th>
          <b-th>{{ $t("dashboard.fields.price") }}</b-th>
          <b-th>{{ $t("dashboard.fields.result") }}</b-th>
          <b-th>{{ $t("dashboard.fields.action") }}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <!--                <b-tr>-->
        <!--                    <b-th>#1131321</b-th>-->
        <!--                    <b-td>Notebookmall</b-td>-->
        <!--                    <b-td>10/05/2021</b-td>-->
        <!--                    <b-td>10.5$</b-td>-->
        <!--                    <b-td><span class="status-order complated">{{$t("dashboard.statuses.completed")}}</span></b-td>-->
        <!--                    <b-td class="view-cell"><NuxtLink to="office/orders/id"><svg-icon class="base-icon icon-view" name="eye"></svg-icon></NuxtLink></b-td>-->
        <!--                    <b-td ><button class="btn btn-cancel">{{$t("dashboard.btn.cancel")}}</button></b-td>-->
        <!--                </b-tr>-->
        <b-tr v-for="order in orders" :key="order.id">
          <b-th>#{{order.booking_number}}</b-th>
          <b-th>{{order.user.name }}</b-th>
          <b-th>{{order.check_in }}</b-th>
          <b-th>{{order.check_out }}</b-th>
          <b-th>{{order.price + (order.currency || "EUR") }} </b-th>
          <b-th>{{order.status}} </b-th>
          <b-td class="view-cell">
            <NuxtLink :to="`/dashboard/orders/${order.booking_number}`">
              <svg-icon class="base-icon icon-view" name="eye"></svg-icon>
            </NuxtLink>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </section>
</template>

<script>
export default {
  props: ['orders'],
  filters: {
    getTransValue(val, lang) {
      return val[lang];
    }
  },


}
</script>