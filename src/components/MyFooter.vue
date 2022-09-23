<template>
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
        <div class="footer-main-r">蜀ICP备2022022751号-1</div>
      </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.footer {
  text-align: center;
  font-size: 14px;
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
    line-height: 1.2;
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



@media screen and (max-width: 600px) {

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
        display: flex;
        justify-content: center;

        & a:hover {
          color: #36ad6a;
        }
        &-l {
          display: none;
        }
      }
    }
  }
}


</style>