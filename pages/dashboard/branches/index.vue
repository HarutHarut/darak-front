<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
          <PageTitle :title="title" :image="image"/>
          <div class="d-flex flex-wrap align-items-center mb-3">
            <div class="mr-3 mb-2 mb-sm-0">
              <b-form-select @change="searchBranch" v-model="selected">
                <b-form-select-option value="0">
                  All
                </b-form-select-option>
                <b-form-select-option
                    :value="business.id"
                    v-for="(business) in businessList"
                    :key="business.id">
                  {{ business.name | getTransValue($i18n.locale) }}
                </b-form-select-option>
              </b-form-select>
            </div>
            <SearchForm @searchEmit="search"/>
          </div>
        </div>
        <section class="static-section position-relative">
          <div class="title-box">
            <h4 class="title p-3">{{ $t('dashboard.list.branchs') }}</h4>
          </div>
          <NuxtLink :to="prepareUrl('/dashboard/branches/add')" class="btn-add ml-auto">
            <svg-icon class="base-icon" name="add-button"></svg-icon>
          </NuxtLink>
          <b-table-simple responsive class="w-100 static-table">
            <b-thead>
              <b-tr>
                <b-th>{{ $t("dashboard.list.branchNumber") }}</b-th>
                <b-th>{{ $t("dashboard.list.branchs") }}</b-th>
                <b-th>{{ $t("dashboard.fields.phone") }}</b-th>
                <b-th>{{ $t("dashboard.fields.business") }}</b-th>
                <b-th>{{ $t("dashboard.fields.currency") }}</b-th>
                <b-th>{{ $t("dashboard.fields.city") }}</b-th>
                <b-th>{{ $t("dashboard.fields.address") }}</b-th>
                <b-th>{{ $t("dashboard.statuses.title") }}</b-th>
                <b-th>{{ $t("dashboard.fields.recommended") }}</b-th>
                <b-th>{{ $t("dashboard.fields.workingStatus") }}</b-th>
<!--                <b-th>{{ $t("dashboard.statuses.verified") }}</b-th>-->
<!--                <b-th>{{ $t("dashboard.fields.createdAt") }}</b-th>-->
                <b-th>{{ $t("dashboard.fields.feedbacks") }}</b-th>
                <b-th>{{ $t("dashboard.list.lockers") }}</b-th>
                <b-th class="p-1" colspan="2">{{ $t("dashboard.fields.actions") }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="branch in allBranches" :key="branch.id">
                <b-td>{{ branch.branch_number }}</b-td>
                <b-td>{{ branch.name | getTransValue($i18n.locale) }}</b-td>
                <b-td>{{ branch.phone }}</b-td>
                <b-td>{{ branch.business.name | getTransValue($i18n.locale) }}</b-td>
                <b-td>{{ branch.currency.name }}</b-td>
                <b-td>{{ branch.city.name }}</b-td>
                <b-td>{{ branch.address }}</b-td>
                <b-td class="status">
                  <span v-if="branch.status === 1">{{ $t("dashboard.statuses.active") }}</span>
                  <span v-else>{{ $t("dashboard.statuses.inActive") }}</span>
                </b-td>
                <b-td>
                  <label class="switch">
                    <input type="checkbox" @click="recommended(branch.id)" :checked="branch.recommended">
                    <span class="slider round"></span>
                  </label>
                </b-td>
                <b-td>
                  <label class="switch" v-if="branch.working_status === 2">
                    <button @click="workingStatus(branch.id, true)" class="status-order canceled">{{ $t("dashboard.statuses.verify") }}</button>
                  </label>
                  <label class="switch" v-else>
                    <input v-if="branch.working_status === 1" checked type="checkbox" @click="workingStatus(branch.id)">
                    <input v-else type="checkbox" @click="workingStatus(branch.id)">
                    <span class="slider round"></span>
                  </label>
                </b-td>
                <b-td>{{ branch.feedbacks_count }}</b-td>
                <b-td>{{ branch.lockers_count }}</b-td>
                <b-td class="d-flex">
                  <div class="view-cell">
                    <NuxtLink :to="prepareUrl(`/dashboard/branches/${branch.slug}`)">
                      <svg-icon
                          active-class="active"
                          exact
                          class="base-icon"
                          name="eye"
                      ></svg-icon>
                    </NuxtLink>
                  </div>
<!--                  <div class="cancel-cell">-->
<!--                    <a href="#" @click="deleteBranchModal(branch.id)">
                      <svg-icon class="sm-icon icon-cancel" name="cancel"></svg-icon>
                    </a>-->
<!--                    <a href="#">-->
<!--                      <svg-icon class="sm-icon icon-cancel" name="cancel"></svg-icon>-->
<!--                    </a>-->
<!--                  </div>-->
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <div class="p-2" v-if="total > perPage || currentPage !== 1">
            <b-pagination
                    v-model="currentPage"
                    :total-rows="total"
                    :per-page="perPage"
                    pills
                    size="md"
                    class="justify-content-center"
                    aria-controls="my-table"
                    @change="getBranches"
            ></b-pagination>
          </div>
        </section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PageTitle from "@/components/office/page-title.vue"
import SearchForm from "@/components/dashboard/search-form.vue"
import moment from "moment"
import global from "~/mixins/global.js"

export default {
  mixins: [global],
  components: {
    PageTitle,
    SearchForm,
  },

  data() {
    return {
      allBranches: [],
      businessList: {},
      title: this.$t("dashboard.list.branchs"),
      image: "business-branchs",
      selected: "0",
      // filteredBranches: {},
      currentPage: 1,
      perPage: 15,
      total: 0,
      searchText: null,
    }
  },
  methods: {
    getBranches(page = 1) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.$axios
          .get(`/branches?page=${page}`).then(({data}) => {
            this.currentPage = data.branches.current_page
            this.total = data.branches.total
            this.allBranches = data.branches.data
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
    },
    getBusiness() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.$axios
          .get("/business/list").then((res) => {
        this.businessList = res.data
      })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
    },
    searchBranch() {
      const data = {};
      if (this.searchText) {
        data['search'] = this.searchText
      }
      if (this.selected > 0) {
        data['business_id'] = this.selected
      }
      this.$axios.post('searchBranch', data).then(({data}) => {
        this.currentPage = data.branches.current_page
        this.total = data.branches.total
        this.allBranches = data.branches.data
      })
    },
    search(value) {
      this.searchText = value;
      this.searchBranch()
    },
    recommended(id) {
      this.$axios.post('admin/branches/recommended-status/' + id)
            .then((res) => {
              // this.getBranches();
      })
    },
    workingStatus(id, verify = false) {
      this.$axios.post('admin/branches/working-status/' + id)
            .then((res) => {
              if (verify){
                this.getBranches();
              }
      })
    },
  },
  mounted() {
    this.getBranches()
    this.getBusiness()
  },
  filters: {
    getTransValue(val, lang) {
      return val[lang]
    },
    changeDataFormat(val) {
      const date = moment(val).format("DD/MM/YYYY")
      return date.toString()
    },
  },
}
</script>
