<template>
   <b-container fluid>
      <b-row>
         <b-col>
            <div
               class="page-content-top d-flex flex-wrap align-items-center justify-content-between"
            >
               <PageTitle :title="title" :image="image" />
               <SearchForm v-on:searchEmit="getBusiness" />

               <div class="mb-3">
                  <IconBox :data="this.counts"/>
               </div>
            </div>
            <section class="static-section position-relative">
               <div class="title-box">
                  <h4 class="title p-3">{{ $t("dashboard.list.business") }}</h4>
               </div>
<!--               <NuxtLink :to="prepareUrl('/dashboard/add-business')" class="btn-add ml-auto">-->
<!--                  <svg-icon class="base-icon" name="add-button"></svg-icon>-->
<!--               </NuxtLink>-->

               <b-table-simple responsive class="w-100 static-table">
                  <b-thead>
                     <b-tr>
                        <b-th>{{ $t("list.Logo") }}</b-th>
                        <b-th>{{ $t("list.Name") }}</b-th>
                        <b-th>{{ $t("dashboard.fields.user") }}</b-th>
                        <b-th>{{ $t("account.email") }}</b-th>
                        <b-th>{{ $t("list.BranchesCount") }}</b-th>
                        <b-th>{{ $t("list.AvailableSizes") }}</b-th>
                        <b-th>{{ $t("list.Status") }}</b-th>
                        <b-th>{{ $t("list.Actions") }}</b-th>
                     </b-tr>
                  </b-thead>
                  <b-tbody>
                     <b-tr :key="business.id" v-for="business in businesses">
                        <b-td style="width: 150px">
                           <img class="logoTh" v-if="business.logo" :src="business.logo" alt="" />
                           <img class="logoTh" v-else :src="require('@/assets/img/no-photo.jpg')" alt="" />
                        </b-td>

                        <b-td>
                           <p v-if="business.name[$i18n.locale]">{{ business.name | getTransValue($i18n.locale) }}</p>
                           <p v-else>{{ business.name.en }}</p>
                        </b-td>
                        <b-td>
                           <p>{{ business.user.name }}</p>
                        </b-td>
                        <b-td>{{ business.email }}</b-td>
                        <b-td>{{ business.branches_count }}</b-td>
                        <b-td>{{ business.sizes_count }}</b-td>
                        <b-td>
                           <span
                              class="status-order completed"
                              v-if="business.status === 0"
                           >
                              {{ $t("dashboard.statuses.not_verified") }}
                           </span>
                           <span
                              class="status-order processed"
                              v-else-if="business.status === 1"
                           >
                              {{ $t("dashboard.statuses.verified") }}
                           </span>
                           <span class="status-order canceled" v-else>
                              {{ $t("dashboard.statuses.blocked") }}
                           </span>
                        </b-td>
                        <b-td>
                           <div class="d-flex justify-content-center align-items-center">
                              <div>
                                 <span class="view-cell">
                                    <NuxtLink :to="prepareUrl(`/dashboard/business/${business.id}`)" class="menu-link">
                                       <svg-icon class="base-icon " name="edit" />
                                    </NuxtLink>

                                 </span>
                                 <span>
                                    <span v-if="business.status == 2 || business.status == 0" class="view-cell">
                                       <button @click="accept(business.id, 1)">
                                          <svg-icon class="base-icon" name="add-button" />
                                       </button>
                                    </span>
                                    <span v-if="business.status == 1 || business.status == 0" class="cancel-cell">
                                       <button @click="accept(business.id, 2)">
                                          <svg-icon class="base-icon" name="close" />
                                       </button>
                                    </span>
                                 </span>
                              </div>
                           </div>
                        </b-td>
                     </b-tr>
                  </b-tbody>
               </b-table-simple>
<!--               {{ total per_page current_page }}-->
               <div class="p-2" v-if="total > per_page || currentPage !== 1">
                  <b-pagination
                     v-model="current_page"
                     :total-rows="total"
                     :per-page="per_page"
                     @change="getData"
                     pills
                     size="md"
                  ></b-pagination>
               </div>
            </section>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import PageTitle from "@/components/dashboard/page-title.vue"
import SearchForm from "@/components/dashboard/search-form.vue"
import IconBox from '@/components/dashboard/icon-box.vue'
import moment from "moment"
import global from "~/mixins/global.js"

export default {
   mixins: [global],
   components: {
      PageTitle,
      SearchForm,
      IconBox
   },
   data() {
      return {
         title: this.$t("dashboard.list.business"),
         image: "portfolio",
         selected: null,
         businessFilter: [],
         businesses: [],
         // pagination: {},
         currentPage: 1,
         per_page: 15,
         total: 0,
         business_status: {},
         business_publish: {},
         counts: {},
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
         const date = moment(val).format("D MMMM YYYY, h:mm:ss ")
         return date.toString()
      }
   },
   methods: {
      getBusiness(search) {
         this.searchText = search;
         this.getData();
      },
      async getData(page = 1) {
         const {
            data: { businesses }
         } = await this.$axios.get(`/admin/businesses?page=${page}&search=${this.searchText}`, {
            params: {
               currentPage: this.currentPage,
               per_page: this.per_page,
               filter: {
                  status: 1
               }
            }
         })
          this.total = businesses.total
          this.per_page = businesses.per_page
          this.currentPage = businesses.current_page
          this.businesses = businesses.data
          await this.$router.replace({
             query:
                  {
                     page: `${this.currentPage}`,
                     search: `${this.searchText}`,
                  }
          });

         // this.$nuxt.$loading.finish()
      },
      accept(id, status) {
         this.$nextTick(() => {
            this.$nuxt.$loading.start()
         })
         this.$axios
            .post(`/admin/businesses/change_status/${id}`, { status })
            .then(({ data: { business } }) => {
               // window.location.reload()
               this.getData(this.current_page)
            })
            .finally(() => {
               this.$nuxt.$loading.finish()
            })
      }
   },
   mounted() {
      this.$axios.post('/dashboard').then((res) => {
         this.counts = res.data
      })
      let page = this.$route.query.page || 1;
      this.searchText = this.$route.query.search || '';
      this.getData(page)
   }
}
</script>
