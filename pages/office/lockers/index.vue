<template>
  <b-container fluid class="lockers-page">
    <b-row>
      <b-col>
        <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
          <PageTitle :title="title" :image="image"/>
          <div class="d-flex flex-wrap align-items-center mb-3">
            <div class="mr-3">
              <DatePicker @setDate="setDate"/>
            </div>
            <div class="mb-2 mb-sm-0">
              <b-form-select v-model="selectedBranch" @change="changeBranch">
                <b-form-select-option
                    :value="branches.id"
                    v-for="(branches) in optionsBranches"
                    :key="branches.id">
                  {{ branches.name | getTransValue($i18n.locale) }}
                </b-form-select-option>
              </b-form-select>
            </div>

          </div>
        </div>
        <b-row>
          <b-col>
            <section class="static-section">
              <div class="title-box d-flex justify-content-between align-items-center">
                <div class="title p-3 d-flex">
                  <h5 v-if="branch">{{ branch.address }}</h5>
<!--                  <span>&ndash;Large</span>-->
<!--                  <span>(5)</span>-->
                </div>
                <div class="d-flex align-items-center">
                  <svg-icon v-if="show" @click="prevDay" class="base-icon date-button"
                            name="previous"></svg-icon>
                  <svg-icon v-if="show" @click="nextDay" class="base-icon  date-button"
                            name="next"></svg-icon>
                  <svg-icon v-if="hoursArray !== null" @click="showModal" class="base-icon accept-btn"
                            name="settings"></svg-icon>
                  <svg-icon v-if="selected.length" @click="submit" class="base-icon accept-btn"
                            name="accept"></svg-icon>
                </div>
              </div>
              <b-table-simple responsive class="w-100 lockers-table pb-0">
                <b-thead>
                  <b-tr v-if="index == 0" v-for="(hours,index) in hoursArray"
                        :key="hours.index">
                    <b-th>{{ $t('title.lockerName') }}</b-th>
                    <b-th class="text-center" v-for="(hour,index) in hours"
                          v-if="index != 'locker_info' " :key="index"><span style="font-size: 10px">
                      {{
                        index.slice(0, 10)
                      }}
                    </span>
                      {{ index.slice(11, 16) }}
                    </b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(hours,lockerIndex) in hoursArray" :key="lockerIndex">
                    <b-td>{{ hours.locker_info.name | getTransValue($i18n.locale) }}</b-td>
                    <b-td v-for="(hour,index) in hours" :key="index" class="p-0"
                          v-if="typeof hour == 'number'"
                          @click="changeType(hour, index, hours.locker_info.id)"
                          :class="getCubeColor(hour)"/>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </section>
          </b-col>
        </b-row>
      </b-col>
      <b-modal id="size-delete" hide-footer hide-header>
        <div class="col-12 pl-4 d-flex">
          <div class="form-check-input custom-control custom-checkbox w-100" v-for="(hours, lockerIndex) in hoursArray">
            <input type="checkbox"
                   checked
                   @change="chooseLocker(hours.locker_info.id)"
                   class="custom-control-input"
                   :value="hours.locker_info.id"
                   :id="'locker_' + hours.locker_info.id">
            <label class="custom-control-label" :for="'locker_' + hours.locker_info.id">
              {{ hours.locker_info.name | getTransValue($i18n.locale) }}
            </label>
          </div>
        </div>
        <div class="py-4">
          <h5 class="font-weight-bold">{{ $t('modals.sections.titles.action') }}</h5>
          <div class="d-flex p-1 pl-4">
            <div class="form-check-input custom-control custom-checkbox w-100">
              <input class="custom-control-input"
                     @change="chooseAction"
                     type="radio"
                     name="exampleRadios"
                     id="exampleRadios1"
                     value="open"
                     checked>
              <label class="custom-control-label" for="exampleRadios1">
                {{$t('modals.sections.openChosenDays')}}
              </label>
            </div>
            <div class="form-check-input custom-control custom-checkbox w-100">
              <input class="custom-control-input"
                     @change="chooseAction"
                     type="radio"
                     name="exampleRadios"
                     id="exampleRadios2"
                     value="close">
              <label class="custom-control-label" for="exampleRadios2">
                {{$t('modals.sections.closeChosenDays')}}
              </label>
            </div>
          </div>
        </div>
        <div>
          <b-button class="mt-3 btn-blue" @click="submitSetting">
            {{ $t('form.btn.submit') }}
          </b-button>
          <b-button class="mt-3 btn-color" @click="$bvModal.hide('size-delete')">
            {{ $t('form.btn.cancel') }}
          </b-button>
        </div>
      </b-modal>
    </b-row>
  </b-container>
</template>

<script>
import DatePicker from "@/components/office/datepicker-day.vue"
import PageTitle from '@/components/office/page-title.vue'
import SearchForm from '@/components/office/search-form.vue'
import moment from 'moment'

