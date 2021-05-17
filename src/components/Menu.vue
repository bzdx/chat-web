<template>
    <ul class="footer-menu" :style="{width: page.width+'px'}">
        <li class="footer-menu-item" :class="{'active-item': active === 0}" @click="goToLink('#/message')">
            <van-icon name="chat" size="28px"/>
        </li>
        <li class="footer-menu-item" :class="{'active-item': active === 1}" @click="goToLink('#/contact')">
            <van-icon name="friends" size="28px"/>
        </li>
        <li class="footer-menu-item" :class="{'active-item': active === 2}" @click="goToLink('#/person')">
            <van-icon name="contact" size="28px"/>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Menu",
    props: ['active'],
    methods: {
        goToLink(link) {
            location.href = link
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/main.styl"
$menu-height = 38px
.footer-menu
    margin 0
    padding 0
    display flex
    position fixed
    left 0
    bottom 0
    height $menu-height
    border-top 2px solid rgba($theme-color, .4)
    background-color white
    &-item
        flex 1
        padding-top 5px
        text-align center
        .van-icon::before
            color $sub-color
    .active-item .van-icon::before
        color $theme-color!important
</style>