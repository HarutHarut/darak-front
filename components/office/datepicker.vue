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
                        :date-range="{ start: null, end: null }"
                >
                    <template v-slot:input="picker" style="max-width: 500px;">

                        <span class="picker-box d-flex align-items-center h-100">
                            <span class="rangepicker-icon">
                                <svg-icon class="base-icon" name="calendar" />
                            </span>
                            <span class="rangepicker-text d-flex justify-content-between">
                                <span v-if="picker.start">{{ picker.start | date }}</span>
                                <span v-else>{{dateRange.startOf | date}}</span>
                                <span v-if="picker.end">{{ picker.end | date }}</span>
                                <span v-else>{{dateRange.endOf | date}}</span>
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
                    startOf: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    endOf: this.roundMinutes(new Date(Date.now())),
                },
                today: new Date(),
            }
        },
        methods: {
            roundMinutes(date) {
                date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
                date.setMinutes(0, 0, 0);
                return date;
            },
            changeDatePicker() {
                this.$emit('setDate', this.dateRange)
            }
        }
    }
</script>