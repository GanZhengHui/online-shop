/*
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/
// 路由懒加载
// const foo = () => {
//     return import ('@/pages/Home')
// }

export default [{
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        meta: { isShow: true }
    },
    {
        name: 'center',
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        meta: { isShow: true },
        // 二级路由
        children: [{
            path: 'myOrder',
            component: () =>
                import ('@/pages/Center/myOrder')
        }, {
            path: 'groupOrder',
            component: () =>
                import ('@/pages/Center/groupOrder')
        }]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { isShow: true }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { isShow: true },
        // 独享路由
        beforeEnter: (to, from, next) => {
            // 想要去支付页面，必须从交易页面来
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { isShow: true },
        // 独享路由
        beforeEnter: (to, from, next) => {
            // 想要去交易页面，必须是从购物车来
            if (from.path == '/shopCart') {
                next()
            } else {
                // 否则，不跳，回到当前路由
                next(false)
            }
        }
    },
    {
        name: 'shopCart',
        path: '/shopCart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { isShow: true }
    },
    {
        name: 'addCartSuccess',
        path: '/AddCartSuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { isShow: true }
    },
    {
        path: '/detail/:skuid?',
        component: () =>
            import ('@/pages/Detail'),
        meta: { isShow: true }
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: { isShow: false }
    },
    {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: { isShow: false }
    },
    {
        path: '/search/:keyword?', //params占位并指定可传可不传
        component: () =>
            import ('@/pages/Search'),
        meta: { isShow: true },
        name: 'search',
        //1.布尔值---props只能用于params传参
        // props: true
        // 2.对象
        // props: { a: 10, b: 20 }
        // 3.函数
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    //重定向，主页默认为home
    {
        path: '/',
        redirect: '/home'
    }
]