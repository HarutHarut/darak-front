export const state = () => ({
    blogs: [],
    cities: [],
    branches: [],
    currency: 'EUR'
})

export const mutations = {
    setBlogs(state, blogs) {
        state.blogs = blogs
    },
    setCities(state, cities) {
        state.cities = cities
    },
    setBranches(state, branches) {
        state.branches = branches
    },
    setCurrency(state, currency) {
        state.currency = currency
    }
}

export const actions = {
    async getBlogs(context) {
        await this.$axios.get('/blogs/top').then(({data}) => {
            context.commit('setBlogs', data.blogs)
        }).catch((e) => {
            console.log(e)
        });
    },
    async getCities(context) {
        await this.$axios.get('/cities/top').then(({data}) => {
            context.commit('setCities', data.cities)
        }).catch((e) => {
            console.log(e)
        });
    },
    async getBranches(context) {
        await this.$axios.get('/branches/recommended').then(({data}) => {
            context.commit('setBranches', data.branches)
        }).catch((e) => {
            console.log(e)
        });
    },
    getCurrency(context, currency) {
        context.commit('setCurrency', currency)
    },
}

export const getters = {
    blogs: state => {
        return state.blogs;
    },
    cities: state => {
        return state.cities;
    },
    branches: state => {
        return state.branches;
    },
    currency: state => {
        return state.currency;
    }
}