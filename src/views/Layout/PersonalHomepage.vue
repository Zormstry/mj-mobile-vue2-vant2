<template>
  <div class="personal-homepage">
    <!-- 返回按钮 -->
    <div style="position: fixed; top: 10px; right: 10px; z-index: 1000">
      <button
        @click="$router.back()"
        style="
          padding: 8px 16px;
          color: black;
          border: none;
          border-radius: 4px;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        "
      >
        返回
      </button>
    </div>

    <!-- 第一个渐变区块：标题 -->
    <div class="header-block">
      <h1>{{ userName }}的个人主页</h1>
    </div>

    <!-- Radio按钮放在标题后面 -->
    <input type="radio" name="tabs" id="tab1" class="tab-input" checked />
    <input type="radio" name="tabs" id="tab2" class="tab-input" />
    <input type="radio" name="tabs" id="tab3" class="tab-input" />
    <input type="radio" name="tabs" id="tab4" class="tab-input" />

    <!-- 第二个白色区块：主要内容区 -->
    <div class="content-block">
      <!-- 导航在白色区块内，背景透明 -->
      <div class="navlist">
        <label for="tab1" class="tab-label">首页</label>
        <label for="tab2" class="tab-label">学校简介</label>
        <label for="tab3" class="tab-label">专业介绍</label>
        <label for="tab4" class="tab-label">兴趣爱好</label>
      </div>

      <div class="page-content">
        <!-- 首页 -->
        <div class="page" id="page1">
          <h2>欢迎来到我的个人主页</h2>
          <p>
            我是一名大二学生，目前在公司实习，正在学习 HTML
            和网页制作，对前端开发很感兴趣。
          </p>

          <h3>基本信息</h3>
          <p><strong>学校：</strong>{{ schoolName }}</p>
          <p><strong>专业：</strong>{{ major }}</p>

          <h3>正在学习的内容</h3>
          <ul>
            <li v-for="item in learningList" :key="item">{{ item }}</li>
          </ul>

          <!-- 动态表格 -->
          <table class="experience-table" id="experienceTable">
            <caption>
              个人经历
            </caption>
            <thead>
              <tr>
                <th>自何年何月</th>
                <th>至何年何月</th>
                <th>在何地、何单位、任何值</th>
                <th>证明人</th>
                <th class="action-cell">操作</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              <tr
                v-for="(row, index) in tableData"
                :key="row.id"
                :class="{ 'new-row': row.id > 3 }"
              >
                <td>
                  <input
                    type="text"
                    v-model="row.startDate"
                    placeholder="请输入.."
                    @keydown.enter="moveToNextInput($event, index, 'startDate')"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="row.endDate"
                    placeholder="请输入.."
                    @keydown.enter="moveToNextInput($event, index, 'endDate')"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="row.experience"
                    placeholder="请输入.."
                    @keydown.enter="
                      moveToNextInput($event, index, 'experience')
                    "
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="row.witness"
                    placeholder="请输入.."
                    @keydown.enter="moveToNextInput($event, index, 'witness')"
                  />
                </td>
                <td>
                  <button class="btn-delete" @click="deleteRow(index)">
                    删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 添加和保存按钮 -->
          <div class="btn-container">
            <button class="btn" @click="addTableRow">添加行</button>
            <button class="btn" @click="saveData">保存数据</button>
          </div>

          <!-- 保存提示 -->
          <div
            class="save-message"
            :class="{ show: showMessage }"
            :style="{ color: messageColor }"
          >
            {{ messageText }}
          </div>
        </div>

        <!-- 学校简介页面 -->
        <div class="page" id="page2">
          <h2>学校：{{ schoolName }}</h2>
          <p>{{ schoolInfo.description }}</p>

          <h3>校园特色</h3>
          <ul>
            <li v-for="feature in schoolInfo.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- 专业介绍页面 -->
        <div class="page" id="page3">
          <h2>专业: {{ major }}</h2>
          <p>{{ majorInfo.description }}</p>

          <h3>学习路径</h3>
          <ul>
            <li v-for="path in majorInfo.learningPaths" :key="path">
              <strong>{{ path.split('：')[0] }}：</strong
              >{{ path.split('：')[1] }}
            </li>
          </ul>
        </div>

        <!-- 兴趣爱好页面 -->
        <div class="page" id="page4">
          <h2>兴趣爱好</h2>
          <p>除了学习前端开发，我还有许多其他的兴趣爱好：</p>
          <ul>
            <li v-for="hobby in hobbies" :key="hobby">
              <strong>{{ hobby.split('：')[0] }}：</strong
              >{{ hobby.split('：')[1] }}
            </li>
          </ul>

          <hr />

          <h3>近期目标</h3>
          <p>在接下来的一年里，我希望能够：</p>
          <ul>
            <li v-for="goal in goals" :key="goal">{{ goal }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 页脚区块 -->
    <div class="footer-block">
      <h2>联系方式</h2>
      <p>
        邮箱: <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </p>
      <p>电话: {{ contact.phone }}</p>
      <p>地址: {{ contact.address }}</p>
      <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.8">
        © {{ currentYear }} {{ userName }}的个人主页 | 保留所有权利
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalHomepage',
  data () {
    return {
      userName: '张三',
      schoolName: 'XX大学',
      major: '非计算机专业',
      learningList: ['HTML基础', 'CSS基础', '网页布局'],

      // 表格数据
      tableData: [
        {
          id: 1,
          startDate: '2011年9月',
          endDate: '2017年8月',
          experience: 'xx省xx市xx小学,任班长',
          witness: '老杨'
        },
        {
          id: 2,
          startDate: '2017年9月',
          endDate: '2020年8月',
          experience: 'xx省xx市xx中学,任班长',
          witness: '老谢'
        },
        {
          id: 3,
          startDate: '2020年9月',
          endDate: '2023年8月',
          experience: 'xx省xx市xx高中,任班长',
          witness: '老贺'
        }
      ],

      // 学校信息
      schoolInfo: {
        description:
          'XX大学是一所综合性大学，位于美丽的城市中心。学校创建于1950年，拥有完善的教学设施和优秀的师资力量。校园环境优美，学习氛围浓厚，为学生提供了良好的学习和生活条件。',
        features: [
          '现代化的图书馆和实验室',
          '丰富的社团活动和体育设施',
          '国际化的交流合作项目',
          '优美的校园环境和绿色生态'
        ]
      },

      // 专业信息
      majorInfo: {
        description:
          '虽然我不是计算机专业的学生，但我对前端开发有着浓厚的兴趣。通过自学和在线课程，我正在系统学习网页开发技术。我相信兴趣是最好的老师，通过不断实践，我能够掌握前端开发技能。',
        learningPaths: [
          'HTML/CSS：网页结构和样式基础',
          'JavaScript：网页交互和动态效果',
          '响应式设计：适配不同设备',
          '前端框架：React/Vue等现代框架'
        ]
      },

      // 兴趣爱好
      hobbies: [
        '编程：喜欢用代码创造有趣的东西',
        '阅读：特别喜欢科技和设计类书籍',
        '运动：每周打篮球，保持健康体魄',
        '音乐：业余时间学习吉他',
        '摄影：记录生活中的美好瞬间',
        '旅行：探索不同的文化和风景'
      ],

      // 近期目标
      goals: [
        '完成一个完整的个人项目',
        '掌握React框架的基本使用',
        '参与开源项目的贡献',
        '找到一份前端开发相关的实习'
      ],

      // 联系信息
      contact: {
        email: 'test@example.com',
        phone: '138-8888-8888',
        address: 'XX省XX市XX区XX路XX号'
      },

      // 消息提示相关
      showMessage: false,
      messageText: '',
      messageColor: '#667eea'
    }
  },

  computed: {
    currentYear () {
      return new Date().getFullYear()
    }
  },

  mounted () {
    // 页面加载时从本地存储加载数据
    this.loadData()
  },

  methods: {
    // 添加新行
    addTableRow () {
      const newRow = {
        id: Date.now(),
        startDate: '',
        endDate: '',
        experience: '',
        witness: ''
      }
      this.tableData.push(newRow)
      this.showMessageFunc('新行已添加，请填写数据', '#667eea')
    },

    // 删除行
    deleteRow (index) {
      this.tableData.splice(index, 1)
      this.showMessageFunc('行已删除', '#ff5252')
    },

    // 保存数据到本地存储
    saveData () {
      localStorage.setItem(
        'experienceTableData',
        JSON.stringify(this.tableData)
      )
      this.showMessageFunc(
        '数据已保存！刷新页面可以看到保存的数据。',
        '#2ecc71'
      )
    },

    // 从本地存储加载数据
    loadData () {
      const savedData = localStorage.getItem('experienceTableData')
      if (savedData) {
        this.tableData = JSON.parse(savedData)
        this.showMessageFunc('已加载保存的数据', '#667eea')

        // 3秒后隐藏提示
        setTimeout(() => {
          this.showMessage = false
        }, 3000)
      }
    },

    // 显示消息
    showMessageFunc (text, color) {
      this.messageText = text
      this.messageColor = color
      this.showMessage = true

      // 3秒后隐藏提示
      setTimeout(() => {
        this.showMessage = false
      }, 3000)
    },

    // 处理输入框跳转
    moveToNextInput (event, rowIndex, field) {
      event.preventDefault()

      // 获取当前行的所有输入框
      const inputs = document.querySelectorAll(
        `#tableBody tr:nth-child(${rowIndex + 1}) input`
      )

      // 根据字段确定当前索引
      const fieldIndex = [
        'startDate',
        'endDate',
        'experience',
        'witness'
      ].indexOf(field)

      // 如果是最后一个输入框，添加新行
      if (fieldIndex === 3) {
        this.addTableRow()
        // 让新行的第一个输入框获得焦点
        setTimeout(() => {
          const newInputs = document.querySelectorAll(
            '#tableBody tr:last-child input'
          )
          if (newInputs[0]) newInputs[0].focus()
        }, 100)
      } else {
        // 跳转到下一个输入框
        const nextInput = inputs[fieldIndex + 1]
        if (nextInput) {
          nextInput.focus()
          nextInput.select()
        }
      }
    }
  }
}
</script>

