<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
          <PageTitle :title="title" :image="image"/>
          <SearchForm @searchEmit="search"/>
        </div>

        <section class="static-section position-relative mb-3">
          <div class="title-box">
            <h4 class="title p-3">{{ $t("dashboard.list.users") }}</h4>
          </div>
<!--          <button v-b-modal.modal-users type="button" class="btn-add ml-auto">-->
<!--            <p class="text-white">{{ $t('dashboard.add.user') }}</p>-->
<!--          </button>-->
          <b-table-simple responsive class="static-table">
            <b-thead>
              <b-tr>
                <b-th>{{ $t("dashboard.fields.name") }}</b-th>
                <b-th>{{ $t("dashboard.fields.email") }}</b-th>
                <b-th>{{ $t("dashboard.fields.orderCount") }}</b-th>
                <b-th>{{ $t("dashboard.statuses.verified") }}</b-th>
                <b-th>{{ $t("dashboard.fields.isBusiness") }}</b-th>
                <b-th class="p-1">{{ $t("dashboard.fields.actions") }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr :key="user.id" v-for="user in users">
                <b-td>
                  <NuxtLink :to="prepareUrl(`/dashboard/users/${user.id}`)" class="user-link">
                    <p>
                      {{ user.name }}
                    </p>
                    <p v-if="user.last_name && user.last_name !== null">
                      {{ user.last_name }}
                    </p>
                  </NuxtLink>
                </b-td>
                <b-td>{{ user.email }}</b-td>
                <b-td>{{ user.bookings_count }}</b-td>
                <b-td class="status">
                  <button @click="changeStatus(user.status, user.id)" class="status-order completed" v-if="user.status === 1">{{ $t("dashboard.statuses.active") }}</button>
                  <button @click="changeStatus(user.status, user.id)" class="status-order canceled" v-else>{{ $t("dashboard.statuses.inActive") }}</button>
                </b-td>
                <b-td>
                  <button type="button">
                    <span v-if="user.role.name === 'business_owner' && user.business">
                      <NuxtLink :to="prepareUrl(`/dashboard/business/${user.business.id}`)" class="user-link">{{ user.name }}
                          {{ user.business.name | getTransValue($i18n.locale) }}
                      </NuxtLink>
                    </span>
                    <span v-else>{{ $t("dashboard.fields.No") }}</span>
                  </button>
                </b-td>
                <b-td class="cancel-cell">
<!--                  <button type="button">-->
<!--                    <a href="#" @click="destroy(user.id)">-->
<!--                      <svg-icon-->
<!--                          class="sm-icon icon-cancel"-->
<!--                          name="cancel">-->
<!--                      </svg-icon>-->
<!--                    </a>-->
<!--                  </button>-->
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <div class="p-2" v-if="total > perPage || currentPage !== 1">
            <b-pagination
                v-model="currentPage"
                :total-rows="total"
                :per-page="perPage"
                @input="getUsers"
                pills
                size="md"
            ></b-pagination>
          </div>
        </section>
<!--        <AddUser v-on:submit="add"></AddUser>-->
      </b-col>
      <div>
        <b-modal id="bv-modal-user-delete" hide-footer hide-header>
          <p class="text-center">
            {{ $t("dashboard.list.deleteThisItem") }}?
          </p>
          <div class="text-center">
            <b-button class="mt-3 btn-success" @click="deleteUser"
            >{{ $t("dashboard.list.Yes") }}
            </b-button
            >
            <b-button
                    class="mt-3 btn-danger"
                    @click="$bvModal.hide('bv-modal-user-delete')"
            >{{ $t("dashboard.list.No") }}
            </b-button
            >
          </div>
        </b-modal>
      </div>
    </b-row>
  </b-container>
</template>

<script>

import PageTitle from "@/components/dashboard/page-title.vue";
import DatePicker from "@/components/dashboard/datepicker.vue";
import AddUser from "../../../components/dashboard/user/add-user"
import SearchForm from "@/components/dashboard/search-form.vue"
import moment from "moment";
import global from "~/mixins/global.js"

export default {
  mixins: [global],
  components: {
    PageTitle,
    DatePicker,
    AddUser,
    SearchForm
  },

  data() {
    return {
      title: this.$t("dashboard.list.users"),
      image: "users",
      perPage: 15,
      deleteId: null,

    };
  },

  async asyncData({$axios}) {

    const {data: {users}} = await $axios.get(`/admin/users?perPage=15`)

    return {
      currentPage: users.current_page,
      total: users.total,
      users: users.data
    }
  },

  methods: {
    destroy(id) {

      this.deleteId = id
      this.$bvModal.show("bv-modal-user-delete")


    },
    deleteUser(){
      let id = this.deleteId;
      this.$axios
          .delete(`admin/users/${id}`)
          .then(({ data: { users } }) => {
             window.location.reload();
             this.users = users.data
          })
          .catch(e => {})
    },
    search(val) {
      this.$axios.post('/user/search', {'search': val}).then(({data: {users}}) => {
        this.currentPage = users.current_page
        this.total = users.total
        this.users = users.data
      })
    },
    getUsers(page = 1) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.$axios
          .get(`/admin/users?page=${page}&perPage=15`)
          .then(({data: {users}}) => {
            console.log(users)
            this.currentPage = users.current_page
            this.total = users.total
            this.users = users.data
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
    },

    changeStatus(status, id){
      this.$axios
              .post("user/change-status", {
                user_id: id,
                status: status
              })
              .then((res) => {
                this.getUsers();
              })
    },

    add(data) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.$axios
          .post(`/admin/users`, data)
          .then((res) => {
            this.$bvToast.toast(res.data.message, {
              title: `Success Registered`,
              variant: 'success',
              autoHideDelay: 5000,
              solid: true
            });
            window.location.reload()
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
    }

  },
  mounted() {
    this.getUsers()
  },
  filters: {
    getTransValue(val, lang) {
      return val[lang]
    }
  },
};

</script>
