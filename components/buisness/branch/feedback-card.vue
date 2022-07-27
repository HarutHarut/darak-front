<template>
   <div>
      <div :key="index" class="static-section p-3" v-for="(feedback, index) in feedbacks">
         <div class="post mb-3">
            <div class="user-block d-flex mb-3">
               <div class="user-img mr-2 float-left">
                  <img
                     v-if="feedback.user.avatar"
                     :src="feedback.user.avatar"
                     class="img-fluid"
                     alt=""
                  />

                  <img
                     v-else
                     :src="require('@/assets/img/user.png')"
                     class="img-fluid"
                     alt=""
                  />
               </div>
               <div class="user-info">
                  <p class="username">{{feedback.user.name}}</p>
                  <p class="info">Shared publicly - {{feedback.created_at | changeDataFormat}}</p>
               </div>
            </div>
            <p class="description mb-2">
               {{feedback.text}}
            </p>
         </div>
      </div>

   </div>
</template>

<script>
import moment from "moment";
export default {
   name: "feedback-card",
   props:['feedbacks'],
   filters: {
      changeDataFormat(val) {
         const date = moment(val).format("DD/MM/YYYY")
         return date.toString()
      }
   }
};
</script>

<style scoped>

</style>