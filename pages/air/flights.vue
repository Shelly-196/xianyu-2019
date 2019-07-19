<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilter :data="cacheFlightsData" @changeFlights="changeFlights" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightList v-for="(item,index) in dataList" :key="index" :data="item" />
          <!-- 分页信息 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[4, 6, 8, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside :data="cacheFlightsData"/>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightList from "@/components/air/flightsList";
import FlightsFilter from "@/components/air/flightsFilter";
import FlightsAside from "@/components/air/flightsAside"
export default {
  data() {
    return {
        // 缓存数据
        cacheFlightsData:{
          flights:[],
          info:{},
          options:{}
        },
        // 航班信息列表
      flightsData: {
          flights:[],
          info:{},
          options:{}
      },
      flightslist: [],
        //   分页
       pageIndex:1,
       pageSize:4
    };
  },
  components: {
    FlightsListHead,
    FlightList,
    FlightsFilter,
    FlightsAside
  },
  /* watch:{
    $route(){
      this.getData();
    }
  }, */
  beforeRouteUpdate(to,from,next){
    next(),
    this.getData()
  },
  computed:{
    // 获取当前页展示的数据
      dataList(){
          return this.flightsData.flights.slice(
              (this.pageIndex-1)*this.pageSize,
              this.pageIndex*this.pageSize
          )
      }
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // console.log(res,'机票列表')
        this.flightsData = res.data;
        this.flightslist = res.data.flights;
        this.total=res.data.flights.length
        this.cacheFlightsData ={...res.data}
        console.log(this.flightsData, "机票列表数组");
      });
    },
    // 传递给子组件用于修改数据列表的事件
    changeFlights(arr){
        if(arr){
            this.pageIndex=1
            this.flightsData.flights=arr
            this.flightsData.total=arr.length
        }
    },
    // 分页
    // 切换条数时触发
    handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
        this.pageSize=val
        this.pageIndex=1
    },
    // 切换当前页时触发
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
        this.pageIndex=val
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>