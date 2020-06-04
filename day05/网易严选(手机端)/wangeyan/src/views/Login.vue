<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phoneNum"
        name="phoneNum"
        label="手机号"
        placeholder="输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      phoneNum: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      axios
        //.post("/api/login", { ...values })
        .post("/api/register", { ...values })
        .then(value => {
          if (value.data.code === 200) {
            console.log("请求成功", value.data.msg);
          } else {
            console.log("注册响应", value.data);
          }
        })
        .catch(err => {
          console.log("请求失败", "err");
        });
    }
  }
};
</script>

<style lang="css" scoped>
</style>