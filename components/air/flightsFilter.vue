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
          <el-select @change="handleAirport" v-model="airport" placeholder="起飞机场" size="mini">
            <el-option v-for="(item,index) in data.options.airport" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content-light">
          <el-select @change="handleFlightTimes" v-model="flightTimes" placeholder="起飞时间" size="mini">
            <el-option v-for="(item,index) in data.options.flightTimes" :key="index" :label="`${item.from}:00-${item.to}:00`" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content-light">
          <el-select @change="handleCompany" v-model="company" placeholder="航空公司" size="mini">
            <el-option v-for="(item,index) in data.options.company" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content-light">
          <el-select @change="handleAirSize" v-model="airSize" placeholder="机型" size="mini">
            <el-option v-for="(item,index) in sizeOptions" :key="index" :label="item.name" :value="item.size"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!-- 筛选按钮 -->
    <div class="filterCancel">
      筛选：
      <el-button @click="resetDataList" type="primary" round plain size="mini">撤销</el-button>
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
   },
   methods:{
    //    选择机场时触发
       handleAirport(value){
        //    根据选项返回一个新的数组给父组件
        const arr = this.data.flights.filter(v=>{
            return v.org_airport_name===value
        })
        // 得到一个过滤后的数组，传递回去给父组件
        this.$emit("changeFlights",arr)
       },
    //    选择出发时间时触发
       handleFlightTimes(value){
        //    console.log(value,'出发时间')
           const arr = this.data.flights.filter(v=>{
                return +value.from<= +v.dep_time.split(':')[0] && +value.to>= +v.dep_time.split(':')[0]
            })
            this.$emit("changeFlights",arr)
       },
    // 选择航空公司时触发
        handleCompany(value){
            const arr = this.data.flights.filter(v=>{
            return v.airline_name===value
            })
            this.$emit("changeFlights",arr)
        },
    // 选择机型时触发
        handleAirSize(value){
            const arr = this.data.flights.filter(v=>{
            return v.plane_size===value
            })
            this.$emit("changeFlights",arr)
        },
        // 撤销条件
        resetDataList(){
          this.airport="",
          this.company="",
          this.flightTimes="",
          this.sizeOptions='',
          this.$emit('changeFlights',this.data.flights)
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


