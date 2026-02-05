<template>
  <div class="login-page">
    <van-nav-bar title="面经注册" />
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
        <van-button block color="orange" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <router-link to="/login" class="link">已有帐号，去登录</router-link>
  </div>
</template>

<script>
import { registerUserAPI } from '../api/user'

export default {
  name: 'register-page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      console.log('submit', values)
      try {
        const { data: res } = await registerUserAPI(values)
        console.log(res)
        this.$toast('注册用户成功')
        this.username = ''
        this.password = ''
        this.$router.push('/login')
      } catch (err) {
        if (err.response) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('注册失败')
        }
      }
    }
  },
  mounted () {}
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
