<template>
    <div class="user-item" @click="goToChat(user.id)">
        <img width="30" height="30" :src="user.avatar" class="user-item-avatar">
        <div class="user-item-body" :style="{width: page.width - 86 + 'px'}">
            <div class="user-item-body-name">{{ user.username }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserItem",
        props: ['user'],
        methods: {
            goToChat(id) {
                location.href = '#/send?id='+id
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../assets/css/main.styl"
    .user-item
        padding 4px 6px
        border-top 1px solid $sub3-color
        &:first-of-type
            border-top none
        &-avatar
            border-radius 6px
        &-body
            display inline-block
            vertical-align top
            margin-left 8px
            &-name
                position relative
                top 6px
                font-size 20px
                font-weight bold
                color $theme-color
</style>