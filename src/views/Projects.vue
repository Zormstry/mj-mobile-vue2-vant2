<template>
  <div class="projects-page">
    <van-nav-bar title="练习项目集" fixed />

    <div style="padding: 46px 16px 16px">
      <van-cell-group>
        <van-cell
          v-for="item in projectList"
          :key="item.id"
          :title="`${item.id} ${item.name}`"
          :label="item.description"
          is-link
          :url="getProjectUrl(item.id)"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data () {
    return {
      projectList: [
        {
          id: '01',
          name: '卡片展开/收缩效果'
        },
        {
          id: '02',
          name: '进度步骤指示器'
        },
        {
          id: '03',
          name: '隐藏式侧边导航栏'
        },
        {
          id: '04',
          name: '隐藏式搜索框动画'
        },
        {
          id: '05',
          name: '分屏式登录页'
        },
        {
          id: '06',
          name: '登录面板设计'
        },
        {
          id: '07',
          name: '异步函数演示'
        },
        {
          id: '08',
          name: '折叠卡片效果'
        },
        {
          id: '09',
          name: '2.5D立体按钮'
        },
        {
          id: '10',
          name: '数字增长动画'
        },
        {
          id: '11',
          name: '电影应用界面'
        },
        {
          id: '12',
          name: '时钟应用'
        }
      ]
    }
  },
  methods: {
    getProjectUrl (id) {
      // 判断是否在 GitHub Pages 环境
      const isGitHubPages = window.location.hostname.includes('github.io')
      const basePath = isGitHubPages ? '/mj-mobile-vue2-vant2' : ''

      return `${basePath}/projects/${id}.html`
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding-bottom: 50px;
}
</style>
