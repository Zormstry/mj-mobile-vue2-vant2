<template>
  <div class="layout-page">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home/personal" icon="user-o"
        >个人主页</van-tabbar-item
      >
      <van-tabbar-item to="/home/projects" icon="star-o"
        >练习项目</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page'
}
</script>

<style lang="less" scoped>
.layout-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}
</style>
