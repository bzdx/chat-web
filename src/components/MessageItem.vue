<template>
    <div class="message-item" @click="goToChat(message)">
        <img width="50" height="50" :src="message.avatar" class="message-item-avatar">
        <div class="message-item-body" :style="{width: page.width - 86 + 'px'}">
            <span class="message-item-body-date">{{ message.created_str }}</span>
            <div class="message-item-body-name">{{ message.name }}</div>
            <div class="message-item-body-content">
                <template v-if="message.type === 1">
                    {{ message.content }}
                </template>
                <template v-else>
                    <van-icon name="photo" size="20" color="gold"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MessageItem",
    props: ['message'],
    methods: {
        goToChat(msg) {
            let user = JSON.parse(localStorage.getItem('user'))
            let id = msg.receiver
            if (msg.receiver === user.id) {
                id = msg.sender
            }
            location.href = '#/send?id='+id
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/main.styl"
.message-item
    margin-top 4px
    padding 6px
    border-top 1px solid $sub3-color
    &:first-of-type
        border-top none
    &-avatar
        border-radius 6px
    &-body
        display inline-block
        vertical-align top
        margin-left 8px
        &-date
            font-size 12px
            color $sub2-color
            float right
        &-name
            font-size 20px
            font-weight bold
            color $theme-color
        &-content
            margin-top 8px
            font-size 13px
            color #666
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
</style>