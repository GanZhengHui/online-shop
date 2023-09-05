import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api/index'

const state = {
    cartList: []
}

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        const result = await reqGetCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车商品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改商品的选择状态
    async reqUpdateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // 获取勾选的商品
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
                // 将每一次返回的promise添加到数组中
            promiseAll.push(promise)
        });
        // 返回成功或失败的结果(如果都成功，则返回成功，如果有,则返回失败)
        return Promise.all(promiseAll)
    },
    //修改全部商品的选中状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('reqUpdateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    // cartInfoList(state) {
    //     return state.cartList[0].cartInfoList || []
    // }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}