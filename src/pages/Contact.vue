<template>
    <div id="contact">
<!--        <div class="contact-tap">-->
<!--            <div class="contact-tap-item" :class="{'tap-active': tap === '好友'}" @click="tap = '好友'">好友</div>-->
<!--            <div class="contact-tap-item" :class="{'tap-active': tap === '群组'}" @click="tap = '群组'">群组</div>-->
<!--        </div>-->

        <div class="user-list">
            <user-item v-for="(user, index) in users" :key="index" :user="user"/>
        </div>

        <page-menu :active="1"/>
    </div>
</template>

<script>
import Menu from "../components/Menu";
import UserItem from "../components/UserItem";
export default {
    name: "Contact",
    data() {
        return {
            // tap: '好友',
            users: [
            ],
        }
    },
    components: {
        'page-menu': Menu,
        'user-item': UserItem
    },
    methods: {
        getFriends() {
            let url = '/user/friends'
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
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(res => {
                _this.users = res.data.users
            }).catch(e => {
                _this.$notify({
                    type: 'danger',
                    message: e.response.data.msg
                })
                if (e.response.status == 401) {
                    location.href = '#/login'
                }
            })
        }
    },
    mounted() {
        this.getFriends()
    }
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/main.styl"
.contact-tap
    $tap-height = 32px
    display flex
    margin 22px auto
    box-sizing border-box
    width 140px
    height $tap-height
    line-height @height
    border-radius 16px
    border 1px solid $theme-color
    box-shadow 0 0 4px 4px rgba($theme-color, .1)
    .tap-active
        background-color $theme-color
        color white
        flex 1.2
    &-item
        flex 1
        text-align center
        height 30px
        font-size 15px
        border-radius 16px
</style>