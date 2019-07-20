<template>
  <el-form :model="registerForm" :rules="rules" ref="registerForm" class="registerForm">
    <el-form-item prop="username">
      <el-input v-model="registerForm.username" placeholder="用户名 / 手机"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input placeholder="验证码" v-model="registerForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input v-model="registerForm.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="registerForm.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword">
      <el-input v-model="registerForm.checkPassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%" @click="handleRegister">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名手机", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
     const { username } = this.registerForm;
      if(username.trim()===""){
        this.$message.warning("请输入用户手机号")
        return;
      }
      this.$store.dispatch("user/sendCaptcha",this.registerForm.username)
      .then(code=>{
        // 弹框提示
        this.$alert(`验证码为${code}`, "提示", {
          confirmButtonText: "确定"
        });
      })
    },
    // 注册事件
    handleRegister() {
      const { checkPassword, ...props } = this.registerForm;
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/register",props)
        }
      });
    }
  }
};
</script>

<style lang="less">
.registerForm {
  padding: 20px;
}
</style>
