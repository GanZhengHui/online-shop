// search小仓库
import { reqGetSearchInfo } from "@/api"
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({ commit }, params = {}) {
        const result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    // 商品列表
    goodsList(state) {
        // 有网的情况正常，没网的情况放回空数组
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    // 品牌列表
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}