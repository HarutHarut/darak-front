<template>
  <div class="banner d-flex align-items-end card-overlay"
       :style="{ backgroundImage: 'url('+require(`~/assets/img/${image}`)+')' }">
    <div class="page-text-overlay">
      <b-container>
        <b-row>
          <b-col>
            <h1 class="title-primary">{{ title }}</h1>
            <a v-if="partner && !userData || userData && userData.role.name !== 'admin'" class="btn-color btn-large" v-b-modal.modal-sign-partner href="#">{{ btn }}</a>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'title',
    'image',
    'btn'
  ],
  data: function () {
    return {
      userData: {
        role: {
          name: null,
        },
      },
      partner: this.btn,
    }
  },
  mounted() {
    this.userData = this.$auth.user
    console.log(this.userData)
  }
}
</script>
