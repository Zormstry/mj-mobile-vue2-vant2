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
          :url="item.url"
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
          name: 'Expanding Cards',
          description: '卡片展开/收缩效果',
          url: '/projects/01.html'
        },
        {
          id: '02',
          name: 'Progress Steps',
          description: '进度步骤指示器',
          url: '/projects/02.html'
        },
        {
          id: '03',
          name: 'Hide Side Navigation',
          description: '隐藏式侧边导航栏',
          url: '/projects/03.html'
        },
        {
          id: '04',
          name: 'Hidden Search',
          description: '隐藏式搜索框动画',
          url: '/projects/04.html'
        },
        {
          id: '05',
          name: 'Curriculum Vitae',
          description: '张三简历',
          url: '/projects/05.html'
        },
        {
          id: '06',
          name: 'Split Landing Page',
          description: '分屏式登录页',
          url: '/projects/06.html'
        },
        {
          id: '07',
          name: 'Login Panel',
          description: '登录面板设计',
          url: '/projects/07.html'
        },
        {
          id: '08',
          name: 'Asynchronous Function',
          description: '异步函数演示',
          url: '/projects/08.html'
        },
        {
          id: '09',
          name: 'Collapsed Card',
          description: '折叠卡片效果',
          url: '/projects/09.html'
        },
        {
          id: '10',
          name: '2.5D Button',
          description: '2.5D立体按钮',
          url: '/projects/10.html'
        },
        {
          id: '11',
          name: 'Increasing Number',
          description: '数字增长动画',
          url: '/projects/11.html'
        },
        {
          id: '12',
          name: 'Movie App',
          description: '电影应用界面',
          url: '/projects/12.html'
        },
        {
          id: '13',
          name: 'Clock',
          description: '时钟应用',
          url: '/projects/13.html'
        }
      ]
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding-bottom: 50px;
}
</style>
