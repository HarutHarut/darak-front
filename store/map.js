export const state = () => ({
    branches: [],
    city: {},
})

export const mutations = {

    setBranches(state, branches) {
        state.branches = branches;
    },
    setCity(state, city) {
        state.city = city;
    }
}

export const actions = {

    async getBranches(context, params) {
        const {data} = await this.$axios.get('/branches/map', {params}).catch(error => {
            console.log(error.response.data)
        });
        context.commit('setBranches', data.branches);
    },
    async getCity(context, id) {
        const {data} = await this.$axios.get(`cities/${id}`);
        context.commit('setCity', data.city);
    },
}

export const getters = {
    branches: state => {
        return state.branches;
    },
    city: state => {
        return state.city;
    }
}
