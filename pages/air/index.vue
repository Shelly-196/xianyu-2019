<template>
    <div class="flight">
      <el-header class="flightIcon" style="height:40px">
        <i class="iconfont iconfeiji"></i>
        <span>国内机票</span>
      </el-header>
      <el-container>
        <!-- 订票区域 -->
        <el-aside style="width:358px;height:348px">
          <!-- tab栏头部 -->
          <div class="airTab">
            <div
              @click="handleTabChange(item,index)"
              :class="{active:index===currentTab}"
              v-for="(item,index) in currentTabData"
              :key="index"
            >
              <span>
                <i :class="item.icon"></i>
                {{item.tabName}}
              </span>
            </div>
          </div>
          <!-- tab栏主体部分 -->
          <div class="airTabBody">
            <!-- 始发城市交换区域 -->
            <div class="interChangeC">
              <div class="changeIcon">换</div>
            </div>
            <!-- tab栏主体部分 -->
            <el-form ref="airTabForm" :model="airTabForm" label-width="80px">
              <el-form-item label="出发城市">
                <el-input style="width:213px" v-model="airTabForm.departCity" placeholder="请输入出发城市"></el-input>
              </el-form-item>
              <el-form-item label="到达城市">
                <el-input style="width:213px" v-model="airTabForm.destCity" placeholder="请输入到达城市"></el-input>
              </el-form-item>
              <el-form-item label="出发时间">
                <el-col :span="11" style="width:213px">
                  <el-date-picker
                    type="date"
                    placeholder="2019-04-30"
                    v-model="airTabForm.departDate"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width:213px">
                  <i class="el-icon-search" style="display:inline-block;margin-right:6px"></i>搜索
                </el-button>
              </el-form-item>
            </el-form>
          </div>
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
export default {
  data() {
    return {
      // 特价机票商品列表
      saleProList:[
        {img:'https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg',city:'广州-上海',price:'699'},
        {img:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=d4e2f29522381f309a198aab99004c67/6a63f6246b600c33cd891e65104c510fd8f9a1af.jpg',city:'广州-上海',price:'699'},
        {img:'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=9154c841bcfd5266a32b3b169b199799/3812b31bb051f8199687c7e0d0b44aed2f73e7fe.jpg',city:'广州-上海',price:'699'},
        {img:'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=a1b035c61a38534388cf8023a312b01f/9c16fdfaaf51f3de20157fce9eeef01f3b2979f1.jpg',city:'广州-上海',price:'699'}
      ],
      currentTab: 0,
      currentTabData: [
        { tabName: "单程", icon: "iconfont icondancheng" },
        { tabName: "往返", icon: "iconfont iconshuangxiang" }
      ],
      airTabForm: {
        departCity: "",
        departCode: "",
        departDate: "",
        destCity: "",
        destCode: ""
      }
    };
  },
  methods: {
    handleTabChange(item, index) {
      if (index === 1) {
        this.$message.warning("目前仅app支持往返机票功能");
      }
    }
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
  .airTab {
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    div {
      flex: 1;
      text-align: center;
      height: 48px;
      line-height: 42px;
      box-sizing: border-box;
      border-top: 3px solid #eee;
      background-color: #eee;
      span {
        i {
          display: inline-block;
          margin-right: 6px;
        }
      }
    }
    .active {
      background-color: #fff;
      border-top: 3px solid orange;
    }
  }
  .airTabBody {
    margin-top: 20px;
    position: relative;
    .interChangeC {
      position: absolute;
      top: 20px;
      right:40px;
      width: 25px;
      height: 60px;
      border-top: 2px solid #ddd;
      border-bottom: 2px solid #ddd;
      border-right: 1px solid #ddd;
      .changeIcon {
        position: absolute;
        top: 50%;
        right: -50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        background-color: #999;
        border-radius: 2px;
      }
    }
  }
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