<template>
  <div class="login-pane">
    <n-card title="管理员登录">
      <n-form :model="admin" :rules="rules">
        <n-form-item label="账号" path="account">
          <n-input v-model:value="admin.account" placeholder="请输入账号" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="admin.password"
            placeholder="请输入密码"
            type="password"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-checkbox v-model:checked="admin.rember" label="记住我" />
        <n-button type="primary" block secondary strong @click="login" style="margin-top: 10px;"> 登录 </n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { reactive, ref, inject } from "vue";
import { AdminStore } from "../stores/AdminStore";
import { useRoute, useRouter } from "vue-router";

const axios = inject("axios");
const message = inject("message");
const adminStore = AdminStore();

const router = useRouter();
const route = useRoute();

let rules = {
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
  ],
};
const admin = reactive({
  account: localStorage.getItem("account") || "",
  password: localStorage.getItem("password") || "",
  rember: localStorage.getItem("rember") == 1 || false,
});

const login = async () => {
  let result = await axios.post("/admin/login", {
    account: admin.account,
    password: admin.password,
  });
  if (result.data.code == 200) {
    adminStore.token = result.data.data.token;
    adminStore.account = result.data.data.account;
    adminStore.id = result.data.data.id;

    if (admin.rember) {
      localStorage.setItem("account", admin.account);
      localStorage.setItem("password", admin.password);
      localStorage.setItem("rember", admin.rember ? 1 : 0);
    } else {
      localStorage.setItem("account", "");
      localStorage.setItem("password", "");
      localStorage.setItem("rember", 0);
    }
    router.push("/dashboard");
    message.info("登陆成功");
  } else {
    message.error("登录失败");
  }
  // console.log(result);
};
</script>

<style lang="less" scoped>
.login-pane {
  width: 400px;
  margin: 0 auto;
  margin-top: 130px;
}
</style>
