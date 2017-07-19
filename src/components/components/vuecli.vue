<template>
  <div class="mart-85">
      <span id="p3" draggable="true" :style="{left: offsetX + 'px', top: offsetY + 'px'}">拖拽我到任何地方</span>
      <!-- 目标区域 -->
      <div id="local"></div>
  </div>
</template>
<style lang="less">
.mart-85 {
    margin-top: 85px;
    span {
      width: 200px;
      height: 50px;
      line-height: 50px;
      background: red;
      color: #fff;
      text-align: center;
      display: block;
      position: absolute;
    }
    div {
      width: 300px;
      height: 300px;
      border: 1px solid #eee;
      float: right;
      position: relative;
    }
}
</style>
<script>
export default {
  data () {
    return {
      offsetX: 0,
      offsetY: 75
    }
  },
  mounted () {
      let this_ = this;

      //阻止默认行为，使得drop可以触发
      local.ondragover = e => e.preventDefault();

      local.ondragenter = e => {
          this_.offsetX= e.offsetX;
          this_.offsetY= e.offsetY;
      };
  }
}
</script>
