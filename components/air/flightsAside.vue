<template>
  <div class="flightsAside">
    <div class="upper">
      <el-row class="asideIcons">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409eff;fontSize:40px"></i>
            <div class="iconInfo">航协认证</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <i class="iconfont iconbaozheng" style="color:#008000;fontSize:40px"></i>
            <div class="iconInfo">出行保证</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <i class="iconfont icondianhua" style="color:#409eff;fontSize:40px"></i>
            <div class="iconInfo">7x24</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="hotLineService">免费客服电话：4006345678转2</el-row>
    </div>
    <!-- 历史查询 -->
    <div class="history">
        <el-row class="hisTitle">历史查询</el-row>
        <nuxt-link v-for="(item,index) in airHistory" :key="index" 
        :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
          <el-row class="hisItem">
            <el-col :span="12">
                <el-row>{{item.departCity}}-{{item.destCity}}</el-row>
                <el-row class="date">{{item.departDate}}</el-row>
            </el-col>
            <el-col :span="12">
                <div class="chooseBtn">选择</div>
            </el-col>
        </el-row>
        </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      airHistory:[]
    }
  },
  props:{
    data:{
      type:Object,
      default:{}
    }
  },
  mounted(){
    this.airHistory=JSON.parse(localStorage.getItem("air"||'[]'))
  }
};
</script>
<style lang="less">
.upper {
  text-align: center;
  border: 1px solid #ddd;
  .asideIcons {
    padding: 10px 0;
    .iconInfo {
      margin: 10px auto 0;
      font-size: 12px;
    }
  }
  .hotLineService {
    background-color: #f6f6f6;
    font-size: 14px;
    text-align: center;
    height: 32px;
    line-height: 32px;
  }
}
.history{
    margin-top: 10px;
    border: 1px solid #ddd;
    .hisTitle{
        margin: 0 auto;
        width: 218px;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
    }
    .hisItem{
        padding: 10px 10px;
        .date{
            padding: 8px 0;
            font-size: 12px;
        }
        .chooseBtn{
            float: right;
            width: 44px;height: 20px;
            line-height: 20px;
            background-color: #ffa500;
            font-size: 12px;
            color: #fff;
            text-align: center;
            border-radius: 5px;
        }
    }
}
</style>

