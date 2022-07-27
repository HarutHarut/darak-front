<template>
   <b-container fluid>
      <b-row>
         <b-col>
            <div
               class="page-content-top d-flex flex-wrap align-items-center justify-content-between"
            >
               <PageTitle :title="$t(`dashboard.list.sizes`)" image="reduce" />
               <!--          <div class="search-group d-flex flex-wrap">-->
               <!--              <div class="mr-3 mb-2 mb-sm-0">-->
               <!--                <b-form-select v-model="selected" :options="optionsSizes"></b-form-select>-->
               <!--            </div>-->
               <!--            <DatePicker/>-->
               <!--          </div>-->
            </div>

            <section class="static-section position-relative  mb-3">
               <button
                  v-b-modal.modal-create-sizes
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
                        <b-th>{{ $t("dashboard.fields.BusinessName") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.Description") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.Width") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.Height") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.Length") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.Status") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.Action") }}</b-th>
                     </b-tr>
                  </b-thead>
                  <b-tbody>
                     <b-tr v-for="size in sizes" :key="size.id">
                        <b-td>
                           {{size.name | getTransValue($i18n.locale) }}
                        </b-td>
                        <b-td>
                           <span v-if="size.business">
                              {{size.business.name | getTransValue($i18n.locale) }}
                           </span>
                           <span v-else>Global Admin</span>
                        </b-td>
                        <b-td>
                           {{size.desc | getTransValue($i18n.locale) }}
                        </b-td>
                        <b-td>{{ size.width }}</b-td>
                        <b-td>{{ size.height }}</b-td>
                        <b-td>{{ size.length }}</b-td>
                        <b-td>
                           <span
                              class="status-order complated"
                              v-if="size.verified === 1"
                           >
                              {{ $t('dashboard.statuses.verified') }}
                           </span>
                           <span class="status-order canceled" v-else>
                              {{ $t('dashboard.statuses.unverified') }}
                           </span>
                        </b-td>
                        <b-td class="cancel-cell">
                           <a href="#" @click="edit(size.id)">
                              <svg-icon
                                 class="base-icon"
                                 name="edit"
                              ></svg-icon> </a
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
         id="modal-edit-sizes"
         scrollable
         size="lg"
         title="Edit Size"
      >
         <SizeForm :errors="this.errors" :formData="form" v-on:submit="update"></SizeForm>
      </b-modal>

      <b-modal
         hide-footer
         id="modal-create-sizes"
         scrollable
         size="lg"
         title="Add Size"
      >
         <SizeForm :errors="this.errors"  v-on:submit="add"></SizeForm>
      </b-modal>

   </b-container>
</template>

<script>
import PageTitle from "../../components/dashboard/page-title"
import DatePicker from "../../components/dashboard/datepicker"
import SizeForm from "../../components/dashboard/size/form-size"
export default {
   components: {
      PageTitle,
      DatePicker,
      SizeForm
   },

   data() {
      return {
         errors: {},
         translationFieldsError: null,
         deleteId: null,
         perPage: 15,
         form: {
            height: null,
            width: null,
            length: null,
            name: {},
            desc: {},
            verified: 1
         }
      }
   },
   methods: {
      getSizes(page = 1) {
         this.$axios
            .get(`admin/sizes?page=${page}&perPage=15`)
            .then(({ data: { sizes } }) => {
               this.sizes = sizes.data
               this.total = sizes.total
               this.currentPage = sizes.current_page
            })
            .catch(e => {})
      },
      edit(id) {
         this.form = this.sizes.find(item => {
            return id === item.id
         })
         this.$bvModal.show("modal-edit-sizes")
      },
      update(form) {
         this.$axios
            .post(`/admin/sizes/${form.id}`, {
               _method: "put",
               ...form
            })
            .then(({ data }) => {
               this.getSizes(this.currentPage)
               this.$bvToast.toast(data.message, {
                  title: `Update successfully.`,
                  variant: "success",
                  solid: true
               })
               this.$bvModal.hide("modal-edit-sizes")
            })
            .catch(e => {
               const {errors} = e.response.data
               this.errors = errors
            })
      },
      add(form){
         this.$axios
            .post(`/admin/sizes`, form)
            .then(({ data }) => {
               this.getSizes(this.currentPage)
               this.$bvToast.toast(data.message, {
                  title: `Created successfully.`,
                  variant: "success",
                  solid: true
               })
               this.$bvModal.hide("modal-create-sizes")
            })
            .catch(e => {
               const {errors} = e.response.data
               this.errors = errors
               console.log(this.errors.desc, 'qweqweqweqweqwe')
               // this.translationFieldsError = "Please add all translation fields."
            })
      }
   },

   async asyncData({ $axios }) {
      const {
         data: { sizes }
      } = await $axios.get(`/admin/sizes?perPage=15`)

      return {
         currentPage: sizes.current_page,
         total: sizes.total,
         sizes: sizes.data
      }
   },
   
   filters: {
      getTransValue(val, lang) {
         return val[lang]
      }
   }
}
</script>
