import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  },

  extends: Pie,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}