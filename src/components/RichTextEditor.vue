<template>
  <div>
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  reactive,
  inject,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const server_url = inject("server_url");

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
//屏蔽上传视频
const toolbarConfig = {excludeKeys:["uploadVideo"]};
const mode = ref("default");
const editorConfig = { placeholder: "请输入内容..." };
editorConfig.MENU_CONF = {};
//图片上传地址
editorConfig.MENU_CONF["uploadImage"] = {
  // 小于该值就插入 base64 格式（而不上传），默认为 0
  base64LimitSize: 10 * 1024, // 5kb
  server: server_url + "upload/rich_editor_upload",
};

editorConfig.MENU_CONF["insertImage"] = {
  parseImageSrc: (src) => {
    if(src.indexOf("http") !== 0){
        return `${server_url}${src}`
    }
    return src
  }, // 也支持 async 函数
};

// 内容 HTML
const valueHtml = ref("");
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
let initFinished = false;
const emit = defineEmits(["update:model-value"]);

onMounted(() => {
  setTimeout(() => {
    valueHtml.value = props.modelValue;
    initFinished = true;
  }, 10);
});

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
  //   console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
  //   console.log("change:", editor.getHtml());

  if (initFinished) {
    emit("update:model-value", valueHtml.value);
  }
};
</script>

<style lang="less" scoped></style>
