<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info" v-for="(item,index) in users" :key="index">
        <div class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择" style="width:100px">
                <el-option label="成人" value="1" ></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择" style="width:100px">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser()">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            @change="changeInsurances(item)"
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <input type="hidden" :data="sumPrice"/>>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [{ username: "", id: "" }],
      insurances: [],
      contactName: "",
      contactPhone: "",
      invoice: false,
      seat_xid: this.$route.query.seat_xid,
      air: this.$route.query.id,
      captcha: "",

      infoData: {
        //机票信息
        seat_infos:{},
        insurances: []
      }
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUse() {},

    //选择保险及移除
    changeInsurances(item) {
      const index = this.insurances.indexOf(item.id);
      // 有存在则删除
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        // 没有存在则加入数组中
        this.insurances.push(item.id);
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
        this.$store.dispatch("user/sendCaptcha",this.contactPhone)
        .then(code=>{
            // console.log(code,'订单验证码')
            // 弹框提示
        this.$alert(`验证码为${code}`, "提示", {
          confirmButtonText: "确定"
        });
        })
    },

    // 提交订单
    handleSubmit() {
    // 验证表单信息状态
        const rules = {
            users:{
                value:this.users[0].username&&this.users[0].id,
                message:'用户信息不能为空'
            },
            contactName:{
                value:this.contactName,
                message:'请输入联系人姓名'
            },
            contactPhone:{
                value:this.contactPhone,
                message:'请输入联系号码'
            },
            captcha:{
                value:this.captcha,
                message:'请输入验证码'
            }
        }
        let valid = true;
        // 循环判断验证是否通过
        Object.keys(rules).forEach(v=>{
            if(!valid) return;
            if(!rules[v]){
                valid=false;
                this.$message.warning(rules[v].message)
            }
        })
        if(!valid) return
    //   整理表单数据
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: false,
        seat_xid: this.seat_xid,
        air: this.air,
        captcha: this.captcha
      }
    //   console.log(data,'提交表单信息')
      this.$axios({
          url:'/airorders',
          method:"post",
          data,
        //   在请求头里传递token信息
          headers:{
            Authorization:`Bearer ${this.$store.state.user.userInfo.token||''}`
          }
      }).then(res=>{
          // console.log(res.data,'提交表单返回结果')
          const {message,data} = res.data
          this.$message.success(message)
        //   跳转到付款页面
          this.$router.push({
            path:'/air/pay',
            query:{
              id:data.id
            }
          })
      })
    }
  },
  computed:{
    sumPrice(){
      let price=0
      let length = this.users.length
      price += this.infoData.seat_infos.org_settle_price*length//机票单价
      price += this.insurances.length*30//保险费
      price += this.infoData.airport_tax_audlet*length//机建燃油费
      this.$store.commit('air/setSumPrice',price)
    }
  },
  // 发起航班信息数据请求
  mounted() {
    const { seat_xid, id } = this.$route.query;
    this.$axios({
      url: `/airs/`+id,
      params: {seat_xid}
    }).then(res => {
      this.infoData = res.data;
      console.log(this.infoData,'航班信息数据请求')
      this.$store.commit('air/setInfoData',this.infoData)
    });
  }
};
</script>

<style lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>