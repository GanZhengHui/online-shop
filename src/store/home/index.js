import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'

// home小仓库
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }

}
const actions = {
    //通过api里的函数接口调用，向服务器发请求，获取服务器数据
    async categoryList(content) {
        const result = await reqCategoryList()
        if (result.code == 200) {
            content.commit('CATEGORYLIST', result.data)
        }
    },
    // 获取轮播图的数据
    async getBannerList(content) {
        const result = await reqGetBannerList()

        if (result.code == 200) {
            content.commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList(content) {
        const result = await reqGetFloorList()
        if (result.code == 200) {
            content.commit('GETFLOORLIST', result.data)
        }
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}