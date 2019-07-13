<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="700px" arrow="always">
      <el-carousel-item v-for="(item, index) in imageList" :key="index" interval="3000">
        <div class="banner" :style="`background:url(${item.url}) center center no-repeat`"></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索区域 -->
    <div class="banner_search">
      <div class="blockarea">
        <div
          id="est_cn"
          class="est_selected"
          @click="changePlaceholder(index)"
          v-for="(item,index) in searchList"
          :key="index"
        >
          <div class="search_left">{{item.name}}</div>
          <div class="search_right"></div>
        </div>
      </div>
      <div class="search_content">
        <input type="text" class="search_input" :placeholder="searchList[index].text" />
        <i class="el-input__icon el-icon-search search_icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      imageList: [
        {
          url: "http://157.122.54.189:9095/assets/images/th01.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th02.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th04.jfif"
        }
      ],
      searchList: [
        { name: "攻略", text: "搜索城市",url:'/post?city=' },
        { name: "酒店", text: "请输入城市搜索酒店",url:'/hotel?city=' },
        { name: "机票", url:'/air' }
      ]
    };
  },
  methods: {
    changePlaceholder(index) {
      this.index = index;
      if(index===2){
        this.$router.push(this.searchList[index].url)
      }
    }
  }
};
</script>
<style lang="less">
.banner {
  height: 100%;
  width: 100%;
}
.container {
  position: relative;
}
.banner_search {
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  width: 555px;
  .blockarea {
    display: flex;
    width: 555px;
    #est_cn {
      cursor: pointer;
      z-index: 1000;
      width: 90px;
      height: 36px;
      line-height: 36px;
      display: flex;
      .search_left {
        text-align: center;
        color: #fff;
        height: 100%;
        width: 80px;
        background-color: rgba(0, 0, 0, 0.6);
      }
      .search_right {
        flex: 1;
        height: 0px;
        width: 0px;
        border-bottom: solid 36px rgba(0, 0, 0, 0.6);
        border-right: solid 8px rgba(0, 0, 0, 0);
      }
    }
  }
  .search_content {
    display: flex;
    position: absolute;
    width: 100%;
    background-color: #fff;
    border-radius: 0 3px 3px 3px;
    padding-right: 10px;
    .search_input {
      flex: 1;
      height: 20px;
      outline: none;
      padding: 13px 15px;
      border-radius: 0 3px 3px 3px;
      border: 0;
      font-size: 16px;
    }
    .search_icon {
      cursor: pointer;
      color: #000;
      font-weight: 700;
      font-size: 20px;
    }
  }
}
</style>
