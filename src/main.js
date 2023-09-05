import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//三级联动---全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
    //轮播图Swiper全局组件
    // import Carousel from '@/components/Carousel'
    // Vue.component(Carousel.name, Carousel)
    // 分页器全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
    // 引入mockServe.js---mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//不用仓库，直接使用api请求
import * as API from '@/api'

// 按需引入element-ui
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import girl from '@/assets/images/beautifulGirl.jpg'
Vue.use(VueLazyload, {
    loading: girl,
})

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins)

// 引入表单验证插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),

    beforeCreate() {
        // 全局事件总线
        Vue.prototype.$bus = this
            //API
        Vue.prototype.$API = API
    },


    router, //注册路由
    store //注册仓库
}).$mount('#app')