<template>
    <div id="person">
        个人中心
        <page-menu :active="2"/>
    </div>
</template>

<script>
import Menu from "../components/Menu";
export default {
    name: "Person",
    components: {
        'page-menu': Menu
    }
}
</script>

<style scoped>

</style>