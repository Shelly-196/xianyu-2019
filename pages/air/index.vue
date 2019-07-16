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
            <a href="#">
              <img :src="item.img" alt="">
              <div class="saleProIntro">
                <span class="city">{{item.city}}</span>
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
  data() {
    return {
      // 特价机票商品列表
      saleProList:[
        {img:'https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg',city:'广州-上海',price:'699'},
        {img:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=d4e2f29522381f309a198aab99004c67/6a63f6246b600c33cd891e65104c510fd8f9a1af.jpg',city:'广州-上海',price:'699'},
        {img:'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=9154c841bcfd5266a32b3b169b199799/3812b31bb051f8199687c7e0d0b44aed2f73e7fe.jpg',city:'广州-上海',price:'699'},
        {img:'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=a1b035c61a38534388cf8023a312b01f/9c16fdfaaf51f3de20157fce9eeef01f3b2979f1.jpg',city:'广州-上海',price:'699'}
      ]
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