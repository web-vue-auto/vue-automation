<template>
  <div class="mart-85">
    <child></child>
  </div>
</template>
<style lang="less">
.mart-85 {
    margin-top: 85px;
}
</style>
<script>
import Vue from 'vue';
Vue.component('child', {
  render (creatElement) {
  	return creatElement(
  		this.$slots.default
  	)
  }
})
export default {
	data () {
		return {
			message: 'hello'
		}
	}
}
</script>
