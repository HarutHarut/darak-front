<template>
    <div class="mb-sm-0 mb-2">
        <form action="#" method="get" class="office-search-form">
            <div class="form-book d-flex align-items-center">
                <div class="form-group mb-0">
                    <input type="text" class="form-input w-100" v-model="search_text" @input="search" :placeholder="$t('dashboard.input.search')">
                </div>
                <button class="btn-search"><svg-icon class="base-icon" name="search"></svg-icon></button>
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