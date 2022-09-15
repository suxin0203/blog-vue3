<template>
  <div class="gotop">
    <a href="#"> ⬆ </a>
  </div>
  <div class="lbt">
    <div class="header" id="top" :class="{ header2: isActive }">
      <div class="nav-new">
        <div class="nav-new-l">
          <div class="logo">
            <img src="../assets/images/logo.png" alt="" />
          </div>
          <div class="nav-new-l-menu">
            <div class="nav-new-title" @click="gohome">
              <a href="http://162.14.73.22:7030/#/">首页</a>
            </div>
            <div class="nav-new-title">
              <a>
                <n-popselect
                  v-model:value="selectedCategory"
                  :options="categoryOptions"
                  trigger="click"
                  @update:value="searchCategory"
                >
                  <div>前端</div>
                </n-popselect>
              </a>
            </div>
            <div class="nav-new-title">
              <a>
                <n-popselect
                  v-model:value="selectedCategory"
                  :options="categoryOptions"
                  trigger="click"
                  @update:value="searchCategory"
                >
                  <div>后端</div>
                </n-popselect>
              </a>
            </div>

            <div class="nav-new-title" @click="dashboard">
              <a>后台</a>
            </div>
          </div>
        </div>
        <div class="nav-new-r">
          <div class="nav-new-r-search">
            <n-input-group>
              <n-input
                v-model:value="pageInfo.keyword"
                placeholder="请输入关键字"
                class="nav-new-r-search-input"
              />
              <n-button
                type="primary"
                ghost
                @click="loadBlogs(0)"
                class="nav-new-r-search-button"
              >
                搜索
              </n-button>
            </n-input-group>
          </div>
        </div>
      </div>
    </div>
    <div class="carousel1">
      <section>
        <n-carousel autoplay draggable>
          <img
            class="carousel-img"
            src="http://139.196.43.147/gallery/t012cde4a5058c156b7.jpg"
          />
          <img
            class="carousel-img"
            src="http://139.196.43.147/gallery/t01aaa82ef6d0f1ec87.jpg"
          />

          <img
            class="carousel-img"
            src="http://139.196.43.147/gallery/t01d6f5fd3610da0a08.jpg"
          />
        </n-carousel>
        <div class="title-h1">
          <h1>他日若遂凌云志 敢笑黄巢不丈夫</h1>
          <p class="title-h1-page">
            出自宋江——《水浒传》第三十九回：浔阳楼宋江吟反诗，梁山泊戴宗传假信
          </p>
        </div>
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
        <div class="wave wave4"></div>
      </section>
    </div>

    <div class="main">
      <n-divider />

      <!--头部↑-->
      <div class="main-body">
        <div class="main-body-l">
          <div
            v-for="blog in blogListInfo"
            :key="blog.id"

            class="main-body-l-item"
          >
            <n-card
              content-style="color: #888888"
              :title="blog.title"
              hoverable
              @click="toDetail(blog)"
              style="cursor: pointer"
            >
              {{ blog.content.replace(/<[^>]+>/g, "") }}
              <template #footer>
                <n-space align="center">
                  <div class="create-time">
                    ⏱{{ blog.create_time }} / 👍999点赞 / 👁999阅读
                  </div>
                </n-space>
              </template>
            </n-card>
          </div>
        </div>

        <div class="main-body-r">
          <div class="stk">
            <n-space vertical>
              <n-card hoverable>
                <div class="myavatar">
                  <n-avatar
                    round
                    :size="60"
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                  />
                  <p>也许，将会是最好用的简约博客</p>
                  <n-space>
                    <n-button type="primary" @click="dashboard">
                      登录
                    </n-button>
                    <n-button type="primary" @click="dashboard">
                      注册
                    </n-button>
                  </n-space>
                </div>
              </n-card>
              <n-card title="分类" hoverable>
                <n-space>
                  <n-tag
                    :bordered="false"
                    type="success"
                    v-for="categoryname in categoryOptions"
                  >
                    {{ categoryname.label }}
                  </n-tag>
                </n-space>
              </n-card>
              <n-card title="友链" hoverable>
                <n-space>
                  <a href="http://www.suxin23.cn/">
                    <n-button quaternary type="primary">
                      苏辛博客(原)
                    </n-button>
                  </a>
                  <a href="https://github.com/suxin0203">
                    <n-button quaternary type="primary">
                      GitHub-suxin
                    </n-button>
                  </a>

                  <a href="https://www.naiveui.com/">
                    <n-button quaternary type="primary"> Naive UI </n-button>
                  </a>
                  <a href="https://www.itbooks.work/">
                    <n-button quaternary type="primary"> 天界程序员 </n-button>
                  </a>
                </n-space>
              </n-card>
              <n-card title="📖 如何成功" embedded :bordered="false" hoverable>
                <n-space>
                  <n-tag :bordered="false" type="info" size="small">
                    教程 </n-tag
                  ><n-tag :bordered="false" type="info" size="small">
                    思维 </n-tag
                  ><n-tag :bordered="false" type="info" size="small">
                    联想
                  </n-tag>
                </n-space>

                如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有
                996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
              </n-card>
            </n-space>
          </div>
        </div>
      </div>

      <n-pagination
        @update:page="loadBlogs"
        v-model:page="pageInfo.page"
        :page-count="pageInfo.pageCount"
        class="fenye"
      />

      <!--分页组件-->
      <n-divider />
    </div>
    <div class="footer">
      <div class="footer-main">
        <div class="footer-main-l">
          <div class="footer-main-l-l">
            <a href="javascript:;">Suxin ·</a>
          </div>

          <div style="color: #888888">
            <p>© 2022 - 也许，将会是最好用的博客管理系统！</p>
            <p>Perhaps, it will be the best blog management system!</p>
          </div>
        </div>
        <div class="footer-main-r">川ICP备202208282355号-1</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, inject, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { GameControllerOutline, GameController } from "@vicons/ionicons5";

