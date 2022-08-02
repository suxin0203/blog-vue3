<template>
  <div class="main">
    <div class="nav">
      <div @click="gohome">首页</div>
      <div>
        <n-popselect
          v-model:value="selectedCategory"
          :options="categoryOptions"
          trigger="click"
          @update:value="searchCategory"
        >
          <div>
            分类<span style="font-size: 12px">{{ categoryName }}</span>
          </div>
        </n-popselect>
      </div>
      <div @click="dashboard">后台</div>
    </div>
    <n-divider />
    <div class="search">
    <n-space style="margin-bottom: 20px" >
      <n-input
        v-model:value="pageInfo.keyword"
        placeholder="请输入关键字"
        class="search-input"
      />
      <n-button type="primary" ghost @click="loadBlogs(0)"  class="search-button">搜索</n-button>
    </n-space>
    </div>

    <div
      v-for="blog in blogListInfo"
      :key="blog.id"
      style="margin-bottom: 20px"
    >
      <n-card
        :title="blog.title"
        hoverable
        @click="toDetail(blog)"
        style="cursor: pointer"
      >
        {{ blog.content }}
        <template #footer>
          <n-space align="center">
            <div  class="create-time" >发布时间：{{ blog.create_time }}</div>
          </n-space>
        </template>
      </n-card>
    </div>
    <n-pagination
      @update:page="loadBlogs"
      v-model:page="pageInfo.page"
      :page-count="pageInfo.pageCount"
    />
    <n-divider />
    <div class="footer">
      <div>Power by suxin</div>
      <div>IC备xxxxxxx号-1</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, inject, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const router = useRouter();
const route = useRoute();

const selectedCategory = ref(0);
const categoryOptions = ref([]);
const blogListInfo = ref([]);

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
  router.push("/");
};

const dashboard = () => {
  router.push("/login");
};

const pageInfo = reactive({
  page: 1,
  pageSize: 3,
  pageCount: 0,
  count: 0,
  keyword: "",
  categoryId: 0,
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
};

const toDetail = (blog) => {
  router.push({ path: "/detail", query: { id: blog.id } });
};

const searchCategory = (categoryId) => {
  pageInfo.categoryId = categoryId;
  loadBlogs();
};
</script>

<style lang="less" scoped>
.main {
  width: 1200px;
  margin: 0 auto;
}
.nav {
  display: flex;
  font-size: 20px;
  padding-top: 20px;
  color: #64676a;
  div {
    cursor: pointer;
    margin-right: 20px;
  }
  & div:hover {
    color: orange;
  }
}
.footer {
  text-align: center;
  line-height: 25px;
  font-size: 16px;
}

.search-input {
  width: 500px;
}

.create-time{
  font-size: 14px;
  color: gray;
}

@media screen and (max-width: 600px) {
  .main {
    width: 95vw;
    margin: 0 auto;
  }

  .search {
    width: 95vh;
    &-input {
      width: 75vw;
    }
    // &-button{
    //   width: 15vw;
    // }
  }
}
</style>
