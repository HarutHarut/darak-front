<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
                    <PageTitle :title="title" :image="image"/>
                </div>
                <section class="static-section position-relative">
                    <div class="title-box">
                        <h4 class="title p-3">{{ $t('dashboard.list.blogs') }}</h4>
                    </div>
                    <NuxtLink :to="prepareUrl('/dashboard/blogs/add')" class="btn-add ml-auto">
                        <svg-icon class="base-icon" name="add-button"></svg-icon>
                    </NuxtLink>
                    <b-table-simple responsive class="w-100 static-table">
                        <b-thead>
                            <b-tr>
                                <b-th>{{ $t("dashboard.fields.title") }}</b-th>
                                <b-th>{{ $t("dashboard.fields.desc") }}</b-th>
                                <b-th class="p-1" colspan="2">{{ $t("dashboard.fields.actions") }}</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-for="blog in allBlogs" :key="blog.id">
                                <b-td>{{ blog.title | getTransValue($i18n.locale) }}</b-td>
                                <b-td v-html="getTransValue(blog.desc, $i18n.locale)"/>
                                <b-td class="d-flex">
                                    <div class="view-cell">
                                        <NuxtLink :to="prepareUrl(`/dashboard/blogs/edit/${blog.slug}`)">
                                            <svg-icon
                                                    active-class="active"
                                                    exact
                                                    class="base-icon"
                                                    name="edit"
                                            ></svg-icon>
                                        </NuxtLink>
                                    </div>
                                    <div class="cancel-cell">
                                        <a href="#" @click="deleteBranchModal(blog.id)">
                                            <svg-icon class="sm-icon icon-cancel" name="cancel"></svg-icon>
                                        </a>
                                    </div>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                    <div class="p-2"  v-if="total > perPage || currentPage !== 1">
                        <b-pagination pills size="md"></b-pagination>
                    </div>
                </section>
            </b-col>

            <div>
                <b-modal id="bv-modal-example" hide-footer hide-header>
                    <p class="text-center">
                        {{ $t("dashboard.list.deleteThisItem") }}?
                    </p>
                    <div class="text-center">
                        <b-button class="mt-3 btn-success" @click="deleteBranch()"
                        >{{ $t("dashboard.list.Yes") }}
                        </b-button
                        >
                        <b-button
                                class="mt-3 btn-danger"
                                @click="$bvModal.hide('bv-modal-example')"
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
                allBlogs: {},
                blogList: {},
                title: this.$t("dashboard.list.blogs"),
                image: "pages",
                filteredBlogs: [],
                currentPage: 1,
                perPage: 15,
                total: 0,
                searchText: null,
                deleteId: null,
            }
        },
        methods: {
            getBlogs() {
                this.$nextTick(() => {
                    this.$nuxt.$loading.start()
                })
                this.$axios
                    .get("/blogs")
                    .then(({data}) => {
                        this.currentPage = data.blogs.current_page
                        this.allBlogs = data.blogs.data
                        this.filteredBlogs = this.allBlogs
                    })
                    .finally(() => {
                        this.$nuxt.$loading.finish()
                    })
            },
            deleteBranchModal(id) {
                this.deleteId = id
                this.$bvModal.show("bv-modal-example")
            },
            deleteBranch() {
                this.$axios
                    .delete(`/admin/blogs/${this.deleteId}`)
                    .then(() => {
                        this.$bvModal.hide("bv-modal-example")
                        this.getBlogs()
                    })
                    .catch(e => {
                        console.log(e.response.data)
                    })
            },
            getTransValue(val, lang) {
                return val[lang]
            },


        },
        mounted() {
            this.getBlogs()
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
