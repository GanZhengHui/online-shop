// 对axios进行二次封装
import axios from "axios"
//引进nprogress，用于请求时进度条显示
import nprogress from 'nprogress'
//引进进度条样式
import "nprogress/nprogress.css"
// 引入仓库
import detail from '@/store/detail'
import user from '@/store/user'

// 利用axios对象中的create方法创建一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL: '/api',
    // 代表请求超时的实践5s
    timeout: 5000
})

// 请求拦截器，在发出请求前，请求拦截器可以检测到，可以在请求发出前做一些事情
requests.interceptors.request.use((config) => {
    // 在请求头添加一个字段userTempId，和后端商量好(临时id)
    if (detail.state.uuid_token) {
        config.headers.userTempId = detail.state.uuid_token
    }
    // 需要携带token给服务器
    if (user.state.token) {
        config.headers.token = user.state.token
    }
    // 进度条开始
    nprogress.start()
        // config：配置对象
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done()
        // 成功的回调函数
    return res.data
}, (error) => {
    // 失败的回调函数
    return Promise.reject(new Error('faile'))
})
export default requests