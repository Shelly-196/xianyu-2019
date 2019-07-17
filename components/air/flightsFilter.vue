<template>
  <div class="flightsFilter">
    <!-- 过滤选项航 -->
    <el-row type="flex" justify="space-between" align="middle" class="filterTop">
      <el-col :span="8">
        <div class="grid-content">
          单程：
          {{data.info.departCity}} - {{data.info.destCity}}
          /
          {{data.info.departDate}}
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content-light">
          <el-select v-model="airport" placeholder="起飞机场" size="mini">
            <el-option v-for="(item,index) in data.options.airport" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content-light">
          <el-select v-model="flightTimes" placeholder="起飞时间" size="mini">
            <el-option v-for="(item,index) in data.options.flightTimes" :key="index" :label="`${item.from}:00-${item.to}:00`" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content-light">
          <el-select v-model="company" placeholder="航空公司" size="mini">
            <el-option v-for="(item,index) in data.options.company" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content-light">
          <el-select v-model="airSize" placeholder="机型" size="mini">
            <el-option v-for="(item,index) in sizeOptions" :key="index" :label="item.name" :value="item.size"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!-- 筛选按钮 -->
    <div class="filterCancel">
      筛选：
      <el-button type="primary" round plain size="mini">撤销</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        // 下拉列表数据
      airport:'',
      flightTimes: "",
      company: "",
      sizeOptions: [
          {name:'大型',size:'L'},
          {name:'中型',size:'M'},
          {name:'小型',size:'S'}
      ],
      airSize:""
    };
  },
   // 整体筛选数据来源
   props:{
       data:{
           type:Object,
           default:{}
       }
   }
};
</script>
<style lang="less">
.flightsFilter{
    .filterTop{
        > div{
           /deep/.el-select{
               margin-left: 10px;
           }
        }
    }
    .filterCancel{
        margin: 10px 0 20px 0;
        /deep/.el-button{
            margin-left: -6px;
        }
    }
}
</style>


