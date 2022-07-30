<template>
  <div>
    <n-button strong secondary type="info" @click="showAddModal = true" style="margin: 10px  0px;">
      添加分类
    </n-button>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categoryList" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <n-space>
              <n-button tertiary type="info" @click="toUpdate(category)">
                修改
              </n-button>
              <n-button tertiary type="error" @click="deleteCategory(category)">
                删除
              </n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-modal v-model:show="showAddModal" preset="dialog" title="Dialog">
      <template #header>
        <div>添加分类</div>
      </template>
      <div>
        <n-input
          v-model:value="addCategory.name"
          placeholder="请输入分类名称"
        />
      </div>
      <template #action>
        <div>
          <n-button tertiary type="info" @click="add"> 提交 </n-button>
        </div>
      </template>
    </n-modal>
    <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
      <template #header>
        <div>修改分类</div>
      </template>
      <div>
        <n-input
          v-model:value="updateCategory.name"
          placeholder="请输入新的分类名称"
        />
      </div>
      <template #action>
        <div>
          <n-button tertiary type="info" @click="update"> 提交 </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { reactive, ref, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const adminStore = AdminStore();

const router = useRouter();
const route = useRoute();

const categoryList = ref([]);
const showAddModal = ref(false);
const showUpdateModal = ref(false);

const addCategory = reactive({
  name: "",
});
const updateCategory = reactive({
  id: 0,
  name: "",
});
onMounted(() => {
  loadDatas();
});

const loadDatas = async () => {
  let res = await axios.get("/category/list");
  categoryList.value = res.data.rows;
};

const add = async () => {
  let res = await axios.post(
    "/category/_token/add",
    { name: addCategory.name },
  );
  if (res.data.code == 200) {
    loadDatas();
    message.info(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
  showAddModal.value = false;
};


const toUpdate = (category)=>{
    showUpdateModal.value = true
    updateCategory.id = category.id
    updateCategory.name = category.name
}

const update = async () => {
  let res = await axios.put(
    "/category/_token/update",
    { id:updateCategory.id,name: updateCategory.name },
    { headers: { token: adminStore.token } }
  );
  if (res.data.code == 200) {
    loadDatas();
    message.info(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
  showUpdateModal.value = false;
};

const deleteCategory = async (category) => {
  dialog.warning({
    title: "警告",
    content: "是否删除该分类？",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      let res = await axios.delete(`/category/_token/delete?id=${category.id}`);
      if (res.data.code == 200) {
        message.info(res.data.msg);
        loadDatas();
      } else {
        message.error(res.data.msg);
      }
    },
    onNegativeClick: () => {
      //   message.error("不确定");
    },
  });
};



</script>

<style lang="less" scoped></style>
