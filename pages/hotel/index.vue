<template>
    <div>
        <el-button @click="changeToDetail">酒店</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        changeToDetail(){
            console.log(123)
            this.$router.push({
                path:'/hotel/detail'
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>
