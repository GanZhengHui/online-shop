<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派/委托 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 动画 -->
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList.slice(0, 16)" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <!-- 原生js跳转 -->
                                    <!-- <a href="">{{ c1.categoryName }}</a> -->
                                    <!-- 声明式导航，鼠标经过时会注册多个组件，存在性能问题 -->
                                    <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                                    <!-- 编程式导航，通过点击事件跳转，但每个导航都有一个回调函数，存在性能问题，最好是事件委托 -->
                                    <!-- <a @click="goSearch">{{ c1.categoryName }}</a> -->
                                    <!-- 事件委托+编程式导航 -->
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <!-- 二三级分类 -->
                                <!-- 动态显示、隐藏二三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <!-- <a href="">{{ c2.categoryName }}</a> -->
                                                <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                                                <!-- <a @click="goSearch">{{ c2.categoryName }}</a> -->
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>

                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <!-- <a href="">{{ c3.categoryName }}</a> -->
                                                    <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                                                    <!-- <a @click="goSearch">{{ c3.categoryName }}</a> -->
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>

                                                </em>

                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
//三级导航防抖，引入lodash中的节流函数，按需引入，throttle是默认暴露
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            isShow: true
        }
    },
    computed: {
        //获取三级导航的数据
        ...mapState('home', { categoryList: 'categoryList' })
    },
    mounted() {
        //该组件一加载，则立即向actions获取服务器数据
        //存在性能问题，每次切换组件都会向服务器请求一次，现在数据是不变的，请求一次即可
        // 而App根组件只执行一次，可以转移到App组件中挂载，只请求一次即可
        // this.$store.dispatch('home/categoryList')
        if (this.$route.path !== '/home') {
            this.isShow = false
        }
    },
    methods: {
        //鼠标经过一级导航，获取鼠标经过的导航的id
        changeIndex(index) {
            this.currentIndex = index
        },
        // 三级导航防抖，es5语法
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),

        // 三级路由跳转，编程时导航+事件委托，解决性能问题
        goSearch(event) {
            let element = event.target //获取鼠标点击的节点
            //获取自定义属性,判断是否为a标签，后三个区分一二三级分类
            let { categoryname, category1id, category2id, category3id } = element.dataset
            //区分是不是a标签
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                //一级分类、二级分类、三级分类
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else if (category3id) {
                    query.category3Id = category3id
                }
                // 合并搜索框的params参数
                if(this.$route.params){
                    location.params = this.$route.params  
                }
                location.query = query
                this.$router.push(location)
            }
        },
        enterShow() {
            this.isShow = true
        },
        leaveShow() {
            //鼠标离开一级导航的时候，移除样式
            this.currentIndex = -1
            if (this.$route.path != '/home') {
                this.isShow = false
            }

        }
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }

        // 定义动画
        // 动画开始
        .sort-enter {
            height: 0;
        }
        // 动画结束
        .sort-to{
            height: 461px;
        }
        // 定义动画时间、速率
        .sort-enter-active{
            transition: all .5s linear;
        }
    }
}</style>