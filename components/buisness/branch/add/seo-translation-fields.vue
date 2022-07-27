<template>
  <b-col cols="12" class="px-0">
    <div>
      <b-card no-body header="SEO">
        <b-tabs card>
          <b-tab title="Eng" active>
            <b-form-group
                :label="$t('dashboard.seo.meta.title')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_title.en"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.description')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_description.en"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.keywords')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_keywords.en"
                  placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="Рус">
            <b-form-group
                :label="$t('dashboard.seo.meta.title')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_title.ru"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.description')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_description.ru"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.keywords')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_keywords.ru"
                  placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="Fra">
            <b-form-group
                :label="$t('dashboard.seo.meta.title')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_title.fr"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.description')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_description.fr"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.keywords')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_keywords.fr"
                  placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-tab>

          <b-tab title="中文">
            <b-form-group
                :label="$t('dashboard.seo.meta.title')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_title.ch"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.description')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_description.ch"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.keywords')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_keywords.ch"
                  placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-tab>

          <b-tab title="Հայ">
            <b-form-group
                :label="$t('dashboard.seo.meta.title')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_title.am"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.description')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_description.am"
                  placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group
                :label="$t('dashboard.seo.meta.keywords')"
                label-for="input-11"
            >
              <b-form-input
                  id="input-11"
                  v-model="meta_keywords.am"
                  placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "seo-translation-fields",
  props: ["meta_title", "meta_description", "meta_keywords"]
};
</script>

<style scoped></style>
