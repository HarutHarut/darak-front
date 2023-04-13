<template>
    <div class="mb-sm-0 mb-2">
        <form action="#" method="get" class="office-search-form dashboard-search-form">
            <div class="form-book d-flex align-items-center">
                <div class="form-group mb-0 position-relative search-form">
                    <input type="text" class="form-input w-100" :placeholder="$t('dashboard.input.search')" v-model="search_text">
                    <svg-icon class="base-icon" name="search" @click="search" />
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
          return  {
              search_text: null
          }
        },
        methods: {
            search() {
                this.$emit('search', this.search_text)
            }
        }
    }
</script>