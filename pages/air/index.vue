<template>
    <div class="flight">
      <el-header class="flightIcon" style="height:40px">
        <i class="iconfont iconfeiji"></i>
        <span>国内机票</span>
      </el-header>
      <el-container>
        <!-- 订票搜索区域 -->
        <el-aside style="width:358px;height:348px">
          <searchForm/>
        </el-aside>
        <!-- 轮播图区域 -->
        <el-main>
          <div class="airBanner">
            <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
          </div>
        </el-main>
      </el-container>
      <footer>
      <!-- 服务导航栏区域 -->
        <div class="service">
          <div>
            <i></i>100%航协认证
          </div>
          <div>
            <i></i>出行保证
          </div>
          <div>
            <i></i>7x24小时服务
          </div>
        </div>
      <!-- 特价机票区域 -->
      <div class="salePlaneTicket">
        <h2><i class="iconfont icontejiajipiao"></i>特价机票</h2>
        <!-- 特价机票商品展览区域 -->
        <div class="saleProArea">
          <el-form class="salePro" v-model="saleProList" v-for="(item,index) in saleProList" :key="index">
            <a :href="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
              <img :src="item.cover" alt="">
              <div class="saleProIntro">
                <span class="city">{{item.departCity}}-{{item.destCity}}</span>
                <span class="price">￥{{item.price}}</span>
              </div>
            </a>
          </el-form>
        </div>
      </div>
      </footer>
    </div>
</template>
<script>
import searchForm from "@/components/air/searchform"
export default {
  components:{
    searchForm
  },
  mounted(){
    this.$axios({
      url:'/airs/sale'
    }).then(res=>{
      // console.log(res,'特价机票')
      const {data} = res.data
      this.saleProList=data
    })
  },
  data() {
    return {
      // 特价机票商品列表
      saleProList:[]
    };
  }
};
</script>
<style lang="less">
.flight {
  margin: 20px auto;
  width: 1000px;
  .flightIcon {
    padding-left: 0;
    color: orange;
    font-size: 20px;
    i{
      font-size: 20px;
    }
  }
}
footer {
  padding: 0;
  .service {
    margin: 20px 0;
    padding: 10px 0;
    width: 100%;
    border: 1px solid #ddd;
    background-color: #f5f5f5;
    display: flex;
    div {
      flex: 1;
      text-align: center;
      line-height: 36px;
      &:nth-child(2) {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }
    }
  }
  .salePlaneTicket{
    margin: 15px 0;
    h2{
      font-size: 20px;
      color: #409eff;
      i{
        font-size: 20px;
        &:after{
          content: "  "
        }
      }
    }
    .saleProArea{
      display: flex;
      margin-top: 15px;
      margin-bottom: 50px;
      padding: 20px 15px 20px 25px;
      border: 1px solid #ddd;
      .salePro{
        flex: 1;
        height: 140px;
        a{
          position: absolute;
          width: 225px;
          height: 140px;
          overflow: hidden;
          img{
          width: 100%;
          vertical-align: center;
          }
          .saleProIntro{
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 10px;
            color: #fff;
            background-color: rgba(0,0,0,.4);
            .city{
              font-size: 14px
            }
            .price{
              font-size: 18px;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
.el-aside {
  border: 1px solid #eee;
}

.el-main {
  padding: 0;
  padding-left: 20px;
  .airBanner {
    width: 620px;
    height: 350px;
    margin-top: 0;
    margin-right: 0;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
}
</style>