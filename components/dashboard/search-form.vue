<template>
    <div class="mb-sm-0 mb-2">
        <form method="get" autocomplete="on" class="dashboard-search-form">
            <div class="form-book d-flex align-items-center">
                <div class="form-group mb-0 position-relative search-form">
                    <input type="text" class="form-input w-100" :placeholder="$t('dashboard.input.search')" v-model="inputText">
                    <svg-icon class="base-icon" name="search" @click="search" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                inputText: this.$route.query.search || '',
            }
        },
        methods: {
            search(event) {
               // const value = this.inputText
               // this.inputText = value;
              this.$emit('searchEmit',this.inputText)
            }
        },
    }

</script>