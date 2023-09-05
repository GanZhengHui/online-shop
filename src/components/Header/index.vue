<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- 声明式导航 -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{ userName }}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopCart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
                    <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        goSearch() {
            // 路由传递参数
            // 字符串写法
            // this.$router.push("/search/"+this.keyword+'?k='+this.keyword)
            // 模板字符串写法
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword}`)
            // 对象写法
            let location = { name: 'search', params: { keyword: this.keyword || undefined } }
            if (this.$route.query) {
                location.query = this.$route.query
            }
            this.$router.push(location)


            // path不能和params结合使用
            // this.$router.push({path:'/search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})

            //可指定params传参或者不传，在占位符后加?，不加又不传参会影响路径显示

            //params传递的是空字符串怎么解决？加个undefined
            // this.$router.push({name:'search',params:{keyword:'' || undefined},query:{k:this.keyword}})

            // 通过props传递参数，三种写法：布尔值、对象、函数

        },
        // 退出登录
        async logout(){
            try {
               await this.$store.dispatch('user/userLogout')
               this.$router.push('/home')
            } catch (error) {
                
            }
        }
    },
    mounted() {
        this.$bus.$on('clear', () => {
            this.keyword = ''
        })
    },
    computed: {
        ...mapState('user', ['userInfo']),
        userName() {
            return this.userInfo.name
        }
    }
}
</script>

<style scoped lang="less">
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>