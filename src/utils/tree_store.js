export default {
	state:{
		treenode: [],
		add:[],
		dele:[],
		update:[]
	},
	getters:{
		treenode: (state) => {
			return state.treenode;
		},
		add: (state) => {
			return state.add;
		},
		dele: (state) => {
			return state.dele;
		},
		update: (state) => {
			return state.update;
		}
	},
	mutations:{
		treement (state,code) {
			// 删除数组通用方法
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
				this.splice(index, 1);
				}
			};
			// 过滤更新vuex中state的变化
			if (state.treenode.includes(code)) {
				state.treenode.remove(code);
			}else{
				state.treenode.push(code);
			}	
		},
		addtree (state,code) {
			// 过滤更新vuex中state的变化
			state.add.push(code);
		},
		deltree (state,code) {
			// 过滤更新vuex中state的变化
			state.dele.push(code);
		},
		uptree (state,code) {
			// 过滤更新vuex中state的变化
			state.update.push(code);
		}
	}
}