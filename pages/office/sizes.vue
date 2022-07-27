<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <PageTitle :title="title" :image="image"/>

        <section class="static-section position-relative  mb-3">
          <button
              v-b-modal.modal-add-sizes
              type="button"
              class="btn-add ml-auto"
          >
            <svg-icon class="base-icon" name="add-button"></svg-icon>
          </button>
          <div class="title-box">
            <h4 class="title p-3">{{ $t("dashboard.list.sizes") }}</h4>
          </div>
          <b-table-simple responsive class="reports-table static-table">
            <b-thead>
              <b-tr>
                <b-th>{{ $t("dashboard.fields.name") }}</b-th>
                <b-th>{{ $t("dashboard.fields.Description") }}</b-th>
                <b-th>{{ $t("dashboard.fields.Width") }}</b-th>
                <b-th>{{ $t("dashboard.fields.Height") }}</b-th>
                <b-th>{{ $t("dashboard.fields.Length") }}</b-th>
                <b-th>{{ $t("dashboard.fields.Action") }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="size in sizes" :key="size.id">
                <b-td>{{
                    size.name | getTransValue($i18n.locale)
                  }}
                </b-td>
                <b-td>{{
                    size.desc | getTransValue($i18n.locale)
                  }}
                </b-td>
                <b-td>{{ size.width }}</b-td>
                <b-td>{{ size.height }}</b-td>
                <b-td>{{ size.length }}</b-td>
                <b-td class="cancel-cell">
                  <a v-if="!size.verified" href="#" @click="confirmDelete(size.id)"
                  >
                    <svg-icon
                        class="sm-icon icon-cancel"
                        name="cancel"
                    ></svg-icon>
                  </a
                  ></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <div class="p-2" v-if="total > perPage || currentPage !== 1">
            <b-pagination
                pills
                class="justify-content-center"
                size="md"
                v-model="currentPage"
                :total-rows="total"
                :per-page="perPage"
                @change="getSizes"
                aria-controls="my-table"
            ></b-pagination>
          </div>
        </section>
      </b-col>
    </b-row>

    <b-modal
        hide-footer
        id="modal-add-sizes"
        scrollable
        size="lg"
        @hide="clearFormDataOnModalHidden"
        :title="$t('dashboard.add.sizes')"
    >
      <SizeForm
          :errors="this.errors"
          :branches="branches"
          v-on:submit="submit"
          :form="form"
          :translationFieldsError="translationFieldsError"
      ></SizeForm>
    </b-modal>

    <b-modal id="size-delete" hide-footer hide-header>
      <p class="text-center">{{ $t('dashboard.fields.deleteThisItem') }}?</p>
      <div class="text-center">
        <b-button class="mt-3 btn-success" @click="deleteSize()"
        >{{ $t('dashboard.fields.Yes') }}
        </b-button
        >
        <b-button
            class="mt-3 btn-danger"
            @click="$bvModal.hide('size-delete')"
        >{{ $t('dashboard.fields.No') }}
        </b-button
        >
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import PageTitle from "@/components/office/page-title.vue"
import SizeForm from "../../components/buisness/sizes/form-size"

export default {
  components: {
    PageTitle,
    SizeForm
  },

  data() {
    return {
      errors: {},
      translationFieldsError: null,
      title: this.$t("dashboard.list.sizes"),
      image: "reduce",
      sizes: [],
      branches: [],
      deleteId: null,
      currentPage: 1,
      perPage: 15,
      total: 0,
      form: {
        height: null,
        width: null,
        length: null,
        name: {},
        desc: {},
        branch_id: null
      }
    }
  },
  methods: {
    getSizes(page = 1) {
      this.$axios
          .get(`sizes?page=${page}&perPage=15`)
          .then(({data}) => {
            this.sizes = data.sizes.data
            // this.branches = data.branches
          })
          .catch(e => {
          })
    },
    submit(data) {
      this.$axios
          .post("/sizes/create", data)
          .then(({data}) => {
            this.form = {
              height: null,
              width: null,
              length: null,
              name: {},
              desc: {},
              branch_id: null
            }
            this.$bvModal.hide("modal-add-sizes")
            this.getSizes()
          })
          .catch(error => {
            switch (error.response.status) {
              case 422:
                const {errors} = error.response.data
                this.errors = errors
                //this.$refs.branchAdd.setErrors(errors)

                for (const prop in errors) {
                  if (
                      prop.search("desc") > -1 ||
                      prop.search("name") > -1
                  ) {
                    this.translationFieldsError =
                        "Please add all translation fields."
                  }
                }
                break
            }
          })
    },
    confirmDelete(id) {
      this.deleteId = id
      this.$bvModal.show("size-delete")
    },
    deleteSize() {
      this.$axios
          .delete(`/sizes/${this.deleteId}`)
          .then(({data}) => {
            this.getSizes()
          })
          .catch(error => {
            switch (error.response.status) {
              case 400:

                this.$bvToast.toast(error.response.data.message, {
                  title: `Size delete`,
                  variant: 'danger',
                  solid: true
                });
                break
            }
          }).finally(() => {
        this.$bvModal.hide("size-delete")

      })
    },
    clearFormDataOnModalHidden() {
      this.form.height = null;
      this.form.width = null;
      this.form.length = null;
      this.form.name = {};
      this.form.desc = {};
      this.form.branch_id = null;
    }
  },
  filters: {
    getTransValue(val, lang) {
      return val[lang]
    }
  },
  mounted() {
    this.getSizes()
  }
}
</script>
