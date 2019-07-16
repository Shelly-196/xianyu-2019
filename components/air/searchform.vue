<template>
  <div class="searchForm">
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
      <!-- tab栏主体部分 -->
      <el-form ref="airTabForm" :model="airTabForm" label-width="80px" class="airTabForm">
        <!-- 始发城市交换区域 -->
        <div class="interChangeC">
          <div class="changeIcon" @click="handleReverse">换</div>
        </div>
        <el-form-item label="出发城市">
          <!-- fetch-suggestions: 远程获取建议，输入框的值发生改变时候触发 -->
          <el-autocomplete
            @select="handleSelectDepartCity"
            :fetch-suggestions="queryDepartSearch"
            style="width:213px"
            v-model="airTabForm.departCity"
            placeholder="请输入出发城市"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="到达城市">
          <el-autocomplete
            @select="handleSelectDescCity"
            :fetch-suggestions="queryDescSearch"
            style="width:213px"
            v-model="airTabForm.destCity"
            placeholder="请输入到达城市"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-col :span="11" style="width:213px">
            <el-date-picker
              @change="handleChooseDate"
              type="date"
              placeholder="2019-04-30"
              v-model="airTabForm.departDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:213px" @click="handleSubmitForm">
            <i class="el-icon-search" style="display:inline-block;margin-right:6px"></i>搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
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
    //   tab栏切换
    handleTabChange(item, index) {
      if (index === 1) {
        this.$message.warning("目前仅app支持往返机票功能");
      }
    },
    // 搜索出发城市下拉提示，当input输入框的值变化时触发
    // value: 输入框的值
    // cb： 回调函数，这个回调函数是必须要要调用，
    // cb函数必须要接收一个数组，数组中每一项必须是对象, 对象中必须要有value属性
    queryDepartSearch(value, cb) {
      // 1.不输入则不出现下拉框
      if (!value) {
        cb([]);
        return;
      }
      // 2.请求下拉框内容
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res,'发起下拉框请求')
        // 推荐城市列表的数组
        const { data } = res.data;
        // 给这个下拉框中的数组赋值，以‘广州’的形式
        const selectArray = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        // 默认选中第一个
        this.airTabForm.departCity = selectArray[0].value;
        this.airTabForm.departCode = selectArray[0].sort;
        cb(selectArray);
      });
    },
    // 搜索到达城市下拉提示，当输入框的值变化时触发
    queryDescSearch(value, cb) {
      // 无输入时不出现下拉提示
      if (!value) {
        cb([]);
        return;
      }
      // 输入时发起下拉提示请求
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // 建议城市列表
        const { data } = res.data;
        // 给下拉框数组赋值
        const selectArray = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        cb(selectArray);
        // 默认选中第一个建议城市
        this.airTabForm.destCity = selectArray[0].value;
        this.airTabForm.destCode = selectArray[0].sort;
      });
    },
    // 选择出发城市列表值时触发
    handleSelectDepartCity(item) {
      this.airTabForm.departCity = item.value;
      this.airTabForm.departCode = item.sort;
    },
    // 选择到达城市列表值时触发
    handleSelectDescCity(item) {
      this.airTabForm.destCity = item.value;
      this.airTabForm.destCode = item.sort;
    },
    // 交换出发及到达城市
    handleReverse(){
      const {departCity,departCode,destCity,destCode} = this.airTabForm
      this.airTabForm.destCity = departCity;
      this.airTabForm.destCode = departCode;
      this.airTabForm.departCity = destCity;
      this.airTabForm.departCode = destCode;
    },
    // 处理返回的时间格式
    handleChooseDate(value){
        // console.log(value,'时间啊')
        this.airTabForm.departDate=moment(value).format('YYYY-MM-DD')
    },
    // 提交机票表单
    handleSubmitForm(){
        const rules={
            departCity:{value:this.airTabForm.departCity,message:'请选择出发城市'},
            destCity:{value:this.airTabForm.destCity,message:'请选择到达城市'},
            departDate:{value:this.airTabForm.departDate,message:'请选择到达城市'},
        }
        // 开关作用，验证是否通过
        let valid = true
        // Object.keys会返回一个对象属性的数组
        Object.keys(rules).forEach(v=>{
            // 只要valid验证不通过就返回
            if(!valid) return;
            // 如果valid通过了，则跳转到对应页面
            if(valid){
                this.$router.push({
                    path:'/air/flights',
                    query:this.airTabForm
                })
            }
            // 如果输入框为空，则提示
            // console.log(rules[v].value,'啦啦啦')
            if(!rules[v].value){
                valid=false
                this.$message.warning(rules[v].message)
            }
        })
    }
  }
};
</script>

<style lang="less">
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
  .airTabForm{ 
    position: relative;
    .interChangeC {
      position: absolute;
      top: 20px;
      right: 40px;
      width: 25px;
      height: 60px;
      border-top: 2px solid #ddd;
      border-bottom: 2px solid #ddd;
      border-right: 1px solid #ddd;
      .changeIcon {
        cursor: pointer;
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
</style>

