<template>
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
</template>

<script setup>

</script>

<style lang="less" scoped>

</style>