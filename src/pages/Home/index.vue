<template>
  <div>
    <!-- 三级全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor  v-for="floor in floorList" :key="floor.id " :list="floor"></Floor>
    <Brand></Brand>

  </div>
</template>

<script>
// 引入其他组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex'
export default {
  name: '',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    //派发获取楼层的数据
    this.$store.dispatch('home/getFloorList')

  },
  computed: {
    ...mapState('home', ['floorList']),
  }
}
</script>

<style></style>