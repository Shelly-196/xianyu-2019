<template>
  <div class="container">
    <el-row>
    <!-- 左侧信息栏 -->
      <el-col :span="16">
        <div class="orderMain">
            <orderForm/>
        </div>
      </el-col>
      <!-- 侧边栏 -->
      <el-col :span="8">
        <div class="orderAside">
            <orderAside :data="$store.state.air.infoData"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import orderForm from "@/components/air/orderForm";
import orderAside from "@/components/air/orderAside"
export default {
    components:{
        orderForm,
        orderAside
    },
    data(){
      return{
        
      }
    }
}
</script>
<style lang="less">
.container{
    margin: 20px auto;
    width: 1000px;
    .orderMain{
        padding-right: 40px;
    }
    .orderAside{
        width: 350px;
        border: 1px solid #eee;
    }
}
</style>

