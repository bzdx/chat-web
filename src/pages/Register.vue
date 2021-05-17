<template>
    <div id="register">
        <div class="register-title">注册</div>
        <div class="register-body">
            <van-form @submit="onSubmit">
                <van-notice-bar left-icon="volume-o" scrollable text="请妥善保管好密码，出于安全考虑，丢失将不可找回！" />
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
                <van-field
                        v-model="re_password"
                        type="password"
                        name="确认密码"
                        label="确认密码"
                        placeholder="确认密码"
                        :rules="[{ required: true, validator: passwordIsSync, message: '两次输入密码不一致' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">提交</van-button>
                </div>
                <div class="register-body-tips">已有账号？去<a href="#/login">登录</a></div>
            </van-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                username: '',
                password: '',
                re_password: ''
            }
        },
        methods: {
            onSubmit() {
                if (this.username && this.password) {
                    let url = '/register'
                    let _this = this
                    this.request.post(url, {
                        username: _this.username,
                        password: _this.password,
                    }).then(res => {
                        this.$notify({
                            type: 'success',
                            message: res.data.msg
                        })
                        setTimeout(()=>{
                            location.href = '#/login'
                        }, 2000)
                    }).catch(e => {
                        this.$notify({
                            type: 'danger',
                            message: e.response.data.msg
                        })
                    })
                } else {
                    this.$notify({
                        type: 'warning',
                        message: '缺少必填项目！'
                    })
                }
            },
            passwordIsSync() {
                return this.password === this.re_password
            }
        }
    }
</script>

<style lang="stylus" scoped>
$theme-color = #07c160
#register
    margin 22px auto 0
    padding 8px
    overflow hidden
    width 96%
    border-radius 12px
    box-shadow 0 0 12px 12px rgba(245, 245, 245, .4)
    .register
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