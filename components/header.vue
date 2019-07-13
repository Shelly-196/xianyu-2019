<template>
  <!-- 头部 -->
  <div class="header">
    <el-row type="flex" justify="space-between" class="w">
      <!-- logo部分 -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" />
        </nuxt-link>
      </div>
      <!-- 头部导航栏 -->
      <el-row type="flex" class="header_nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 头部登录及用户部分 -->
      <div class="header_login">
        <nuxt-link class="login" to="/user/login">注册/登录</nuxt-link>
        <nuxt-link class="user" v-if="false"></nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.header {
  height: 60px;
  line-height: 60px;
//   border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 0 #ccc;
  box-sizing: border-box;
  .w {
    margin: 0 auto;
    width: 1000px;
    .logo {
      margin-right: 20px;
      width: 156px;
      padding-top: 8px;
      a {
        // text-decoration: none;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
  .header_nav {
    flex: 1;
    a {
      display: block;
      height: 60px;
      // text-decoration: none;
      // color: inherit;
      box-sizing: border-box;
      padding: 0 20px;
      &:hover {
        border-bottom: 2px solid #409eff;
        color: #409eff;
      }
    }
    /deep/ .nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff !important;
    }
  }
}
</style>