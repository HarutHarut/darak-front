<template>
    <div class="page-title-box d-flex align-items-center mr-3 mb-4">
        <span class="icon-box mr-2 d-flex align-items-center justify-content-center">
          <svg-icon class="base-icon" :name="image"></svg-icon>
        </span>
        <h3 class="mb-0">{{title}}</h3>
    </div>
</template>

<script>

export default {
   props: [
      'title', 
      'image'
    ],
    data() {
    return {
  
    }
  },
}
</script>