<template>
  <div class="main-panel">
    <div class="menu">
      <n-space vertical>
        <!-- <n-switch v-model:value="collapsed" /> -->
        <n-layout has-sider>
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
          >
            <n-menu
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              :render-label="renderMenuLabel"
              :render-icon="renderMenuIcon"
              :expand-icon="expandIcon"
            />
          </n-layout-sider>
          <n-layout>
            <div id="maincontent">
              <n-card title="用户" size="small">
                <div class="usermain">
                  <div>
                    <n-avatar
                      round
                      src="https://avatars.githubusercontent.com/u/25154432?s=400&u=3b0c0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b&v=4"
                      size="large"
                    />
                    <span style="margin-left: 10px">{{adminStore.account}}</span>
                  </div>
                  <div>
                    <n-icon size="40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
                        />
                      </svg>
                    </n-icon>
                    <n-divider vertical />
                    <n-button
                      strong
                      secondary
                      round
                      type="error"
                      @click="router.push('/login')"
                    >
                      登出
                    </n-button>
                  </div>
                </div>
              </n-card>
              <n-divider />
              <div class="content">
                <router-view> </router-view>
              </div>
            </div>
          </n-layout>
        </n-layout>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { reactive, ref, inject ,h, defineComponent, createRenderer } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { NIcon } from 'naive-ui'

const axios = inject("axios");
const message = inject("message");
const adminStore = AdminStore();

const router = useRouter();
const route = useRoute();

const collapsed = ref(true);

let menus = [
  { name: "文章管理", href: "/dashboard/article" },
  { name: "分类管理", href: "/dashboard/category" },
  { name: "退出", href: "logout" },
];

const menuOptions = [
  {
    label: "文章管理",
    key: "hear-the-wind-sing",
    href: "#/dashboard/article",
  },
  {
    label: "分类管理",
    key: "pinball-1973",
    href: "#/dashboard/category",
  },
  {
    label: "管理员操作",
    key: "a-wild-sheep-chase",
    disabled: true,
  },
  {
    label: "用户操作",
    key: "dance-dance-dance",
    children: [
      {
        label: "修改信息",
        key: "narrator",
        disabled:true
      },
      {
        label: "退出登录",
        key: "sheep-man",
        // href: "logout",
      },
    ],
  },
];

const renderMenuLabel = (option) => {
        if ("href" in option) {
          return h(
            "a",
            { href: option.href, target: "_Self" },
            option.label
          );
        }
        return option.label;
      };
const renderMenuIcon = (option) => {
        if (option.key === "sheep-man")
          return true;
        if (option.key === "food")
          return null;
        return h(NIcon, null, { default: () => h(BookmarkOutline) });
      };
const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
};


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
  height: 100vh;
  width: 100vw;
  background-color: aliceblue;
}
.menu {
  // width: 200px;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;

  border-right: solid 1px gray;
  :deep(.n-anchor-link__title) {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
  }
}
#maincontent {
  flex: 1;
  padding: 20px;
  height: 100vh;
  overflow: auto;
  .usermain {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 18px;
      font-weight: 900;
    }
    div {
      display: flex;
      align-items: center;
    }
  }
}
.content {
  flex: 1;
  // height: 100vh;

  box-sizing: border-box;
}

@media screen and (max-width: 600px) {
  .main-panel {
    display: block;
  }

  // .menu {
  //   width: 100vw;
  //   height: 110px;
  //   padding: 10px;
  //   :deep(.n-anchor-link__title) {
  //     text-align: left;
  //     margin-top: 1px;
  //     font-size: 16px;
  //   }
  // }

  .content {
    // padding: 10px;
    box-sizing: border-box;
  }
}
</style>
