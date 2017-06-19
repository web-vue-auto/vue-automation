import Vuex from 'vuex'
import Vue from 'vue'
// 资源列表页
import resouceList from './components/resouse/resouceList/resouce_list_state'

import loginState from './components/index/loginState'

// ztree

import tree_store from './utils/tree_store'
// 引用
Vue.use(Vuex)
//调用
const store = new Vuex.Store({
	modules: {
		resouceList,
		loginState,
		tree_store
	}
})

export default store 