export default {
  components: {
    DatePicker,
    PageTitle,
    SearchForm,
  },

  data() {
    return {
      title: this.$t('dashboard.list.lockers'),
      image: 'luggage',
      branch: {},
      selected: [],
      selectedLocker: [],
      hoursArray: null,
      optionsBranches: null,
      date: new Date(Date.now()),
      selectedBranch: null,
      show: true,
      dateRange: {
        startDate: moment(this.roundMinutes(new Date(Date.now()))).format("LL"),
        endDate: moment(this.roundMinutes(new Date(Date.now() + 24 * 60 * 60 * 1000))).format('LL')
      },
      selectedDateRange: {
        startDate: null,
        endDate: null,
      },
      chosenAction: 'open'
    }
  },

  mounted() {
    let data = {
      dateRange: this.dateRange,
    }
    this.$axios.post('/branchesByBusinessId', data).then((res) => {
      this.hoursArray = res.data.lockers
    })
    this.$axios.get('branches/list').then((res) => {
      this.optionsBranches = res.data.branches
      this.selectedBranch = this.optionsBranches[0].id
    })
  },
  filters: {
    getTransValue(val, lang) {
      return val[lang];
    }
  },
  methods: {
    changeDate() {
      console.log(1)
      let data = {
        dateRange: this.dateRange,
      }
      if (this.selected) {
        data['branch_id'] = this.selected
      }
      this.$axios.post('/branchesByBusinessId', data).then((res) => {
        this.hoursArray = res.data
      })
    },
    getCubeColor(hour) {
      if (hour == 0) {
        return "disable-cell"
      } else if (hour == 2) {
        return 'ordered-cell'
      } else {
        return 'freeCell'
      }
    },
    changeBranch() {
      // console.log(2)
      const data = {
        branch_id: this.selectedBranch,
        dateRange: this.dateRange,
      }
      let selected = document.querySelectorAll('.selected')
      selected.forEach((item) => {
        item.classList.remove('freeCell')
        item.classList.toggle("selected")
      })
      this.$axios.post('/branchesByBusinessId', data).then((res) => {
        this.hoursArray = res.data.lockers
        this.branch = res.data.branch
      })
    },
    changeType(hour, value, lockerId) {
      if (hour == 1 || hour == 2) {
        event.target.classList.remove('freeCell')
        event.target.classList.toggle("selected")
        let cube = {
          lockerId,
          value
        }
        if (event.target.classList.contains('selected')) {
          if (hour == 2) {
            cube['type'] = 'delete'
          }
          let selected = this.selected
          selected.push(cube)
          this.selected = selected;
        } else {
          this.selected = this.selected.filter((item) => {
            return item.value !== value
          })
        }
      }
    },
    submit() {
      const data = {
        selected: this.selected,
        dateRange: this.dateRange
      }
      if (this.selectedBranch) {
        data['branch_id'] = this.selectedBranch;
      }
      this.$axios.post('/lockers/updateGraph', data).then((res) => {
        this.hoursArray = res.data.lockers;
        this.selected = [];
      })
    },
    setDate(val) {
      this.dateRange = val
      this.getBranches()
      this.show = false
    },
    roundMinutes(date) {
      date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
      date.setMinutes(0, 0, 0);
      return date;
    },
    nextDay() {
      this.addOrSubtract('add');
      this.getBranches();
    },
    prevDay() {
      this.addOrSubtract();
      this.getBranches()
    },
    addOrSubtract(type) {
      if (type == 'add') {
        this.dateRange.startDate = moment(this.dateRange.startDate).add(1, 'days').format("LL");
        this.dateRange.endDate = moment(this.dateRange.endDate).add(1, 'days').format("LL");
      } else {
        this.dateRange.startDate = moment(this.dateRange.startDate).subtract(1, 'days').format("LL");
        this.dateRange.endDate = moment(this.dateRange.endDate).subtract(1, 'days').format("LL");
      }
    },
    getBranches() {
      console.log(4)
      let data = {
        branch_id: this.selectedBranch,
        dateRange: this.dateRange,
      }
      this.$axios.post('/branchesByBusinessId', data).then((res) => {
        this.hoursArray = res.data.lockers
      })
    },
    showModal() {
      this.hoursArray.forEach((item) => {
        this.selectedLocker.push(item.locker_info.id)
      })
      this.$bvModal.show('size-delete')
    },
    chooseLocker(id) {
      if (!this.selectedLocker.includes(id)) {
        this.selectedLocker.push(id)
      } else {
        this.selectedLocker = this.selectedLocker.filter((item) => item != id)
      }
    },
    chooseAction() {
      this.chosenAction = event.target.value;
    },
    submitSetting() {
      const data = {
        dateRange: this.dateRange,
        chosenAction: this.chosenAction,
        selectedLocker: this.selectedLocker,
        branch_id: this.selectedBranch,
      }
      this.$axios.post('/lockers/close-with-date-range', data).then((res) => {
        this.hoursArray = res.data.lockers
      })
    }
  },
}

</script>