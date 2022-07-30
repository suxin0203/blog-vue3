<template>
  <div class="main">
    <n-button @click="goback">返回</n-button>
    <n-h1> {{ blogInfo.title }}</n-h1>
    <div class="blog-centent">
      <div v-html="blogInfo.content"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, inject, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const axios = inject("axios");
const router = useRouter();
const route = useRoute();
const blogInfo = ref({});

onMounted(() => {
  loadBlog();
});

const loadBlog = async () => {
  let res = await axios.get(`/blog/detail?id=${route.query.id}`);
  blogInfo.value = res.data.rows[0];

  //   console.log(route.query.id);
};

const goback=()=>{
    router.push("/")
}


</script>

<style>
:deep(.blog-centent img) {
  max-width: 100% !important;
}
</style>

<style lang="less" scoped>
.main {
  width: 1200px;
  margin: 0 auto;
}
</style>
