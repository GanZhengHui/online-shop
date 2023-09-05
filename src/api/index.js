//全部api进行统一管理
import requests from './request'
import mockRequest from './mockAjax'


// 三级联动接口：/api/product/getBaseCategoryList

export const reqCategoryList = () => { //没有返回值默认为undefinded
    //发请求，requests返回promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取banner数据,mock数据
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据
export const reqGetFloorList = () => mockRequest.get('/floor')

// 获取搜索模块的参数
// params至少是个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'POST', data: params })

// 获取产品详情信息的接口，/api/item/{ skuId }
export const reqGetGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品加入购物车或更新某一产品的数量 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqGetAddOrUpdateShopCar = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表 /api/cart/cartList
export const reqGetCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改购物车中商品的勾选状态 api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册 /api/user/passport/register  phone code password
export const reqUserRegiset = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

//登录 /api/user/passport/login method:post  phone password
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

//获取用户信息  /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录 api/user/passport/logout get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取商品清单  /api/order/auth/trade  get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取支付订单信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取个人中心的数据 /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })