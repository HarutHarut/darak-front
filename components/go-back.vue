<template>
   <button class="btn-back" @click="goBack">
      <svg-icon class="base-icon" name="arrow-left"></svg-icon>
      <span class="pl-2 go-back-text">Go back</span>
   </button>
</template>

<script>

export default ({
   methods: {
      goBack() {
         return this.$router.go(-1)
      }
   }
})
</script>
