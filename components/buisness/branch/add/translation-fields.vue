<template>
   <b-col cols="12" class="px-0">
      <div>
         <b-card no-body>
            <b-tabs card>
               <b-tab title="Eng" active>
                  <b-form-group
                     :label="$t('dashboard.fields.name')"
                     label-for="input-1"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.name')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <b-form-input
                  id="input-1"
                  v-model="name.en"
                  placeholder=""
               ></b-form-input>

                  <b-form-group
                     :label="$t('dashboard.fields.branchDescription')"
                     label-for="branch-textarea"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.description')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <ckeditor
                     id="branch-textarea"
                     v-model="description.en"
                  ></ckeditor>
               </b-tab>
              <b-tab title="Рус">
                <b-form-group
                    :label="$t('dashboard.fields.name')"
                    label-for="input-1"
                    class="d-flex mb-0 mt-2"
                >
                  <span v-b-tooltip.hover :title="$t('dashboard.tooltip.name')" class="ml-2">
                     <svg-icon class="base-icon" name="question-mark"></svg-icon>
                  </span>
                </b-form-group>
                <b-form-input
                  id="input-1"
                  v-model="name.ru"
               ></b-form-input>

                <b-form-group
                    :label="$t('dashboard.fields.branchDescription')"
                    label-for="branch-textarea"
                    class="d-flex mb-0 mt-2"
                >
                  <span v-b-tooltip.hover :title="$t('dashboard.tooltip.description')" class="ml-2">
                     <svg-icon class="base-icon" name="question-mark"></svg-icon>
                  </span>
                </b-form-group>
                <ckeditor
                  id="branch-textarea"
                  v-model="description.ru"
               ></ckeditor>
              </b-tab>
               <b-tab title="Fra">
                  <b-form-group
                     :label="$t('dashboard.fields.name')"
                     label-for="input-1"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.name')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <b-form-input
                     id="input-1"
                     v-model="name.fr"
                  ></b-form-input>

                  <b-form-group
                     :label="$t('dashboard.fields.branchDescription')"
                     label-for="branch-textarea"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.description')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <ckeditor
                     id="branch-textarea"
                     v-model="description.fr"
                  ></ckeditor>
               </b-tab>

               <b-tab title="中文">
                  <b-form-group
                     :label="$t('dashboard.fields.name')"
                     label-for="input-1"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.name')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <b-form-input
                     id="input-1"
                     v-model="name.ch"
                     placeholder=""
                  ></b-form-input>

                  <b-form-group
                     :label="$t('dashboard.fields.branchDescription')"
                     label-for="branch-textarea"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.description')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <ckeditor
                     id="branch-textarea"
                     v-model="description.ch"
                  ></ckeditor>
               </b-tab>

               <b-tab title="Հայ">
                  <b-form-group
                     :label="$t('dashboard.fields.name')"
                     label-for="input-1"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.name')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <b-form-input
                     id="input-1"
                     v-model="name.am"
                     placeholder=""
                  ></b-form-input>
                  <b-form-group
                     :label="$t('dashboard.fields.branchDescription')"
                     label-for="branch-textarea"
                     class="d-flex mb-0 mt-2"
                  >
                     <span v-b-tooltip.hover :title="$t('dashboard.tooltip.description')" class="ml-2">
                        <svg-icon class="base-icon" name="question-mark"></svg-icon>
                     </span>
                  </b-form-group>
                  <ckeditor
                  id="branch-textarea"
                  v-model="description.am"
               ></ckeditor>
               </b-tab>
            </b-tabs>
         </b-card>
      </div>
   </b-col>
</template>

<script>
export default {
   name: "translation-fields",
   props: ["name", "description"]
};
</script>

<style scoped></style>
