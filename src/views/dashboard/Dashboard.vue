<template>
  <div class="main-panel">
    <div class="menu">
      <n-anchor>
        <n-anchor-link
          v-for="(menu, index) in menus"
          :key="index"
          @click="toPage(menu)"
          :title="menu.name"
        >
        </n-anchor-link>
      </n-anchor>
    </div>
    <div class="content">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { reactive, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

const axios = inject("axios");
const message = inject("message");
const adminStore = AdminStore();

const router = useRouter();
const route = useRoute();

let menus = [
  { name: "文章管理", href: "/dashboard/article" },
  { name: "分类管理", href: "/dashboard/category" },
  { name: "退出", href: "logout" },
];

const toPage = (menu) => {
  if (menu.href == "logout") {
    router.push("/login");
    //清理token
    adminStore.token = "";
    message.info("退出成功");
  } else {
    router.push(menu.href);
  }
};
</script>

<style lang="less" scoped>
.main-panel {
  display: flex;
}
.menu {
  width: 200px;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;

  border-right: solid 1px gray;
  :deep(.n-anchor-link__title) {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
  }
}
.content {
  flex: 1;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

@media screen and (max-width: 600px) {
  .main-panel {
    display: block;
  }

  .menu {
    width: 100vw;
    height: 110px;
    padding: 10px;
    :deep(.n-anchor-link__title) {
      text-align: left;
      margin-top: 1px;
      font-size: 16px;
    }
  }

  .content {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
