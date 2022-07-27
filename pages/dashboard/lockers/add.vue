<template>
  <b-container fluid>
    <no-ssr>
      <b-row>
        <b-col lg="6">
          <div class="base-card card mb-3">
            <section class="card-body">
              <h2 class="title-secondary text-center">
                {{ $t("dashboard.add.lockers") }}
              </h2>
            </section>

            <LockerForm
                :branchData="$route.params"
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
        <b-col lg="6">
          <section class="static-section">
            <div
                class="title-box d-flex align-items-center justify-content-between"
                v-b-toggle.collapse-calculate
            >
              <h4 class="title p-3">
                {{ $t("dashboard.title.calculatePrice") }}
              </h4>
              <span class="when-opened">
                        <svg-icon
                            class="base-icon"
                            name="up-chevron"
                        ></svg-icon>
                     </span>
            </div>
            <b-collapse visible id="collapse-calculate">
              <b-container>
                <div class="form-box py-5">
                  <b-form action="#" method="post">
                    <b-row>
                      <b-col sm="3">
                        <div class="mb-3">
                          <p class="mb-2">
                            {{ $t("dashboard.fields.size") }}
                          </p>
                          <b-form-select

                          ></b-form-select>
                        </div>
                      </b-col>
                      <b-col sm="3">
                        <b-form-group
                            :label="$t('dashboard.fields.totalTime')"
                            label-for="input-7"
                            description=""
                        >
                          <b-form-input
                              id="input-7"
                              type="number"
                              placeholder=""
                              required
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col class="align-self-center" sm="3">
                        <button type="submit" class="btn-calculate">
                                       <span class="mb-sm-0 mb-2">{{
                                           $t("dashboard.title.calculate")
                                         }}</span
                                       ><span class="icon-box"
                        ><svg-icon
                            class="sm-icon"
                            name="next"
                        ></svg-icon
                        ></span>
                        </button>
                      </b-col>
                      <b-col sm="3">
                        <p class="mb-2">
                          {{ $t("dashboard.fields.totalPrice") }}
                        </p>
                        <div class="input-box total-price">
                          <span class="input-text">{{ currency }}</span>
                        </div>
                      </b-col>
                    </b-row>
                  </b-form>
                </div>
              </b-container>
            </b-collapse>
          </section>
        </b-col>
      </b-row>
    </no-ssr>
  </b-container>
</template>

<script>
import LockerForm from "../../../components/buisness/lockers/locker-form"

export default {
  components: {
    LockerForm
  },
  props: ['branch'],
  data() {
    return {
      currency: '€',
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
        name: {
          ru: null,
          de: null,
          sp: null,
          am: null,
          ch: null,
          fr: null,
          en: null
        }
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

      this.$axios
          .post("/lockers/create", form)
          .then(({data}) => {
            console.log(data);

          })
          .catch(error => {
            switch (error.response.status) {
              case 422:
                const {errors} = error.response.data
                this.errors = errors

                for (const prop in errors) {
                  if (prop.search("name") > -1) {
                    this.transError = true
                  }

                  if (prop.search("price") > -1) {
                    this.priceError = true
                  }
                }
                break
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
  // computed: {
  //   branch: function () {
  //     return this.branch;
  //   },
  // },
  mounted() {
    this.lockerBranch = this.$route.params;
    console.log(this.lockerBranch)
    this.currency = this.$route.params.currency;
  }
}
</script>
