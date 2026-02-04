<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        href="javascript:;"
        v-bind:class="{ active: sorter == 'weight_desc' }"
        @click="changeSorter('weight_desc')"
        >推荐</a
      >
      <a
        href="javascript:;"
        v-bind:class="{ active: sorter == null }"
        @click="changeSorter(null)"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></article-item>
    </van-list>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api/article'

// import { getArticleAPI } from '../../api/article'
export default {
  name: 'article-page',
  data () {
    return {
      current: 1,
      sorter: null,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      const { data: res } = await getArticleAPI({
        current: this.current,
        sorter: this.sorter
      })
      console.log('首页中的', res)
      // this.list = res.data.rows
      this.list.push(...res.data.rows)
      this.loading = false
      this.current++
      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    },
    changeSorter (info) {
      console.log('用户点击了超链接')
      this.sorter = info
      this.current = 1
      this.list = []
      this.loading = true
      this.onLoad()
    }
  },
  created () {
    // this.getInfo()
    // console.log(666)
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
