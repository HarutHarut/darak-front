<template>
  <div v-if="loading" class="loading"></div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
  }),

  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
