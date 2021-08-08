const state = {
    page: 1,
    limit: 5
}

const getters = {
    page: state => state.page,
    limit: state => state.limit
}

const actions = {
   changePage(context, page){
       context.commit('CHANGE_PAGE', page)
   }
}

const mutations = {
    CHANGE_PAGE(state, page){
        state.page = page;
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}