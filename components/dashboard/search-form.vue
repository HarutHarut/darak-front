<template>
    <div class="mb-sm-0 mb-2">
        <form method="get" autocomplete="on" class="dashboard-search-form">
            <div class="form-book d-flex align-items-center">
                <div class="form-group mb-0">
                    <input type="text" class="form-input w-100" :placeholder="$t('dashboard.input.search')" v-model="inputText" @keyup="search">
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                inputText: '',
            }
        },
        methods: {
            search(event) {
               const value = event.target.value
               this.inputText = value;
              this.$emit('searchEmit',this.inputText)
            }
        },
    }

</script>