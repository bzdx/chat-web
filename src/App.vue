<template>
  <div id="app" :style="{'min-height': page.height+'px'}">
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
Vue.use(Vant)
Vue.use(VueRouter)

import Login from "./pages/Login";
import Register from "./pages/Register";
import Message from "./pages/Message";
import Contact from "./pages/Contact";
import Person from "./pages/Person";

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/message'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/message',
      component: Message
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/person',
      component: Person
    },
  ]
})
export default {
  name: 'App',
  components: {
  },
  router
}
</script>

<style lang="stylus">
$theme-color = #1989fa
#app
  margin 0 auto;
  max-width 420px
</style>