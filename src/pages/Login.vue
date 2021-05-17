<template>
    <div id="login">
        <div class="login-title">登录</div>
        <div class="login-body">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="username"
                        name="用户名"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
                <div class="login-body-tips">还没有账号？去<a href="#/register">注册</a></div>
            </van-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            onSubmit() {
                let url = '/login'
                this.request.post(url, {
                    username: this.username,
                    password: this.password,
                }).then(res => {
                    this.$notify({
                        type: 'success',
                        message: res.data.msg
                    })
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    localStorage.setItem('token', res.data.token)
                    setTimeout(()=>{
                        location.href = '#/message'
                    }, 2000)
                }).catch(e => {
                    this.$notify({
                        type: 'danger',
                        message: e.response.data.msg
                    })
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
$theme-color = #1989fa
#login
    margin 22px auto 0
    padding 8px
    overflow hidden
    width 96%
    border-radius 12px
    box-shadow 0 0 12px 12px rgba(245, 245, 245, .4)
    .login
        &-title
            color $theme-color
            text-align center
            padding 12px 0
            font-size 24px
            font-weight bold
        &-body
            margin-top 16px
            &-tips
                text-align center
                font-size 12px
                color #999
</style>