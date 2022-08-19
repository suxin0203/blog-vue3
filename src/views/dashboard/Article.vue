<template>
  <n-card title="文章管理">
    <n-tabs v-model:value="tabValue" justify-content="start" type="line">
      <n-tab-pane name="list" tab="文章列表">
        <div
          v-for="blog in blogListInfo"
          :key="blog.id"
          style="margin-bottom: 20px"
        >
          <n-card :title="blog.title" hoverable>
            {{ blog.content }}
            <template #footer>
              <n-space align="center">
                <div style="font-size: 14px">
                  发布时间：{{ blog.create_time }}
                </div>
                <n-button ghost @click="toUpdate(blog)"> 修改 </n-button>
                <n-button ghost @click="toDelete(blog)"> 删除 </n-button>
              </n-space>
            </template>
          </n-card>
        </div>

        <n-space>
          <div v-for="pageNum in pageInfo.pageCount" @click="toPage(pageNum)">
            <n-button
              ghost
              :type="pageNum == pageInfo.page ? 'info' : 'default'"
            >
              {{ pageNum }}
            </n-button>
          </div>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="add" tab="添加文章">
        <n-form>
          <n-form-item label="标题">
            <n-input
              v-model:value="addArticle.title"
              placeholder="请输入标题"
            />
          </n-form-item>
          <n-form-item label="分类">
            <n-select
              v-model:value="addArticle.categoryId"
              :options="categoryOptions"
            />
          </n-form-item>
          <n-form-item label="内容">
            <rich-text-editor v-model="addArticle.content"></rich-text-editor>
          </n-form-item>

          <n-button tertiary type="info" @click="add"> 添加文章 </n-button>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="update" tab="修改文章">
        <n-form>
          <n-form-item label="标题">
            <n-input
              v-model:value="updateArticle.title"
              placeholder="请输入标题"
            />
          </n-form-item>
          <n-form-item label="ID">
            <n-input-number
            style="width: 100%;"
              v-model:value="updateArticle.id"
              :show-button="false"
              placeholder="请输入id"
            />
          </n-form-item>
          <n-form-item label="分类">
            <n-select
              v-model:value="updateArticle.categoryId"
              :options="categoryOptions"
            />
          </n-form-item>
          <n-form-item label="内容">
            <rich-text-editor
              v-model="updateArticle.content"
            ></rich-text-editor>
          </n-form-item>

          <n-button tertiary type="info" @click="update"> 修改文章 </n-button>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { reactive, ref, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import RichTextEditor from "../../components/RichTextEditor.vue";

const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const adminStore = AdminStore();

const router = useRouter();
const route = useRoute();

const addArticle = reactive({
  categoryId: 0,
  title: "",
  content: "",
});

const updateArticle = reactive({
  id: 0,
  categoryId: 0,
  title: "",
  content: "",
});

const categoryOptions = ref([]);
const blogListInfo = ref([]);
const tabValue = ref("list");

const pageInfo = reactive({
  page: 1,
  pageSize: 3,
  pageCount: 0,
  count: 0,
});

const loadBlogs = async () => {
  let res = await axios.get(
    `/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`
  );
  let temp_rows = res.data.data.rows;
  for (let row of temp_rows) {
    row.content += "...";
    let d = new Date(row.create_time);
    row.create_time = `${d.getFullYear()}年${
      d.getMonth() + 1
    }月${d.getDate()}日`;
  }
  blogListInfo.value = temp_rows;
  console.log(blogListInfo.value[0].id);
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount =
    parseInt(pageInfo.count / pageInfo.pageSize) +
    (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0);
  //   console.log(res);
};

const loadCategorys = async () => {
  let res = await axios.get("/category/list");
  categoryOptions.value = res.data.rows.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  addArticle.categoryId = categoryOptions.value[0].value;
  updateArticle.categoryId = categoryOptions.value[0].value;
  console.log(categoryOptions.value);
};

onMounted(() => {
  loadBlogs();
  loadCategorys();
});

const add = async () => {
  let res = await axios.post("/blog/_token/add", addArticle);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    //提交成功后置空输入框
    addArticle.title = "";
    addArticle.content = "";
  } else {
    message.error(res.data.msg);
  }
};

const toPage = async (pageNum) => {
  pageInfo.page = pageNum;
  loadBlogs();
};

const toUpdate = async (blog) => {
  let res = await axios.get(`/blog/detail?id=${blog.id}`);
  let { id, title, content, category_id } = res.data.rows[0];
  updateArticle.id = id;
  updateArticle.title = title;
  updateArticle.content = content;
  updateArticle.categoryId = category_id;
  tabValue.value = "update";
  // console.log(updateArticle);
};

const update = async () => {
  // console.log(updateArticle);
  //   let res1 = await axios.get(
  //   `/blog/search?keyword=${updateArticle.id}`
  // );
  // console.log(res1.data.data.rows);

  let res = await axios.put("/blog/_token/update", updateArticle);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    loadBlogs();
    tabValue.value = "list";
    console.log(res);
  } else {
    message.error(res.data.msg);
  }
};

const toDelete = async (blog) => {
  let res = await axios.delete(`/blog/_token/delete?id=${blog.id}`);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    loadBlogs();
  } else {
    message.error(res.data.msg);
  }
};
</script>

<style lang="less" scoped></style>
