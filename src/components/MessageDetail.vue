<template>
    <div class="message-item">
        <img width="30" height="30" :src="message.avatar" class="message-item-avatar">
        <div class="message-item-body" :style="{width: page.width - 66 + 'px'}">
            <span class="message-item-body-date">{{ message.created_str }}</span>
            <div class="message-item-body-name">{{ message.name }}</div>
            <div class="message-item-body-content">
                <template v-if="message.type === 1">
                    {{ message.content }}
                </template>
                <template v-else>
                    <img :src="message.content" width="100%">
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageDetail",
        props: ['message'],
    }
</script>

<style lang="stylus" scoped>
    @import "../assets/css/main.styl"
    .message-item
        margin-top 4px
        padding 6px
        &:first-of-type
            border-top none
        &-avatar
            border-radius 6px
        &-body
            display inline-block
            vertical-align top
            margin-left 8px
            &-date
                padding 6px
                font-size 12px
                color white
                float right
                background-color $theme-color
                border-radius 8px
            &-name
                font-size 20px
                font-weight bold
                color $theme-color
            &-content
                box-sizing border-box
                padding 8px
                margin-top 6px
                font-size 13px
                /*text-overflow ellipsis*/
                /*overflow hidden*/
                /*white-space nowrap*/
                border-radius 8px
                background-color $theme-color
                color white
</style>