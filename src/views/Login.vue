<template>
  <div class="login-page">
    <van-nav-bar title="面经登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="账号"
        :rules="[
          { required: true, message: '请填写账号' },
          { pattern: /^[a-zA-Z0-9]{2,10}$/, message: '请输入2-10位的账号' }
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\S{6,20}$/, message: '请输入6-20位的密码' }
        ]"
      />
      <div style="margin: 16px">
        <van-button block color="orange" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link to="/register" class="link">还没有帐号，去注册</router-link>
  </div>
</template>

<script>
import { loginUserAPI } from '../api/user'
export default {
  name: 'login-page',
  mounted () {
    // this.$toast.success('登录成功')
    // this.$toast.fail('登陆失败')
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      console.log('submit', values)
      // const { data: res } = await loginUserAPI(values)
      // console.log(res)
      try {
        const { data: res } = await loginUserAPI(values)
        console.log('登录组件', res)
        localStorage.setItem('mobile-token', res.data.token)
        this.$toast('登录成功')
        this.username = this.password = ''
        this.$router.push('/article')
      } catch (err) {
        // console.log(err.response.data.message)
        if (err.response) {
          this.$toast(err.response.data.message)
        } else {
          // console.log('登录失败')
          this.$toast('登录失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.link {
  float: right;
  margin-right: 20px;
  font-size: 12px;
  color: red;
}
</style>
