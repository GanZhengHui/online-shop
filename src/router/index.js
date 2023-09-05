import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
    // 引入仓库
import store from '@/store'

import routes from './routes'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace
    // 解决多次点击搜索按钮报错的问题，因为底层是promise对象，需要在成功或失败的时候回调函数
    // 重写push||replace
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

const router = new VueRouter({
    //指定路由模式为history模式，默认为hash模式
    // mode: 'history',
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局守卫： 前置守卫（在路由跳转之前判断）
router.beforeEach(async(to, from, next) => {
    //to:可以获取到你跳转到那个路由的信息
    //from:可以获取你从那个路由来的信息
    // next:放行函数,写法有三种，1.next()--无条件放行；2.next(path)--跳转到指定路由；3.next(false)--中断当前路由
    // 用户登陆了一定有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
        // 用户已登录
    if (token) {
        // 用户登录了，还向想跳转到登录页面（不允许）
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录   【 home, search, detail,shopCart】
            // 如果已有用户名
            if (name) {
                next()
            } else {
                // 没有用户信息，派发actions获取用户信息
                try {
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // token失效
                    // 清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path
            // 未登录,不能去交易、支付、个人中心
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router