<style scoped>
/* 这里复制原HTML中的全部CSS样式，只需修改选择器名称为 .personal-homepage */
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

/* 隐藏radio按钮 */
.tab-input {
  display: none;
}

.personal-homepage .navlist {
  text-align: center;
  padding: 20px 0;
  margin: 0;
  background-color: transparent;
}

.personal-homepage .tab-label {
  display: inline-block;
  height: 40px;
  width: 120px;
  line-height: 40px;
  text-align: center;
  margin: 0 8px;
  cursor: pointer;
  color: rgb(54, 54, 55);
  background: linear-gradient(to bottom, #f9f9f9, #e8e8e8);
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.personal-homepage .tab-label:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 当对应的radio被选中时，改变标签样式 */
#tab1:checked ~ .content-block .navlist label[for='tab1'],
#tab2:checked ~ .content-block .navlist label[for='tab2'],
#tab3:checked ~ .content-block .navlist label[for='tab3'],
#tab4:checked ~ .content-block .navlist label[for='tab4'] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  border-color: #667eea;
}

/* 整个页面的背景渐变 */
.personal-homepage {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* 三区块布局样式 */
.personal-homepage .header-block {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 40px 0;
  color: white;
  margin-bottom: 20px;
}

/* 白色区块添加轻微阴影和圆角 */
.personal-homepage .content-block {
  background-color: rgba(255, 255, 255, 0.95);
  min-height: 400px;
  margin: 20px auto;
  max-width: 1000px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* 页脚区块样式更新 */
.personal-homepage .footer-block {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  text-align: center;
  padding: 40px 0;
  margin-top: 30px;
  color: white;
}

.personal-homepage .footer-block a {
  color: #ecf0f1;
}

.personal-homepage .footer-block a:hover {
  color: #fff;
  text-decoration: underline;
}

.personal-homepage .page-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
  line-height: 1.7;
}

/* 页面样式 */
.personal-homepage .page {
  display: none; /* 默认隐藏 */
  padding: 20px 0;
}

/* 当对应的radio被选中时，显示对应的页面 */
#tab1:checked ~ .content-block #page1,
#tab2:checked ~ .content-block #page2,
#tab3:checked ~ .content-block #page3,
#tab4:checked ~ .content-block #page4 {
  display: block;
}

/* 表格样式 */
.personal-homepage .experience-table {
  width: 500px;
  margin: 30px auto;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.personal-homepage .experience-table caption {
  font-size: 1.3em;
  font-weight: bold;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.personal-homepage .experience-table th,
.personal-homepage .experience-table td {
  border: 1px solid #e0e0e0;
  padding: 12px;
  text-align: center;
}

.personal-homepage .experience-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #444;
}

.personal-homepage .experience-table tr:hover {
  background-color: #f5f7ff;
}

/* 新添加行的样式 */
.personal-homepage .new-row {
  background-color: #f0f7ff;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0.5;
    background-color: #e3f2fd;
  }
  to {
    opacity: 1;
  }
}

/* 输入框样式 */
.personal-homepage .experience-table input {
  width: 90%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  transition: all 0.3s;
}

.personal-homepage .experience-table input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

/* 操作单元格样式 */
.personal-homepage .action-cell {
  width: 80px;
}

/* 按钮容器 */
.personal-homepage .btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  gap: 15px;
}

