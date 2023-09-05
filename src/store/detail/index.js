import { reqGetGoodsInfo, reqGetAddOrUpdateShopCar } from '@/api'
// 生成Id模块，用uuid库随机生成一个字符串
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
}

const actions = {
    // 获取产品信息
    async getGoodInfo({ commit }, skuId) {
        const result = await reqGetGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCar({ commit }, { skuId, skuNum }) {
        // 加入购物车,发情请求,前台把参数带给服务器
        // 服务器写入数据,返回成功状态,并没有返回其他数据,所以不需要三连环
        const result = await reqGetAddOrUpdateShopCar(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

const getters = {
    // 路径导航简化
    categoryView() {
        // 刚开始goodInfo是个空对象，空对象.categoryView会返回undefinded，组件中undefinded.category1Name会报错，所以至少要返回个空对象
        return state.goodInfo.categoryView || {}
    },
    // 产品信息简化
    skuInfo() {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}