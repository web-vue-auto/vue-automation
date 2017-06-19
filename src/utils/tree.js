/**
 * auther：马群
 * QQ：2381930754
 */
import zTree from "../assets/js/jquery.ztree.all.js";
export default {
	deep: true,
	bind: function (el, binding) {
	// 准备工作
	// 例如，添加事件处理器或只需要运行一次的高耗任务
	},
	update: function (el,data) {
	// 值更新时的工作
	// 也会以初始值为参数调用一次
	// 初始化定义设置
	var this_ = data.value.vue._self;
		var setting = {
			view: {
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
				selectedMulti: false
			},
			edit: {
				enable: true
			},
			check: {
				enable: data.value.show
			},
			data: {
				simpleData: {
					enable: true,
					pIdKey: "pid"
				}
			},
			callback: {
				onCheck: onCheck,
				beforeRemove: beforeRemove,
				onRename: onRename
			}
		};
		// 用于当鼠标移动到节点上时，显示用户自定义控件，显示隐藏状态同 zTree 内部的编辑、删除按钮
		var newCount = 1;
		function addHoverDom(treeId, treeNode) {

			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				// obj内存放原生dom节点
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
				// 此处添加需抛值
				this_.$store.commit('addtree',treeNode.id);
				return false;
			});
		};
		// 删除节点回调
		function beforeRemove(treeId, treeNode) {
			// 此处添加需删除值
			this_.$store.commit('deltree',treeNode.id);
			return;
		}
		// 编辑名字回调
		function onRename(e, treeId, treeNode, isCancel) {
			if (treeNode.pId) {
				this_.$store.commit('uptree',treeNode.pId+"-"+treeNode.id+"-"+treeNode.name);
			}else{
				this_.$store.commit('uptree',treeNode.id+"-"+treeNode.id+"-"+treeNode.name);
			}
			return;
		}
		// 用于当鼠标移动到节点上时，显示用户自定义控件，隐藏状态同 zTree 内部的编辑、删除按钮
		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		};
		// 统计
		function onCheck(e, treeId, treeNode) {
			this_.$store.commit('treement',treeNode.value);
		}
		$.fn.zTree.init($(el), setting, data.value.data);
	},
	unbind: function () {
	// 清理工作
	// 例如，删除 bind() 添加的事件监听器
	}
}