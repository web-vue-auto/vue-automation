<template>
  <div id="index">
    <!-- 管理内容区 -->
    <div class="route_content">
        <!-- 更新视图 -->
        <router-view></router-view>
    </div>
  </div>
</template>
<style lang="less" scoped>
#index {
  margin-top: 85px;
  .route_content {
    padding: 0px 20px 20px 20px;
  }
}
</style>
