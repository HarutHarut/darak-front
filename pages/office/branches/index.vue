<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
          <PageTitle :title="title" :image="image"/>
          <div class="d-flex flex-wrap align-items-center mb-3">
            <!--                                          <div class="mr-3 mb-2 mb-sm-0">
                                                         <b-form-select v-model="selected" :options="optionsBranchs"></b-form-select>
                                                      </div>-->
            <SearchForm @search="search"/>
          </div>
        </div>
        <IconBox :data="counts"/>
        <section class="static-section position-relative">
          <div class="title-box">
            <h4 class="title p-3">{{ $t('dashboard.list.branchs') }}</h4>
          </div>
          <NuxtLink :to="prepareUrl('/office/branches/add')" class="btn-add ml-auto">
            {{ $t('dashboard.add.branch') }}
          </NuxtLink>
          <b-table-simple responsive class="w-100 static-table">
            <b-thead>
              <b-tr>
                <b-th>{{ $t("dashboard.list.branchs") }}</b-th>
                <b-th>{{ $t("dashboard.fields.city") }}</b-th>
                <b-th>{{ $t("dashboard.fields.address") }}</b-th>
<!--                <b-th>{{ $t("dashboard.statuses.title") }}</b-th>-->
                <b-th>{{ $t("dashboard.fields.status") }}</b-th>
                <b-th class="p-1" colspan="2">{{ $t("dashboard.fields.actions") }}</b-th>
              </b-tr>
            </b-thead>

            <b-tbody>
              <b-tr v-for="branch in branches" v-bind:key="branch.id">
                <b-td>{{ branch.name | getTransValue($i18n.locale) }}</b-td>
                <b-td>
                    <p v-if="branch.city.name !== 'null'">
                        {{ branch.city.name }}
                    </p>
                </b-td>
                <b-td>{{ branch.address }}</b-td>
                <b-td v-if="branch.working_status === 0">{{ $t('dashboard.statuses.adminBlocked') }}</b-td>
                <b-td v-else-if="branch.working_status === 2">{{ $t('dashboard.statuses.adminNotVerified') }}</b-td>

                <b-td v-else>
                 <span
                         class="status-order processed"
                         v-if="branch.status === 0"
                 >
                    {{ $t("dashboard.statuses.inActive") }}
                 </span>
                  <span
                          class="status-order completed"
                          v-else-if="branch.status === 1"
                  >
                          {{ $t("dashboard.statuses.active") }}
                  </span>
                  <span class="status-order canceled" v-else>
                      {{ $t("dashboard.statuses.blocked") }}
                  </span>
                </b-td>

                <b-td>
                  <NuxtLink class="view-cell" :to="prepareUrl(`/office/branches/${branch.slug}`)">
                    <svg-icon
                        active-class="active"
                        exact
                        class="base-icon"
                        name="eye"
                    ></svg-icon>
                  </NuxtLink>
                  <span v-if="branch.working_status == 1">
                      <span v-if="branch.status == 0" class="view-cell">
                         <button @click="accept(branch.id, branch.status)">
                            <svg-icon class="base-icon" name="add-button" />
                         </button>
                      </span>
                      <span v-if="branch.status == 1" class="cancel-cell">
                         <button @click="accept(branch.id, branch.status)">
                            <svg-icon class="base-icon" name="close" />
                         </button>
                      </span>
                  </span>
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
            >

            </b-pagination>
          </div>
        </section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PageTitle from "@/components/office/page-title.vue"
import SearchForm from "@/components/office/search-form.vue"
import IconBox from "@/components/office/icon-box.vue"
import global from "~/mixins/global.js"

import moment from "moment"

export default {
  mixins: [global],
  components: {
    PageTitle,
    SearchForm,
    IconBox
  },

  data() {
    return {
      title: this.$t("dashboard.list.branchs"),
      image: "portfolio",
      verify_selected: '',
      branches: [],
      currentPage: 1,
      perPage: 15,
      total: 0,
      counts: null,
      searchText: null,
    }
  },
  async asyncData({ $axios }) {

    const { data } = await $axios.post(`/dashboard`)
    await $axios.post('/dashboard/orders', {count: 10}).then((res) => {
    })
    return {
      counts: data,
    }
  },
  methods: {
    getBranches(page = 1) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.$axios
          .get(`/branches?page=${page}&search=${this.searchText}`)
          .then(({data}) => {
              this.currentPage = data.branches.current_page
              this.total = data.branches.total
              this.branches = data.branches.data
              this.$router.replace({
                  query:
                      {
                          page: `${this.currentPage}`,
                          search: `${this.searchText}`,
                      }
              });
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
    },

    search(val) {
        this.searchText = val;
        this.getBranches();

      // const data = {
      //   'search': val
      // }
      // this.$axios.post('searchBranch', data).then(({data}) => {
      //   this.currentPage = data.branches.current_page
      //   this.total = data.branches.total
      //   this.branches = data.branches.data
      // })
    },
    accept(id, status){
      this.$axios
              .post("branches/change-status", {
                branch_id: id,
                status: status
              })
              .then((res) => {
                this.getBranches(this.currentPage);
              })
    }
  },
  mounted() {
      let page = this.$route.query.page || 1;
      this.searchText = this.$route.query.search || '';
      this.getBranches(page)
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
