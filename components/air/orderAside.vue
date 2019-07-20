<template>
  <div class="orderAside">
    <div class="air-info">
      <el-row class="upper" type="flex" justify="space-between">
        <div>{{data.dep_date}}</div>
        <div style="fontSize:14px">{{data.org_city_name}}-{{data.dst_city_name}}</div>
      </el-row>
      <el-row class="step">
        <el-row>
          <el-col :span="5">
            <h2>{{data.dep_time}}</h2>
            <div class="grid-content">{{data.org_airport_name}}{{data.org_airport_quay}}</div>
          </el-col>
          <el-col :span="14" style="margin-top:15px">
            <div>---{{rankTime}}---</div>
            <div class="grid-content">{{data.airline_name}} {{data.flight_no}}</div>
          </el-col>
          <el-col :span="5">
            <h2>{{data.arr_time}}</h2>
            <div class="grid-content">{{data.dst_airport_name}}{{data.dst_airport_quay}}</div>
          </el-col>
        </el-row>
      </el-row>
      <!-- 具体信息 -->
      <el-row class="air-main" type="flex" justify="space-between">
          <span>订票总价</span>
          <span>金额</span>
          <span>数量</span>
      </el-row>
      <el-row class="air-main" type="flex" justify="space-between">
          <span>成人机票</span>
          <span>￥{{data.seat_infos.org_settle_price}}</span>
          <span>x1</span>
      </el-row>
      <el-row class="air-main" type="flex" justify="space-between">
          <span>机建＋燃油</span>
          <span>¥{{data.airport_tax_audlet}}/人/单程</span>
          <span>x1</span>
      </el-row>
      <el-row class="air-main" type="flex" justify="space-between">
          <span>应付总额</span>
          <span style="fontSize:28px;color:orange">￥{{$store.state.air.sumPrice}}</span>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    data:{
      type:Object,
      default:{
        seat_infos:{}
      }
    }
  },
  computed:{
    rankTime(){
      if(!this.data.dep_time) return ""
      const dep = this.data.dep_time.split(":")
      const arr = this.data.arr_time.split(":")
      if(dep[1]<dep[0]){
        dep[0]= +dep[0]+ +24
      }
      const start = dep[0]*60+ +dep[1]
      const end = arr[0]*60+ +arr[1]
      const rank = start-end
      const hours = Math.floor(rank/60)
      const mins = rank%60
      return `${hours}时${mins}分`
    } 
  }
};
</script>
<style lang="less">
.orderAside {
  .air-info {
    padding: 15px;
    .upper{
        margin-bottom: 10px;
    }
    .step{
        text-align: center;
        margin-bottom: 10px;
        h2{
            font-size: 22px;
            color: #000;
            display: block;
            margin: 10px auto;
        }
        div{
            color: #999;
            font-size: 12px;
        }
    }
    .air-main{
        padding: 10px 0;
        border-top: 1px dashed #ddd;
        color: #666;
        font-size: 14px;
    }
  }
}
</style>
