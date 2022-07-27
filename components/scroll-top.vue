<template>
    <div>
        <button @click="scrollTop"  class="btn-blue scroll-top d-flex align-items-center justify-content-center"><svg-icon class="base-icon" name="up-chevron" /></button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener)
  },
  methods: {
   scrollTop() {
          window.scroll({
            top: 0,
            behavior: 'smooth'
         });
      },
     scrollListener: function () {
      if(window.scrollY > 50) {
        document.querySelector('.scroll-top').style.opacity = 1;
        document.querySelector('.header').classList.add('fixed');
      }
      else {
        document.querySelector('.scroll-top').style.opacity = 0;
        document.querySelector('.header').classList.remove('fixed');
      }
    }
  }
 
}
</script>