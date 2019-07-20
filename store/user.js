// import {mapState,mapMutations} from 'vuex'
export const state = () => ({
  userInfo: {
    token: "",
    user: {}
  }
});
// mutations：同步设置修改state的数据
export const mutations = {
  // 设置用户的数据,存储到state里
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  // 清空用户数据
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    };
  }
};
// actions: 异步设置修改state的数据
// 负责登录的请求
// 第一个参数是store对象
// 第二个参数
export const actions = {
  // 登录
  login({ commit }, data) {
    this.$axios({
      method: "post",
      url: "/accounts/login",
      data
    }).then(res => {
      // console.log(res.data)
      commit("setUserInfo", res.data);
    });
  },
  // 注册
  register({ commit }, data) {
    this.$axios({
      method: "post",
      url: "/accounts/register",
      data
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        commit("setUserInfo", res.data);
        this.$router.back();
      }
    });
  },
  // 发送验证码
  sendCaptcha(store,phoneNumber){
    return this.$axios({
      method: "post",
      url: "captchas",
      data:{
        tel:phoneNumber
      }
    }).then(res => {
      // console.log(res.data)
      if (res.status === 200) {
        const { code } = res.data;
        return code
      }
    }); 
  }
};
