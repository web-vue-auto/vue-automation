<template>
	<div class="knowledgePage">
		<div class="pull-left text-center">
			<Input v-model="searchvalue" placeholder="作者/文章标题" style="width: 500px" class="borderNone"></Input>	
	        <Button type="primary" icon="ios-search" class="borderNone" @click="searchlist">搜索</Button>
	        <Button type="ghost" class="borderNone mar10 " @click="cancel">取消</Button>
	    </div>
	    <router-link to="/createknowledgepage">
			<Button type="primary" icon="plus" class="borderNone pull-right">新增</Button>
		</router-link>
	    <div>
	    	
	    </div>
		
		<!-- 表格 -->
		<div class="clearfix tablemar">
			<Table border :columns="columns" :data="tableData"></Table>		
		</div>
		<!-- 分页 -->
		<div class="tablepage text-center">
	        <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
	    </div>
	</div>
</template>
<style lang="less" scoped>
	.knowledgePage {
		margin-top:70px;
		padding:40px 180px;
		.mar10 {
			margin-left:10px;
		}
		.clearfix {
			clear:both;
		}
		.tablemar {
			margin-top:40px;
		}
	}
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
	                                           this.knowledgeDelete(params.index)
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
	                                }, '编辑'),
		                            h('Button', {
		                                    props: {
		                                        type: 'error',
		                                        size: 'small'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.knowledgeDelete(params.index)
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
	      	//查询
	      	searchlist(){
            	if(this.searchvalue == ""){
            		this.readyTable();
            	}else{
            		this.$http.post("/api/searchknowledgeList",{"search":this.searchvalue,'current':this.current}).then((response)=>{
						    let _data = response.data;
						    this.tableData = _data.data.data;
						    this.total = _data.data.total;	
					   
					})
            	}
            	
            },
            //分页
	      	changePage (num) {
              this.current = num;
              this.readyTable();
            },
            //编辑
            show(index){
	           let that = this;
	           let id = this.tableData[index].id;
			   that.$router.push({ path: 'createknowledgepage', query: { id: id}})
            }, 
            //删除           
		    knowledgeDelete(index){
		    	let that = this;
		        let id = this.tableData[index].id;
				this.$Modal.confirm({
                    title: "提示",
                    content: "是否删除？",
                    onOk () {
                     this.$http.post("/api/knowledgeDelete",{"id":id}).then((response)=>{
					    that.readyTable();	
					})
                    }
                })	      
		    },
		    //取消
		    cancel(){
		    	this.searchvalue = '';
		    	this.readyTable();
		    },
		    //初始化
		    readyTable(){
		    	let	current = this.current;
		    	this.$http.post("/api/knowledgeList",{"current":current}).then((response)=>{
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
