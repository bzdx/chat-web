<template>
    <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        fixed="true"
    />
</template>

<script>
    export default {
        name: "Header",
        methods: {
            onClickLeft() {
                history.back()
            }
        }
    }
</script>

<style scoped>

</style>