<template>
    <div class="send" :style="{'min-height': page.height-46+'px'}">
        <div class="send-footer" :style="{width: page.width+'px'}">
            <van-icon name="photo-o" size="25" color="#666" @click="fileClick()"/>
            <textarea rows="1" v-model="input" :style="{width: page.width- 98+'px'}" autofocus placeholder="点击输入"/>
            <van-icon name="comment-o" size="25" color="#1989fa" @click="sendMsg"/>
        </div>

        <div class="send-msg">
            <msg-item v-for="(msg, index) in msgList" :key="index" :message="msg"/>
        </div>

        <input type="file" id="file" v-show="false" @change="fileChange" accept="image/gif, image/png, image/jpg, image/jpeg">
    </div>
</template>

<script>
    import tools from "../assets/js/tools";
    import MessageDetail from "../components/MessageDetail";
    export default {
        name: "SendMsg",
        data() {
            return {
                user: {},
                input: '',
                receiveId: '',
                socket: null,
                fileEle: null,
                imgSrc: '',
                msgList: [],
            }
        },
        components: {
            'msg-item': MessageDetail
        },
        methods: {
            fileClick() {
                this.fileEle.click()
            },
            fileChange() {
                let url = '/user/img'
                let _this = this
                let file = this.fileEle.files[0]
                if (!file) return

                let form = new FormData()
                form.append('file', file)
                this.request.post(url, form, {
                    headers:{"Content-Type": "multipart/form-data"}
                }).then(res => {
                    _this.imgSrc = res.data.src
                    _this.sendMsg()
                }).catch(e => {
                    _this.$notify({
                        type: 'danger',
                        message: e.response.data.msg
                    })
                })
            },
            async getUserData() {
                let url = '/user'
                let _this = this
                let cacheUser = JSON.parse(localStorage.getItem('user'))
                let res = await this.request.get(url, {
                    params: {
                        id: cacheUser.id || null,
                    }
                })
                _this.user = res.data.user

                await this.getMessageList()
            },
            sendMsg() {
                let _this = this
                let msg = {
                    avatar: _this.user.avatar,
                    mid: Date.now()+parseInt(Math.random()*9999)+'',
                    object: 'user',
                    sender: _this.user.id,
                    receiver: _this.receiveId,
                    created: new Date().getTime()+'',
                    created_str: tools.dateFmt(new Date()),
                    type: 1,
                    content: _this.input
                }
                if (_this.imgSrc) {
                    msg.type = 2
                    msg.content = _this.imgSrc
                }
                // console.log(msg)
                this.socket.emit('server-message', msg)
                _this.imgSrc = null
                _this.input = ''
            },
            async getMessageList() {
                let url = '/message'
                let _this = this
                this.request.get(url, {
                    params: {
                        id: _this.receiveId,
                    }
                }).then(res => {
                    _this.msgList = res.data.msgList
                    // console.log(_this.user)
                }).catch(e => {
                    _this.$notify({
                        type: 'danger',
                        message: e.response.data.msg
                    })
                })
            }
        },
        async mounted() {
            let href = location.href
            this.receiveId = href.substr(href.indexOf('?id=')+4)
            await this.getUserData()
            this.fileEle = document.getElementById('file')
            this.socket = window.io('http://127.0.0.1:8040')
            this.socket.on('connect',  ()=>{
                console.log('client connect');
            });
            this.socket.on('disconnect', ()=>{
                console.log('client disconnect');
            });
            this.socket.on('client-message', msg => {
                this.msgList.push(msg)
            })
        }
    }
</script>

<style lang="stylus" scoped>
@import "../assets/css/main.styl"
.send
    position relative
    padding-bottom 46px
    &-footer
        position fixed
        left 0
        bottom 0
        box-sizing border-box
        padding 8px
        height 36px
        background-color #b9d3ec
        border-top 1px solid #b9d3ec
        textarea
            box-sizing border-box
            margin 0 12px
            border-radius 6px
            border none
            outline none
            font-size 14px
            padding 2px 6px
            background-color transparent
            vertical-align top
        i
            position relative
            top -2px
</style>