const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const router = useRouter();
const route = useRoute();

const selectedCategory = ref(0);
const categoryOptions = ref([]); //分类列表

const blogListInfo = ref([]);
const isActive = ref(false);

onMounted(() => {
  loadBlogs();
  loadCategorys();
});

const categoryName = computed(() => {
  let selectedOptins = categoryOptions.value.find((option) => {
    return option.value == selectedCategory.value;
  });
  return selectedOptins ? selectedOptins.label : "";
});

const loadCategorys = async () => {
  let res = await axios.get("/category/list");
  categoryOptions.value = res.data.rows.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

const gohome = () => {
  router.push("/"); //跳转到首页
};

const dashboard = () => {
  router.push("/login"); //跳转到登录页
};

const pageInfo = reactive({
  page: 1, //当前页码
  pageSize: 7, //每页显示条数
  pageCount: 0, //总页数
  count: 0, //总条数
  keyword: "", //搜索关键字
  categoryId: 0, //  分类id
});

const loadBlogs = async (page = 0) => {
  if (page !== 0) {
    pageInfo.page = page;
  }
  let res = await axios.get(
    `/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`
  );
  // console.log(res);
  let temp_rows = res.data.data.rows;
  for (let row of temp_rows) {
    row.content += "...";
    let d = new Date(row.create_time);
    row.create_time = `${d.getFullYear()}年${
      d.getMonth() + 1
    }月${d.getDate()}日`;
  }
  blogListInfo.value = temp_rows;
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount =
    parseInt(pageInfo.count / pageInfo.pageSize) +
    (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0);
}; //加载博客列表

const toDetail = (blog) => {
  router.push({ path: "/detail", query: { id: blog.id } });
}; //跳转到详情页

const searchCategory = (categoryId) => {
  pageInfo.categoryId = categoryId;
  loadBlogs();
}; //搜索分类

onMounted(() => {
  // 监听滚动条位置
  window.addEventListener("scroll", getScrollPosition, false);
});
const getScrollPosition = () => {
  // 滚动条距顶部距离
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  // 滚动条距左端距离
  // let left = document.documentElement.scrollLeft || document.body.scrollLeft;
  // console.log(top);
  if (top > 50) {
    isActive.value = true;
  } else {
    isActive.value = false;
  }
};
</script>

<style lang="less" scoped>
.gotop {
  position: fixed;
  right: 20px;
  bottom: 90px;
  z-index: 999;
  font-size: 24px;
  background-color: #36ad6a;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
}
.header2 {
  background-color: #fff;
  a {
    color: gray !important;
  }
}
.lbt {
  position: relative;
  width: 100%;
  height: 100%;
  background:linear-gradient(#ffffff 30%,#eee 40%);
}
.main {
  width: 1200px;
  margin: 0 auto;
  // background-color: pink;
  &-body {
    display: flex;
    justify-content: space-between;
    &-l {
      width: 74%;
      &-item:nth-child(n + 2){
        margin-top: 20px;
      }
    }
    &-r {
      width: 24%;

      // background-color: pink;
    }
  }
}
.carousel1 {
  margin-top: -80px;
}
.carousel-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.myavatar {
  width: 100%;
  height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stk {
  position: sticky;
  top: 100px;
}
.header {
  position: sticky;
  top: 0px;
  width: 100%;
  box-shadow: 0.5px 0.5px 5px #888888;
  z-index: 11;
}
.nav-new {
  height: 80px;
  width: 1200px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  &-title {
    position: relative;
  }
  &-title ::after {
    content: "";
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: #36ad6a;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
  &-title :hover {
    color: #36ad6a !important;
  }
  &-title :hover::after {
    opacity: 1;
  }
  &-l {
    height: 80px;
    flex: 1;
    display: flex;
    &-menu {
      width: 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      a {
        line-height: 70px;
        font-size: 18px;
        color: #fff;
      }
    }
  }

  .logo {
    height: 80px;
    display: flex;
    align-items: center;
    img {
      height: 40px;
      width: auto;
      background-color: gray;
      border-radius: 4px;
    }
  }

  &-r {
    // background-color: greenyellow;
    height: 80px;
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
    &-search {
      width: 70%;
      height: 80px;
      display: flex;
      align-items: center;
    }
  }
}

.footer {
  text-align: center;
  line-height: 25px;
  font-size: 16px;
  width: 100%;
  background-color: #fff;
  box-shadow: -1px -1px 10px #888888;
  &-main {
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    &-l {
      width: 60%;
      height: 90px;
      display: flex;
      align-items: center;

      & a:hover {
        color: #36ad6a;
      }
      &-l {
        border-right: 2px solid #e5e7eb;
        padding-right: 25px;
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 24px;
        margin-right: 25px;
      }
    }
  }
}

.create-time {
  font-size: 14px;
  color: gray;
}

section {
  position: relative;
  width: 100%;
  height: 500px;
  background: #3586ff;
  overflow: hidden;
}
.title-h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
section .wave {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: url("../assets/images/wave.png");
  background-size: 1000px 100px;
}

section .wave.wave1 {
  animation: animate1 20s linear infinite;
  z-index: 10;
  opacity: 1;
  animation-delay: 0s;
  bottom: 0;
}

section .wave.wave2 {
  animation: animate2 15s linear infinite;
  z-index: 9;
  opacity: 0.5;
  animation-delay: -5s;
  bottom: 10px;
}

section .wave.wave3 {
  animation: animate1 10s linear infinite;
  z-index: 8;
  opacity: 0.2;
  animation-delay: -7s;
  bottom: 15px;
}

section .wave.wave4 {
  animation: animate2 2s linear infinite;
  z-index: 7;
  opacity: 0.71;
  animation-delay: -5s;
  bottom: 20px;
}

@keyframes animate1 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}

@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1000px;
  }
}
.fenye {
    width: 74%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
@media screen and (max-width: 600px) {
  html,
  body {
    display: flex;
    width: 100vw;
  }
  .fenye {
    width: 95vw;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .lbt {
    width: 100vw;
  }
  .header {
    height: 120px;
    width: 100vw;
    background-color: #fff;
  }
  .nav-new {
    height: 120px;
    display: block;
    width: 100vw;
  }
  .nav-new-l {
    width: 100vw;
    height: 60px;
    &-menu {
      width: 250px;
      a {
        line-height: 70px;
        font-size: 18px;
        color: #888888;
      }
    }
  }
  .nav-new-l .logo {
    height: 60px;
    margin-left: 10px;
  }
  .nav-new-r {
    width: 100vw;
    height: 60px;

    &-search {
      width: 95vw;
      margin: 0 auto;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  .carousel1 {
    height: 500px;
  }

  .main {
    width: 100vw;

    // background-color: pink;
    &-body {
      display: block;
      &-l {
        width: 95vw;
        margin: 0 auto;
      }
      &-r {
        width: 95vw;
        margin: 0 auto;
        // background-color: pink;
      }
    }
  }

  .footer {
    width: 100%;

    &-main {
      height: auto;
      display: block;
      width: 100vw;

      &-l {
        width: 100vw;
        height: auto;
        display: bldock;

        & a:hover {
          color: #36ad6a;
        }
        &-l {
          display: none;
        }
      }
    }
  }
  .title-h1-page{
    display: none;
  }
}
</style>
