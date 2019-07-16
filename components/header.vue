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
      <!-- 消息区域 -->
      <el-dropdown>
        <el-button class="header_bell">
          <i class="el-icon-bell"></i>
          <span>消息</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>消息区域</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头部登录及用户部分 -->
      <div class="header_login">
        <div class="user" v-if="$store.state.user.userInfo.token">
          <span class="avatar">
            <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt="">
          </span>
          <div class="nickname">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{$store.state.user.userInfo.user.nickname}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <nuxt-link class="login" to="/user/login" v-else>注册 / 登录</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
    handleLogout(){
      this.$store.commit('user/clearUserInfo')
      this.$message.success("退出成功")
      setTimeout(() => {
        this.$router.push("/user/login")        
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 0 #f5f5f5;
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
  .header_bell {
    &:hover {
      background-color: #fff;
      color: inherit;
    }
    cursor: pointer;
    margin-right: 10px;
    outline: none;
    border: none;
  }
  .header_login {
    a {
      &:hover {
        color: #409eff;
      }
    }
    .user{
        .avatar{
        margin-right: 10px;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        height: 32px;
        width: 32px;
        // background-size: contain;
        img{
          display: inline-block;
          padding: 2px;
          border-radius: 50%;
          width: 100%;
          border: 2px solid #fff;
          vertical-align: middle;
          &:hover{
          border-color: #409eff;
          }
        }
      }
      .nickname{
        display: inline-block;
      }
    }
  }
}
</style>