<template>
  <div id="app" :style="{'min-height': page.height-46+'px'}">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import Vant from 'vant'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.prototype.page = {
  width: innerWidth,
  height: innerHeight
};
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8040'
Vue.prototype.request = axios
Vue.use(Vant)
Vue.use(VueRouter)

import Header from './components/Header'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Message from "./pages/Message";
import Contact from "./pages/Contact";
import Person from "./pages/Person";
import PersonEdit from "./pages/PersonEdit";
import SendMsg from "./pages/SendMsg";

const router = new VueRouter({
  routes: [
    {
      path: '/', // 所有错误路由重定向到消息页面
      redirect: '/message'
    },
    {
      path: '/login', // 用户登录
      component: Login
    },
    {
      path: '/register', // 用户注册
      component: Register
    },
    {
      path: '/message', // 查看消息
      component: Message
    },
    {
      path: '/contact', // 查看好友
      component: Contact
    },
    {
      path: '/person', // 查看个人信息
      component: Person
    },
    {
      path: '/edit', // 编辑修改个人信息
      component: PersonEdit
    },
    {
      path: '/send', // 发送消息
      component: SendMsg
    },
  ]
})
export default {
  name: 'App',
  components: {
    'page-header': Header
  },
  router
}
</script>

<style lang="stylus">
$theme-color = #1989fa
#app
  margin 0 auto;
  max-width 420px
  max-height 100%
  overflow hidden
  padding-top 46px
</style>