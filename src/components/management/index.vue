<template>
<div class="clearfix">
<Row type="flex">
<i-col span="4">
<!-- 导航 -->
	 <Permissbutton @showlog="returnresult" >
		<!-- 1 -->
		<el-menu default-active="1" class="el-menu-vertical-demo" unique-opened router v-if="adminShow.user">
			<el-submenu index="1">
				<template slot="title"><i class="el-icon-message"></i>用户中心</template>
				<el-menu-item index="user">权限配置</el-menu-item>
			</el-submenu>
		</el-menu>
		<!-- 2 -->
		<!-- <el-menu default-active="2" class="el-menu-vertical-demo" router unique-opened :default-active="onRoutes" v-if="adminShow.resouce_list">
			<el-submenu index="2">
				<template slot="title"><i class="el-icon-date"></i>resouce</template>
				<el-menu-item index="resouce_list">resouce编辑</el-menu-item>
			</el-submenu>
		</el-menu> -->
		<el-menu default-active="3" class="el-menu-vertical-demo" router>
			<el-submenu index="3">
				<template slot="title"><i class="el-icon-setting"></i>投票管理</template>
				<el-menu-item index="task">投票</el-menu-item>
				<el-menu-item index="taskSend" v-if="adminShow.user">发起投票</el-menu-item>
			</el-submenu>
		</el-menu>
		<!-- <el-menu default-active="4" class="el-menu-vertical-demo" router>
			<el-submenu index="4">
				<template slot="title"><i class="el-icon-date"></i>Components上传</template>
				<el-menu-item index="components">资源列表</el-menu-item>
			</el-submenu>
		</el-menu> -->
		<!-- 3 -->
		<el-menu default-active="5" class="el-menu-vertical-demo" router v-if="adminShow.messagetable">
			<el-submenu index="5">
				<template slot="title"><i class="el-icon-message"></i>Vue原创</template>
				<el-menu-item index="messagetable">文章列表</el-menu-item>
			</el-submenu>
		</el-menu>
		<el-menu default-active="6" class="el-menu-vertical-demo" router>
			<el-submenu index="6">
				<template slot="title"><i class="el-icon-menu"></i>发布任务</template>
				<el-menu-item index="taskannouncement">任务</el-menu-item>
			</el-submenu>
		</el-menu>
	</Permissbutton>
</i-col>
<!-- 侧栏 -->
<i-col span="20">
	<router-view></router-view>
</i-col>
</Row>
</div>
</template>
<script>
// 权限标签
import Permissbutton from "./common/Permissbutton";
    export default {
    		name:"userIndex",
    	    data () {
    	    		return {
    	    			adminShow : {}
    	    		}
    	    },
    	    components:{
    	    		Permissbutton
    	    },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods:{
        	clear () {
        		this.adminShow = false
    			this.vueShow = false
    			this.resouceShow = false
        	},
        	returnresult (val) {
        		if (typeof(val) === 'string') {
        			this.$set(this.adminShow,val,true);
        		}else{
        			this.adminShow = val;
        		}
        	}
        }
    }
</script>
