<template>
   <div>
      <div
         class="title-box d-flex align-items-center justify-content-between"
         v-b-toggle.collapse-lockers-price
      >
         <h4 class="title p-3">
            {{ $t("dashboard.title.lockersPrices") }}
         </h4>
         <span class="when-opened">
            <svg-icon class="base-icon" name="up-chevron"></svg-icon>
         </span>
      </div>
      <b-collapse visible id="collapse-lockers-price">
         <div class="position-relative">
            <b-table-simple responsive class="w-100 office-page-table">
               <b-thead>
                  <b-tr>
                     <b-th>{{ $t('title.lockerName') }}</b-th>
                     <b-th>{{ $t('dashboard.tooltip.startTime') }}</b-th>
                     <b-th>{{ $t('dashboard.tooltip.endTime') }}</b-th>
                     <b-th>{{ $t('dashboard.tooltip.price') }}</b-th>
                  </b-tr>
               </b-thead>
               <b-tbody>
                  <b-tr :key="price.id" v-for="(price) in prices">
                     <b-td>{{price.lockerName |  getTransValue($i18n.locale)}}</b-td>
                     <b-td>{{ price.range_start }}</b-td>
                     <b-td>{{ price.range_end }}</b-td>
                     <b-td>{{price.price}}</b-td>
                  </b-tr>
               </b-tbody>
            </b-table-simple>
         </div>
      </b-collapse>
   </div>
</template>

<script>
export default {
   name: "locker-price-card",
   props: ['lockers'],
   data() {
      return {
         prices: []
      }
   },
   mounted() {
      const prices = []
      this.lockers.forEach((locker) => {
         locker.prices.forEach((price) => {
            prices.push({
               lockerName: locker.size.name,
               ...price
            })
         })
      })

      this.prices = prices
   },
   filters: {
      getTransValue(val, lang) {
         return val[lang]
      }
   }
}
</script>

<style scoped></style>
