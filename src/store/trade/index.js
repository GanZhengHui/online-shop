import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
    userAddressInfo: [],
    orderInfo: {}
}

const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        const result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取商品清单
    async getOrderInfo({ commit }) {
        const result = await reqOrderInfo()
        console.log(result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETUSERADDRESS(state, userAddressInfo) {
        state.userAddressInfo = userAddressInfo
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}