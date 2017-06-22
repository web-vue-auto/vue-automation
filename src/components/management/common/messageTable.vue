<!-- vue原创 -->
<template>
	<div class="pad20 messageTable">
	<div class="text-center pull-left pad5 marl20">
		<Input v-model="searchvalue" placeholder="作者/文章标题" style="width: 500px" class="borderNone"></Input>	
        <Button type="primary" icon="ios-search" class="borderNone" @click="searchlist">搜索</Button>
	</div>
	<div class="pull-right pad5">	 	
		<router-link to="/createmsg">
		<Button type="primary" icon="plus" class="borderNone">新增</Button>
		</router-link>
	</div>
	<!-- 表格 -->
	<div class="clearfix msgtable">
		<Table border :columns="columns" :data="tableData"></Table>		
	</div>
	<!-- 分页 -->
	<div class="tablepage text-center">
        <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
    </div>
	</div>
</template>
<style scope>
	.messageTable .pad20 {padding: 10px 20px 0px 20px;}
	.messageTable .pad5 {padding: 5px 20px 5px 0px;}
	.messageTable .pull-right{float:right;}
	.tablepage{margin:10px;}
	.tablepage ul{display: inline-block;}
	.messageTable .text-center{text-align: center;}
	.messageTable .clearfix{clear: both;}
	.messageTable .msgtable{margin: 0 20px;}
	.messageTable .marl20{margin-left: 20px;}
	.messageTable .mar20{margin-top:20px;}
</style>
<script>
	export default {
	      data() {
	        return {
	          total:1,
			  current:1,
			  searchvalue:'',
			  columns: [
                    {
                        title: '日期',
                        key: 'Date',
                        width: 120,
                        align: 'center'                       
                    },
                    {
                        title: '作者',
                        key: 'Auther',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'Title',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                        	if(params.row.type != null){
                        		return h('div', [              
	                                h('Button', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    on: {
	                                        click: () => {
	                                           this.ManagementDelete(params.index)
	                                        }
	                                    }
	                                }, '删除')
                           		]);
                        	}else{
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
	                                            this.show(params.index)
	                                        }
	                                    }
	                                }, '查看'),
		                            h('Button', {
		                                    props: {
		                                        type: 'error',
		                                        size: 'small'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.ManagementDelete(params.index)
		                                        }
		                                    }
		                                }, '删除')
	                            ]);
                        	}
                            
                        }
                    }
                ],
	          tableData: []
	        }
	      },
	      methods:{
	      	changePage (num) {//分页
              this.current = num;
              this.readyTable();
            },
            show(index){//编辑
	           let that = this;
	           let id = this.tableData[index].id;
			   that.$router.push({ path: 'createmsg', query: { id: id}})
            },
            searchlist(){
            	if(this.searchvalue == ""){
            		this.readyTable();
            	}else{
            		this.$http.post("/api/searchManagementList",{"search":this.searchvalue,'current':this.current}).then((response)=>{
						    let _data = response.data;
						    this.tableData = _data.data.data;
						    this.total = _data.data.total;	
					   
					})
            	}
            	
            },
		    ManagementDelete(index){//删除
		    	let that = this;
		        let id = this.tableData[index].id;
				this.$Modal.confirm({
                    title: "提示",
                    content: "是否删除？",
                    onOk () {
                     this.$http.post("/api/ManagementDelete",{"id":id}).then((response)=>{
					    that.readyTable();	
					})
                    }
                })	      
		    },
		    readyTable(){//初始化
		    	let	current = this.current;
		    	this.$http.post("/api/ManagementList",{"current":current}).then((response)=>{
				    let _data = response.data;
				    this.tableData = _data.data;
				    this.total = _data.total;			
				})
		    }    
		},	
		mounted: function () {
			this.readyTable();  
		}
    }
</script>
