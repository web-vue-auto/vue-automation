<template>
	<div class="userbody">
	    <!-- 权限 -->		
		<div class="slider">			
			<!-- 树 -->
			<div v-tree="{data:zNodes,show:showCheck,vue: this}" class="ztree" id="treeDemo"></div>
			<div class="activeBtn" v-if="hideCheck">			
				<Button type="ghost" size="small" class="pull-right borderNone" style="margin:0 4px;" @click="cancelTree">取消</Button>
				<Button type="success" size="small" class="pull-right borderNone" @click="saveTree">保存</Button>
			</div>
		</div>
	    <div class="w80">  
		<div class="searchmenus">
			<Input v-model="searchInput"  class="searchInput borderNone" placeholder="请输入用户名"></Input>
			<Button type="primary" icon="ios-search" class="borderNone" @click="searchuser">搜索</Button>		
		</div>
		<div class="content">
		  <Table border :columns="columns4" :data="tableData" :highlight-row="true"></Table>
		</div>			
		</div>
		<!-- 分页 -->	
		<div class="text-center clearfix mar10">			  
		    <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
		</div>
		<div class="text-center" v-if="showCheck">
			<Button type="success"  class="mar20 borderNone" @click="save">保存</Button>
			<Button type="primary"  class="mar20 borderNone" @click="cancal">取消</Button>
		</div>
	</div>
</template>
<style>
@import "../../assets/css/zTreeStyle.css";
	label{font-weight: 300!important}
	.userbody{margin: 17px;}
	.bgcolorBtn{background: #00cc66}
	.userbody .clearfix{clear:both;}
	.userbody .mar10{margin-top:10px;}
	.userbody .mar20{margin-top:20px;}
	.userbody .w80{width: 80%;float: left;}
	.userbody .text-center{text-align: center;}
	.userbody .slider{
		border:1px solid #e3e8ee;
		min-height: 260px;
		width: 195px;
		float: left;
		margin-top: 42px;
		position: relative;
	}
	.userbody .slider .activeBtn{
		height: 30px;
		padding:8px 10px 10px 0;
		position: absolute;
	    bottom: 10px;
	    right: 40px;
	}
	.userbody .content{
		width: 100%;
		float: left;
		padding: 10px;
	}
	.userbody .searchmenus .searchInput{
		width: 500px;
		margin-left: 5px;
	}
	.userbody .searchmenus {
		text-align: center;
	}
</style>
<script>
import tree from "../../utils/tree.js"
export default {
	name:'user',
   	data () {
        return {
    		showCheck:false,
    		hideCheck:true,
    		total:1,//页面条数
			current:1,//当前页
    		searchInput:'',//搜索条件
       		columns4: [
                {
                    title: '姓名',
                    align:'center',
                    width:120,
                    key: 'id'
                },
                {
                    title: '权限',
                    align:'center',
                    key: 'permissions'
                },
                {
                    title: '操作',
                    key: 'action',
                    align:'center',
                    width:150,  
                    render: (h,params) =>{
                        return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {                       
                                            this.checkbtn(params.row)
                                        }
                                    }
                                }, '编辑'),
                        
                        ]);                      
                    /*render (row, column, index) {
                        return `<i-button type="primary" class="borderNone" size="small" @click="checkbtn(${index})">编辑</i-button>`;
                    }*/
                }
            }
            ],
	        tableData: [ ],
	        multipleSelection: [],
	        zNodes:[],
	        choosearr:"" //选择表格复选框的token值
	    }
	    },
	    directives:{
	    		tree
	    },
    methods:{
    	checkbtn(row){//选择table
    		// 清空数组
    		if (this.showCheck) this.choosearr = "";
    		else this.choosearr = row.token;
    		// 控制编辑树的显隐
    		this.showCheck = !this.showCheck;
    		this.hideCheck = !this.hideCheck;
    	},
    	readytree(){//权限树
          	this.$http.post("/api/groupTypeAll").then((response)=>{
				response.data.forEach((item)=>{
					item['name'] = item.value;
				})
				// 改变数据并且更新视图
				this.$set(this.$data, 'zNodes', response.data)
        	})
        },
        saveTree(){//保存对树的操作
        	let self = this;
        	let dele = this.$store.state.tree_store.dele.join();
        	let update = this.$store.state.tree_store.update.join();
        	console.log(dele);
        	console.log(update);
        	if(update != ""){
        		this.$http.post("/api/groupTypeUpdate",{'update':update}).then((response)=>{					
					this.$Modal.success({
						title: "提示",
						content:response.data.data,
						onOk: () => {   				
			   				self.readytree();  			
			   				}
	                });
				})
        	}else if(dele != ""){
        		this.$http.post("/api/groupTypeDelete",{'delete':dele}).then((response)=>{
					this.$Modal.success({
						title: "提示",
						content:response.data.data,
						onOk: () => {   				
			   				self.readytree();  			
			   				}
	                });
				})
        	}

        },
        cancelTree(){//取消树的操作
        	this.readytree();
        },
      	readyuser(currents){
      		//用户列表页  
       		let searchInput = this.searchInput;		
       		this.$http.post("/api/getUser",{"current":currents,"username":searchInput}).then((response)=>{
	            let _data = response.data;
	            this.tableData = _data.data; 
	            this.total = _data.total;
        	})
       	},
	    changePage (num) {
	    	//分页
            this.current = num;
            this.readyuser();
        },       
      	searchuser(){
      		//查询
      		let currents = this.current;
      		let searchInput = this.searchInput;
      		this.$http.post("/api/getUser",{"current":currents,"username":searchInput}).then((response)=>{
		            let _data = response.data;
		            this.tableData = _data.data;  
		            this.total = _data.total;
	        	})      		
      	},
       	save(){//保存
       		// 保存所需入参
       		let selectId = this.choosearr;
       		let treeId = this.$store.state.tree_store.treenode.join();
       		this.$http.post("/api/saveUser",{"token":selectId,"type":treeId}).then((response)=>{
       			this.$Modal.success({
				title: "提示",
				content:response.data.data,
				onOk: () => {   				
	   					//清除选中       			
	   					let arr = this.tableData;
	   					arr.forEach(function(value, index, array) {
							 value._checked = false;
						})	
	   					// 刷新列表
						this.readyuser(1);	
						//隐藏保存取消按钮
						this.showCheck = false;
						this.hideCheck = !this.hideCheck; 
					}
                });
	        })  	      		
       	},
       	cancal(){// 取消       		
       		//隐藏保存取消按钮
			this.showCheck = !this.showCheck;
			this.hideCheck = !this.hideCheck; 
       	}
       	
    },
    mounted: function () {//初始化
      this.readytree();
      this.readyuser(1);
    }
}
</script>