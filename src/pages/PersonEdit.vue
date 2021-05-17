<template>
<div id="edit">
    <div class="edit-avatar">
        <img :src="person.avatar" width="60" height="60" @click="openSelectImg">
        <div class="tips">点击修改头像</div>
    </div>
    <div class="edit-msg">
        <van-field v-model="person.username" label="昵称：" placeholder="请输入用户名" />
        <van-field
            v-model="person.bio"
            rows="3"
            autosize
            label="个性签名"
            type="textarea"
            maxlength="50"
            placeholder="请输入签名"
            show-word-limit
        />
    </div>
    <div class="edit-btn">
        <van-button hairline type="info" size="large" @click="updateMsg()">确定</van-button>
    </div>

    <input type="file" id="avatar" v-show="false" accept="image/gif, image/jpeg, image/png" @change="changeAvatar">
</div>
</template>

<script>
export default {
    name: "PersonEdit",
    data() {
        return {
            fileEle: null,
            person: {
                id: '12334561321',
                username: '测试test',
                avatar: '/img/user.jpg',
                bio: '个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介。'
            }
        }
    },
    methods: {
        openSelectImg() {
            this.fileEle.click()
        },
        changeAvatar() {
            let url = '/user/avatar'
            let _this = this
            let file = this.fileEle.files[0]
            let form = new FormData()
            form.append('file', file)
            this.request.post(url, form, {
                headers:{"Content-Type": "multipart/form-data"}
            }).then(res => {
                _this.person.avatar = res.data.avatar
                _this.$notify({
                    type: 'success',
                    message: res.data.msg
                })
            }).catch(e => {
                _this.$notify({
                    type: 'danger',
                    message: e.response.data.msg
                })
            })
        },
        updateMsg() {
            let url = '/user/msg'
            let _this = this
            this.request.post(url, _this.person).then(res => {
                _this.$notify({
                    type: 'success',
                    message: res.data.msg
                })
            }).catch(e => {
                _this.$notify({
                    type: 'danger',
                    message: e.response.data.msg
                })
            })
            this.$notify({ type: 'success', message: '修改成功！' });
        },
        getUserData() {
            let url = '/user/'
            let _this = this
            let user_str = localStorage.getItem('user')
            if (!user_str) {
                location.href = '#/login'
            }
            let user = JSON.parse(user_str)
            if (!user) {
                location.href = '#/login'
            }
            this.request.get(url, {
                params: {
                    id: user.id
                }
            }).then(res => {
                _this.person = res.data.user
                console.log(res.data)
            }).catch(e => {
                _this.$notify({
                    type: 'danger',
                    message: e.response.data.msg
                })
            })
        }
    },
    mounted() {
        this.fileEle = document.querySelector('#avatar')
        this.getUserData()
    }
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/main.styl"
.edit
    &-avatar
        margin 26px auto
        text-align center
        img
            border-radius 50%
        .tips
            color $sub2-color
            font-size 14px
    &-btn
        position absolute
        left 50%
        bottom 68px
        margin-left -140px
        width 280px
</style>