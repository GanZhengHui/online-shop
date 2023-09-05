<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 判断是否需要显示脚本 -->
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index'
import Footer from './components/Footer/index'
  export default {
    name: 'App',
    components:{
      Header,
      Footer
    },
    mounted(){
      this.$store.dispatch('home/categoryList')
    }
  }
</script>

<style>

</style>