/* 按钮样式 - 渐变效果 */
.personal-homepage .btn {
  border: none;
  outline: none;
  width: 100px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  background: linear-gradient(to bottom, #f9f9f9, #e8e8e8);
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  font-size: 14px;
}

.personal-homepage .btn:hover {
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
}

.personal-homepage .btn-delete {
  background: linear-gradient(to bottom, #ffebee, #ffcdd2);
  color: #c62828;
  border-color: #ffcdd2;
  font-size: 12px;
  width: 60px;
  height: 30px;
  padding: 0;
}

.personal-homepage .btn-delete:hover {
  background: linear-gradient(to bottom, #ff5252, #c62828);
  color: white;
  border-color: #c62828;
}

/* 保存提示 */
.personal-homepage .save-message {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
  height: 20px;
}

.personal-homepage .save-message.show {
  opacity: 1;
}

/* 添加一些间距 */
.personal-homepage h2 {
  margin-top: 20px;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
}

.personal-homepage h3 {
  margin-top: 15px;
  margin-bottom: 10px;
  color: #444;
  font-weight: 500;
}

.personal-homepage p {
  margin-bottom: 10px;
  color: #666;
  line-height: 1.6;
}

.personal-homepage ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.personal-homepage li {
  margin-bottom: 8px;
  color: #666;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .personal-homepage .content-block {
    margin: 10px;
    border-radius: 8px;
  }

  .personal-homepage .experience-table {
    width: 95%;
    font-size: 14px;
  }

  .personal-homepage .tab-label {
    width: 100px;
    margin: 5px;
    font-size: 14px;
  }

  .personal-homepage .page-content {
    padding: 0 10px;
  }

  .personal-homepage .btn-container {
    flex-direction: column;
    gap: 10px;
  }

  .personal-homepage .btn {
    width: 90%;
    max-width: 200px;
  }
}

/* 页面标题动画 */
.personal-homepage .header-block h1 {
  font-size: 2.5em;
  margin: 0;
  animation: fadeInDown 1s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 页面切换动画 */
.personal-homepage .page {
  animation: fadeIn 0.5s ease;
}

/* 链接样式 */
.personal-homepage a {
  color: #667eea;
  transition: color 0.3s;
}

.personal-homepage a:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* 分隔线 */
.personal-homepage hr {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, #ddd, transparent);
  margin: 25px 0;
}

/* 强调文本 */
.personal-homepage strong {
  color: #333;
  font-weight: 600;
}

/* 代码样式 */
.personal-homepage code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
  color: #d63384;
}
</style>
