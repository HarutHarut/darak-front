<template>
    <b-container fluid>
        <no-ssr>
            <b-row class="justify-content-center">
                <b-col lg="8">
                    <div class="base-card card mb-3">
                        <section class="card-body">
                            <h2 class="title-secondary text-center">
                                {{ $t("dashboard.add.lockers") }}
                            </h2>
                        </section>

                        <LockerForm
                                :form="form"
                                :prices="prices"
                                :sizes="this.sizes"
                                :transError="transError"
                                :priceError="priceError"
                                :errors="errors"
                                :currency="currency"
                                :allSizes="false"
                                :branch="lockerBranch"
                                v-on:submit="submit"
                        ></LockerForm>
                    </div>
                </b-col>
            </b-row>
        </no-ssr>
    </b-container>
</template>

<script>
    import LockerForm from "../../../components/buisness/lockers/locker-form"
    import global from "~/mixins/global.js"

    export default {
        components: {
            LockerForm
        },
        props: ['branch'],
        mixins: [global],

        data() {
            return {
                currency: 'EUR',
                lockerBranch: null,
                transError: false,
                priceError: false,
                errors: [],
                sizes: [],
                form: {
                    count: null,
                    price_per_day: null,
                    price_per_hour: null,
                    size_id: null,
                    branch_id: null,
                },
                prices: [
                    {
                        range_start: null,
                        range_end: null,
                        price: null
                    }
                ]
            }
        },
        methods: {
            submit(form) {
                this.priceError = false
                this.transError = false
                this.errors = []

                this.$axios
                    .post("/lockers/create", form)
                    .then(({data}) => {
                        this.$bvToast.toast(`Locker created successfully.`, {
                            title: 'Locker created successfully',
                            variant: "success",
                            solid: true
                        })
                        let id = data.locker.id;

                        if (form.type == 1)
                            {
                                let path = this.prepareUrl(`/office/branches/` + this.lockerBranch.slug);
                                this.$router.push({
                                    path: path,
                                })
                            }
                        else
                            {
                                this.form = {
                                    count: null,
                                    price_per_day: null,
                                    price_per_hour: null,
                                    size_id: null,
                                    branch_id: this.form.branch_id,
                                },
                                this.prices = [
                                    {
                                        range_start: null,
                                        range_end: null,
                                        price: null
                                    }
                                ],
                                this.transError = false,
                                this.priceError = false,
                                this.errors = []
                            }
                    })
                    .catch(error => {
                        if (error.response.status == 400){
                            this.$bvToast.toast(error.response.data.message, {
                                variant: 'danger',
                                solid: true
                            });
                        }else{
                            const {errors} = error.response.data;
                            this.errors = errors
                        }

                    })
                    .finally(() => {
                    });
            },
            getSizesList() {
                let url = "/sizes/list";
                if(this.business_id) {
                    url += "?business_id=" + this.business_id + "&branch_id" + this.form.branch_id;
                }else{
                    url += "?branch_id=" + this.form.branch_id;
                }
                this.$axios
                    .get(url)
                    .then(({ data }) => {
                        this.sizes = data.sizes;
                    })
                    .finally(() => {
                    });
            },
        },
        mounted() {
            if (this.$route.params.id) {
                this.lockerBranch = this.$route.params;

                if(this.lockerBranch.business.currency){
                    this.currency = this.lockerBranch.business.currency;
                }
                // this.currency = this.lockerBranch.business.currency;
                this.form.branch_id = this.$route.params.id
            } else {
                this.$router.back();
            }
        },
        filters: {
            getTransValue(val, lang) {
                return val[lang];
            }
        }
    }
</script>
