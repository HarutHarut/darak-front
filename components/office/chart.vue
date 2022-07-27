<template>
  <b-row>
    <b-col lg="12">
      <section class="static-section">
        <div class="title-box d-flex align-items-center justify-content-between" v-b-toggle.chart>
            <h4 class="title p-3">{{ $t("dashboard.title.chart") }}</h4>
            <span class="when-opened">
              <svg-icon class="base-icon" name="up-chevron"></svg-icon>
            </span>
        </div>
        <b-collapse id="chart">
          <div class="chart-box mb-3">
              <line-chart :data="barChartData" :options="barChartOptions" :height="200" />
              <div class="d-flex px-3 pt-2">
                <p class="chart-name canceled-chart mr-4">{{$t("dashboard.statuses.canceled")}}</p>
                <p class="chart-name approved-chart mr-4">{{$t("dashboard.statuses.approved")}}</p>
              </div>
          </div>
        </b-collapse>
      </section>
    </b-col>
    <!-- <b-col lg="6">
      <section class="static-section">
        <div class="title-box">
          <h4 class="title p-3">Approved and canceled cells</h4>
        </div>
        <div class="chart-box mb-3">
            <pie-chart :data="pieChartData" :options="pieChartOptions" :height="200" />
            <div class="d-flex px-3 pt-2">
              <p class="chart-name canceled-chart mr-4">{{$t("dashboard.statuses.canceled")}}</p>
              <p class="chart-name approved-chart mr-4">{{$t("dashboard.statuses.approved")}}</p>
            </div>
        </div>
      </section>
    </b-col> -->
  </b-row>
</template>

<script>

import BarChart from '~/components/BarChart'

const chartColors = {
  blue: 'rgb(76, 136, 197)',
  darkBlue: 'rgb(31, 48, 63)',
  approvedCell: '#63e17f',
  cancelCell: '#ef5765',
};

export default {
  data() {
    return {
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'],
        datasets: [
          {
            label: 'Data one',
            backgroundColor: [chartColors.blue],
            data: [10, 15, 10, 18, 25]
          },
          {
          label: 'Data Two',
          backgroundColor: [chartColors.darkBlue],
          data: [15, 16, 15, 24, 30]
        }
        ]
      },

      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: this.$t('dashboard.list.orders'),
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },

      pieChartData: {
        labels: ['Approved', 'Canceled', 'Booking'],
        
        datasets: [
          {
            label: 'Data',
            backgroundColor: [ chartColors.approvedCell, chartColors.cancelCell],
            data: [35, 65]
          },
        ]
      },

      pieChartOptions: {
        responsive: true,

        legend: {
          display: false,
        },
        
        title: {
          display: true,
          text: this.$t('dashboard.list.orders'),
        },

        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  components: {
    BarChart
  }
}
</script>