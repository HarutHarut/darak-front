<template>
  <b-col cols="12" class="px-0">
    <div>
      <b-card no-body header="Description">
        <b-tabs card>
          <b-tab title="Eng" active>
            <b-form-group
                :label="$t('dashboard.fields.about_city')"
                label-for="input-11"
            >
              <ckeditor v-model="about_city.en"></ckeditor>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.fields.description')"
                label-for="input-11"
            >
              <ckeditor v-model="description.en"></ckeditor>
            </b-form-group>

          </b-tab>
          <b-tab title="Рус">
            <b-form-group
                :label="$t('dashboard.fields.about_city')"
                label-for="input-11"
            >
              <ckeditor v-model="about_city.ru"></ckeditor>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.fields.description')"
                label-for="input-11"
            >
              <ckeditor v-model="description.ru"></ckeditor>
            </b-form-group>

          </b-tab>
          <b-tab title="Fra">
            <b-form-group
                :label="$t('dashboard.fields.about_city')"
                label-for="input-11"
            >
              <ckeditor v-model="about_city.fr"></ckeditor>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.fields.description')"
                label-for="input-11"
            >
              <ckeditor v-model="description.fr"></ckeditor>
            </b-form-group>

          </b-tab>

          <b-tab title="中文">
            <b-form-group
                :label="$t('dashboard.fields.about_city')"
                label-for="input-11"
            >
              <ckeditor v-model="about_city.ch"></ckeditor>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.fields.description')"
                label-for="input-11"
            >
              <ckeditor v-model="description.ch"></ckeditor>
            </b-form-group>

          </b-tab>

          <b-tab title="Հայ">
            <b-form-group
                :label="$t('dashboard.fields.about_city')"
                label-for="input-11"
            >
              <ckeditor v-model="about_city.am"></ckeditor>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.fields.description')"
                label-for="input-11"
            >
              <ckeditor v-model="description.am"></ckeditor>
            </b-form-group>

          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "city-desc-translation",
  props: ["about_city", "description"]
};
</script>

<style scoped></style>
