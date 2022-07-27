<template>
    <div class="search-form-book d-flex mb-sm-0 mb-3">
        <form action="#" class="search-form form-select-box w-100">
            <div class="datepicker-box d-flex flex-wrap flex-md-nowrap w-100">
                <date-range-picker
                        @update="changeDatePicker"
                        v-model="dateRange"
                        ref="picker"
                        :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm' }"
                        :timePicker="true"
                        :timePicker24Hour="true"
                        :timePickerIncrement="60"
                        :date-range="{ start: null, end: null }"
                >
                    <template v-slot:input="picker" style="max-width: 500px;">

                        <span class="picker-box d-flex align-items-center h-100">
                            <span class="rangepicker-icon">
                                <svg-icon class="base-icon" name="calendar" />
                            </span>
                            <span class="rangepicker-text d-flex justify-content-between">
                                <span v-if="picker.startDate">{{ picker.startDate | date }}</span>
                                <span v-else>{{dateRange.startDate | date}}</span>
                                <span v-if="picker.endDate">{{ picker.endDate | date }}</span>
                                <span v-else>{{dateRange.endDate | date}}</span>
                            </span>
                        </span>
                    </template>
                </date-range-picker>
            </div>
        </form>
    </div>
</template>

<script>

    import DateRangePicker from 'vue2-daterange-picker'
    import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
    import moment from 'moment'

    export default {
        components: { DateRangePicker},
        filters: {
            date(val) {
                const date = moment(val).format("DD.MM.YYYY HH:mm");
                return date.toString();
            },
        },
        data() {
            return {
                dateRange: {
                    startDate: this.roundMinutes(new Date(Date.now())),
                    endDate: this.roundMinutes(new Date(Date.now()  + 24 * 60 * 60 * 1000)),
                },
                today: new Date(),
            }
        },
        methods: {
            roundMinutes(date) {
                date.setHours(0,0,0);
                date.setMinutes(0, 0, 0);
                return date;
            },
            changeDatePicker() {
                this.dateRange.startDate =  moment(this.dateRange.startDate).format('LLL');
                this.dateRange.endDate =  moment(this.dateRange.endDate).format('LLL');
                this.$emit('setDate', this.dateRange)
            }
        }
    }
</script>