<template>
  <router-view></router-view>
</template>

<script setup></script>

<style scoped>
  

  :deep(.editor-content-view) {
  border: 3px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-top: 20px;
  overflow-x: auto;
}
:deep(p,  li) {
  white-space: pre-wrap; /* 保留空格 */
}
:deep(blockquote) {
  border-left: 8px solid #d0e5f2;
  padding: 10px 10px;
  margin: 10px 0;
  background-color: #f1f1f1;
}
:deep(code) {
  font-family: monospace;
  background-color: #eee;
  padding: 3px;
  border-radius: 3px;
}
:deep(pre > code) {
  display: block;
  padding: 10px;
}
:deep(table) {
  border-collapse: collapse;
}
:deep(td, th) {
  border: 1px solid #ccc;
  min-width: 50px;
  height: 20px;
}
:deep(th) {
  background-color: #f1f1f1;
}
:deep( ul,  ol) {
  padding-left: 20px;
}
:deep(input[type="checkbox"]) {
  margin-right: 5px;
}



</style>
