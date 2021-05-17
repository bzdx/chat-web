<template>
    <div id="person">
        <div class="person-avatar">
            <img :src="person.avatar" width="60" height="60">
        </div>
        <div class="person-name">{{ person.username }}</div>
        <div class="person-bio">
            <van-icon name="records" size="20"/>
            <span>{{ person.bio }}</span>
        </div>

        <div class="person-btn">
            <van-button hairline type="info" size="large" @click="goToEdit()">编辑</van-button>
        </div>

        <page-menu :active="2"/>
    </div>
</template>

<script>
import Menu from "../components/Menu";
export default {
    name: "Person",
    data() {
        return {
            person: {
                id: '12334561321',
                username: '测试test',
                avatar: '/img/user.jpg',
                bio: '个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介。'
            }
        }
    },
    methods: {
        goToEdit() {
            location.href = '#/edit'
        },
        getUserData() {
            let url = '/user'
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
    components: {
        'page-menu': Menu
    },
    mounted() {
        this.getUserData()
    }
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/main.styl"
.person
    &-avatar
        margin-top 32px
        text-align center
        img
            border-radius 50%
    &-name
        padding 12px 0
        font-size 18px
        font-weight bold
        letter-spacing 1px
        color $theme-color
        text-align center
    &-bio
        margin 8px auto
        padding 8px
        width 88%
        border 1px solid $sub3-color
        border-radius 6px
        .van-icon
            color $sub2-color
        span
            font-size 14px
            margin-left 8px
    &-btn
        position absolute
        left 50%
        bottom 68px
        margin-left -140px
        width 280px
</style>