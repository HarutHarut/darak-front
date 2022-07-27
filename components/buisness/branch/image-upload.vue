<template>
   <b-col class="px-0">
      <div class="multiple-upload image-upload-box mb-3">
         <div class="control-form">
            <div class="upload-img-content">
               <div>
                  <label
                     for="fileUpload"
                     class="text-center my-2 d-flex align-items-center justify-content-center"
                  >
                     <span class="mr-2">{{
                        $t("dashboard.upload.images")
                     }}</span>
                     <svg-icon class="md-icon" name="download"></svg-icon>
                  </label>

                  <b-form-file
                     type="file"
                     id="fileUpload"
                     class="upload-file"
                     @change="addImg"
                     ref="inputer"
                     style="display: none"
                     multiple
                     accept="image/png,image/jpeg,image/gif,image/jpg"
                  ></b-form-file>
               </div>

               <ul class=" border upload-img-content p-2 d-flex flex-wrap">
                  <li v-for="(value, key) in images" v-bind:key="key">
                     <div
                        class="img"
                        :class="{ isDefault: value.default === 1 }"
                     >
                        <img :src="value.url"
                           class="image"
                           v-if="value.file !== null"
                        />
                        <img
                           :src="value.url"
                           class="image"
                           v-else
                        />
                        <a
                                class="close"
                                @click="changeLogo(key)"
                                style="top: 4px; right: 5px"
                                title="Set Default"
                        >
                           <img v-if="value.default === 0"
                                style="width: 47px; height: 18px;padding: 0px ;"
                                :src="require('@/assets/img/check-icon.png')"
                                class="image"/>
                        </a>
                        <a class="close" @click="deleteImg(key)">×</a>
                     </div>
                  </li>
               </ul>
            </div>
            <p class="help-block text-center">
               {{ $t("dashboard.upload.imageRecommendations") }}
            </p>
         </div>
      </div>
      <div class="pl-4 pb-2" v-if="imageError">
         <p class="error-text">
            {{ $t("dashboard.upload.pleaseUploadImages") }}.
         </p>
      </div>
   </b-col>
</template>

<script>
export default {
   name: "image-upload",
   props: ["images", "imageError"],
   methods:{
      deleteImg(key){
         this.$emit('deleteImg',key)
      },
      changeLogo(key){
         this.$emit('changeLogo',key)
      },
      addImg(event){
         this.$emit('addImg',event)
      }
   }
}
</script>

<style scoped></style>
