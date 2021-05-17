<template>
    <div id="message">
        <message-item v-for="(message, index) in msgListShow" :key="index" :message="message"/>

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
            ],
            msgListShow: [],
            chatUsers: [],
        }
    },
    methods: {
        getUserData(id, cb) {
            let url = '/user'
            let _this = this
            this.request.get(url, {
                params: {
                    id: id
                }
            }).then(res => {
                cb(res.data.user)
            }).catch(e => {
                _this.$notify({
                    type: 'danger',
                    message: e.response.data.msg
                })
            })
        },
        async getMessageList() {
            let url = '/message'
            let _this = this
            let user = localStorage.getItem('user')
            if (!user) {
                location.href = '#/login'
            }
            user = JSON.parse(user)
            this.request.get(url, {
                params: {
                    id: user.id,
                }
            }).then(res => {
                _this.msgList = res.data.msgList
                _this.msgList.forEach(msg => {
                    if (user.id === msg.sender) {
                        // console.log(msg)
                        if (!_this.chatUsers.includes(msg.receiver)) {
                            _this.chatUsers.push(msg.receiver)
                            _this.getUserData(msg.receiver, (_user)=>{
                                msg.name = _user
                                _this.msgListShow.push(msg)
                            })
                        }
                    } else {
                        if (!_this.chatUsers.includes(msg.sender)) {
                            _this.chatUsers.push(msg.sender)
                            _this.getUserData(msg.receiver, (_user)=>{
                                msg.name = _user.username
                                _this.msgListShow.push(msg)
                            })
                        }
                    }
                })
                console.log(_this.msgListShow)
            }).catch(e => {
                _this.$notify({
                    type: 'danger',
                    message: e.response.data.msg
                })
            })
        },
    },
    components: {
        'page-menu': Menu,
        'message-item': MessageItem,
    },
    mounted() {
        this.getMessageList()
    }
}
</script>

<style lang="stylus" scoped>
#message
    padding 8px
</style>