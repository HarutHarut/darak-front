<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
          <PageTitle :title="title" :image="image"/>
          <SearchForm v-on:searchEmit="getStatics"/>
        </div>
        <section class="static-section position-relative">
          <div class="title-box">
            <h4 class="title p-3">{{ $t("dashboard.list.staticPages") }}</h4>
          </div>
          <b-table-simple responsive class="static-table">
            <b-thead>
              <b-tr>
                <b-th>Slug</b-th>
                <b-th>Title</b-th>
                <b-th>Actions</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="item in statics" :key="item.id">
                <b-td>{{ item.slug }}</b-td>
                <b-td>
                  <p v-if="item.title[$i18n.locale]">{{ item.title | getTransValue($i18n.locale) }}</p>
                  <p v-else>{{ item.title.en }}</p>
                </b-td>
                <b-td class="cancel-cell">
                  <a href="#" @click="edit(item.id)">
                    <svg-icon class="base-icon" name="edit"></svg-icon>
                  </a>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </section>
      </b-col>
    </b-row>

    <b-modal
        hide-footer
        id="modal-edit-statics"
        scrollable
        size="xl"
        title="Edit Static"
    >
      <StaticForm :formData="form" v-on:submit="update"></StaticForm>
    </b-modal>
  </b-container>
</template>

<script>

import PageTitle from '@/components/dashboard/page-title.vue'
import SearchForm from '@/components/dashboard/search-form.vue'
import StaticForm from "../../components/dashboard/statics/form-static"
import moment from "moment";

export default {
  components: {
    PageTitle,
    SearchForm,
    StaticForm,
  },

  data() {
    return {
      title: this.$t('dashboard.list.staticPages'),
      image: 'pages',
      form: {
        title: {},
        description_am: '',
        description_ru: '',
        description_en: '',
        description_sp: '',
        description_ch: '',
        description_de: '',
        description_fr: '',
        verified: 1,
        meta_title: {},
        meta_description: {},
        meta_keywords: {}
      }
    }
  },
  async asyncData({$axios}) {
    const {data: {statics}} = await $axios.get(`/admin/statics`)
    return {
      statics: statics
    }
  },
  filters: {
    changeDataFormat(val) {
      return moment(val)
          .format("DD/MM/YYYY")
          .toString()
    },
    getTransValue(val, lang) {
      return val[lang]
    },
    dateTable(val) {
      const date = moment(val).format('D MMMM YYYY, h:mm:ss ')
      return date.toString()
    },
  },
  methods: {
    getStatics(search) {

      this.$axios
          .get(`admin/statics?search=${search}`)
          .then(({data: {statics}}) => {
            this.statics = statics
          })
          .catch(e => {
          })
    },
    edit(id) {
      this.form = this.statics.find(item => {
        return id === item.id
      })
      this.$bvModal.show("modal-edit-statics")
    },
    update(form) {
      this.$axios
          .post(`/admin/statics/update/${form.slug}`, {
            _method: "put",
            ...form
          })
          .then(({data}) => {
            this.$bvToast.toast(data.message, {
              title: `Update successfully.`,
              variant: "success",
              solid: true
            })
            this.$bvModal.hide("modal-edit-statics");
            window.location.reload();
          })
          .catch(e => {
            console.log(e)
          })
    },
  },
}

</script>