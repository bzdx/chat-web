<template>
    <div id="message">
        <message-item v-for="(message, index) in msgList" :key="index" :message="message"/>

        <page-menu :active="0"/>
    </div>
</template>

<script>
import Menu from "../components/Menu";
import MessageItem from "../components/MessageItem";
export default {
    name: "Message",
    data() {
        return {
            msgList: [
                {
                    uid: '162453456854',
                    object: 'user',
                    name: 'test',
                    avatar: '/img/user.jpg',
                    created_str: '2021-05-12 17:29:31',
                    type: 'txt',
                    content: '啊撒旦立刻就发挥空间，爱丽丝的客服经理肯定撒法律框架'
                },
                {
                    uid: '162454521654',
                    object: 'user',
                    name: 'test-22',
                    avatar: '/img/user2.jpg',
                    created_str: '2021-05-10 19:31:31',
                    type: 'img',
                    content: '/img/user.jpg'
                },
            ]
        }
    },
    components: {
        'page-menu': Menu,
        'message-item': MessageItem,
    }
}
</script>

<style lang="stylus" scoped>
#message
    padding 8px
</style>