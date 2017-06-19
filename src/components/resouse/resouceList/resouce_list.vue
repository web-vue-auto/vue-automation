<!-- resouce编辑 -->
<template>
	<div class="pad20 messageTable clearfix">	
		<!-- 按钮 -->
		<div class="pad5">
			<router-link :to="{ path: 'resoucemsg' }">
				<Button type="primary" class="borderNone" icon="plus">新增</Button>
			</router-link>
		</div>
		<!-- 表格 -->
		<div class="tablist">
		 <Table :columns="columns" :data="tableData" border stripe></Table>
		</div>		
	    <div class="messagepage text-center">
			<Page :total="total" @on-change="changePage" show-total :current="current"></Page>
		</div>
	  </div>
</template>
<style scope>
	.messageTable .pad5 {
		text-align: right;
	}
	.messageTable .tablist {
		padding: 0px 20px 0px 20px;
	}
	.messageTable .messagepage{margin:10px 0 10px;}
	.messageTable .messagepage ul{display: inline-block;}
	.text-center ul{
		display: inline-block;
	}
	.text-center {
		text-align: center;
	}
</style>
<script>
    export default {
    	name:"resoucelist",
		data () {
		    return {
		        tableData:[],
		        columns:[
		        	{
                        title: '日期',
                        key: 'date',
                        align:'center',
                        width:120
                    },
                    {
                        title: '作者',
                        key: 'auther',
                        align:'center',
                        width:120
                    },
                    {
                        title: '标题',
                        align:'center',
                        key: 'title'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        align:'center',
                        width:120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:180,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" class="borderNone" size="small" @click="goPath(${index})">编辑</i-button> <i-button type="error" class="borderNone" size="small" @click="ManagementDelete(${index})">删除</i-button>`;
                        }
                    }
		        ],
		        total:1,
			  	current:1
		    }
		},
		mounted () {
		  this.$store.commit('increment',[])
		  this.tableData = this.$store.getters.tableData;
		},
		methods:{
			changePage(num) {//当前页
		       this.current = num;
	           let current = this.current;
	           this.table(current);
		    },
		    goPath (index) {
		    		this.$router.push({name:"resoucemsg",query: {id: this.tableData[index].id}});
		    },
			table (current,bol) {
				let token = localStorage.getItem("token");
				this.$http.post("/api/resouce",{"current":current,"token":token}).then((response)=>{
				    let _data = response.data.data;
				    // vuex存储数据
				    this.$store.commit('increment',_data);
				    this.total = response.data.total;
				    if (bol) {
				    	// 删除表格
				    	this.current = 1; 
				    }
				    this.tableData = this.$store.getters.tableData;
				})
			}, 
			ManagementDelete(index){//删除
		        let id = this.tableData[index].id;
		        let that = this;
		        this.$Modal.confirm({
				title: "提示",
				content: "是否删除？",
				onOk: () => {
					this.$http.post("/api/deleteresouce",{"id":id}).then((response)=>{
						that.table(1,true)						
					})
				}
                  });
		    }
		},
		created () {
			// 初始化
			this.table(1);			
		}
    }
  </script>