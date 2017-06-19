<!-- 发布任务 -->
<template>
	<div class="pad20 taskannouncement">	
	<div class="pull-right pad5">
		<Button type="primary" icon="plus" @click="taskmodal" class="pull-right borderNone">发布任务</Button>
	</div>
	<!-- 发表意见   -->   
    <Modal
      v-model="tasksendmodal"
      title="发布任务"
      class="cleanline"
       >
        <div class="clearfix">
	        <span class="commonSpan"><i class="errorTip pull-left">*</i>任务标题 :</span>
	        <Input v-model="tasktitle" placeholder="请输入任务标题..." style="width: 300px" class="mar20 borderNone"></Input>
	    </div>
        <span class="errormsg" v-show="showerror">最多输入35字符</span>
        <div class="clearfix">
	        <span class="commonSpan"><i class="errorTip pull-left">*</i>任务来源 :</span>
	        <Input v-model="taskproject" placeholder="请输入项目..." style="width: 300px" class="mar20 borderNone"></Input>
        </div>
        <div class="clearfix">
	        <span class="commonSpan"><i class="errorTip pull-left">*</i>任务金额 :</span>
	        <Input v-model="taskprice" placeholder="请输入金额..." style="width: 300px" class="mar20 borderNone"></Input>
        </div>
        <div class="clearfix">
            <span class="commonSpan"><i class="errorTip pull-left">*</i>任务难度 :</span>
	       	<Rate show-text v-model="taskvalue" @on-change="changeStar" style="margin-top:6px">
            	<span style="color: #f5a623">{{ valueCustomText }}</span>
        	</Rate> 	
        </div>  
        <div class="clearfix">
        	<span class="commonSpan pull-left"><i class="errorTip pull-left">*</i>任务描述 :</span>
        	<Input v-model="taskcontent" type="textarea" :rows="4" placeholder="请输入任务描述..." class="borderNone mar20 taskarea pull-left"></Input>
        </div>  
        
        <div class="taskfoot clearfix">
         <Button type="ghost" @click="canceltask" class="pull-right borderNone marl10">取消</Button>
        <Button type="primary" @click="oktask" class="pull-right borderNone marR10">确定</Button>
       </div>               
       <div slot="footer"></div>
    </Modal>
	<!-- 表格 -->
	<div class="clearfix msgtable">
		<Table border :columns="columns" :data="tableData"></Table>		
	</div>
	<!-- 分页 -->
	<div class="tablepage text-center">
        <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
    </div>
    <!-- 编辑修改任务 -->
    <Modal
      v-model="changetask"
      title="发布任务"
      class="cleanline"
       >
        <div class="clearfix">
	        <span class="commonSpan"><i class="errorTip pull-left">*</i>任务标题 :</span>
	        <Input v-model="changetasktitle" placeholder="请输入任务标题..." style="width: 300px" class="mar20 borderNone"></Input>
	    </div>
        <span class="errormsg" v-show="showerror">最多输入35字符</span>
        <div class="clearfix">
	        <span class="commonSpan"><i class="errorTip pull-left">*</i>任务来源 :</span>
	        <Input v-model="changetaskproject" placeholder="请输入项目..." style="width: 300px" class="mar20 borderNone"></Input>
        </div>
        <div class="clearfix">
	        <span class="commonSpan"><i class="errorTip pull-left">*</i>任务金额 :</span>
	        <Input v-model="changetaskprice" placeholder="请输入金额..." style="width: 300px" class="mar20 borderNone"></Input>
        </div>
        <div class="clearfix">
            <span class="commonSpan"><i class="errorTip pull-left">*</i>任务难度 :</span>
	       	<Rate show-text v-model="changetaskvalue" @on-change="changeStar" style="margin-top:6px">
            	<span style="color: #f5a623">{{ changevalueCustomText }}</span>
        	</Rate> 	
        </div>  
        <div class="clearfix">
        	<span class="commonSpan pull-left"><i class="errorTip pull-left">*</i>任务描述 :</span>
        	<Input v-model="changetaskcontent" type="textarea" :rows="4" placeholder="请输入任务描述..." class="borderNone mar20 taskarea pull-left"></Input>
        </div>  
        
        <div class="taskfoot clearfix">
         <Button type="ghost" @click="changecanceltask" class="pull-right borderNone marl10">取消</Button>
        <Button type="primary" @click="changeoktask" class="pull-right borderNone marR10">确定</Button>
       </div>               
       <div slot="footer"></div>
    </Modal>
	</div>
</template>
<style scope>
	.taskannouncement .pad20 {
		padding: 10px 20px 0px 20px;
	}
	.taskannouncement .pad5 {
		padding: 5px 20px 5px 0px;
	}
	.taskannouncement .pull-right{
		float:right;
	}
	
	.marR10{
		margin-right:10px;
	}
	.errormsg{
		color:red;
		font-weight: 700;
		margin-right: 5px;
	}
	.errorTip{
		color:red;
		font-weight: 700;
		font-size: 20px;
		margin-right: 5px;
	}
	.tablepage{
		margin:10px;
	}
	.tablepage ul{
		display: inline-block;
	}
	.taskannouncement .text-center{
		text-align: center;
	}
	.taskannouncement .clearfix{
		clear: both;
	}
	.taskannouncement .msgtable{
		margin: 0 20px;
	}
	.taskannouncement .mar20{
		margin-top:10px;
	}
	.taskannouncement .taskfoot{
	  height: 30px;
	  margin-top:10px;
	}
	.taskannouncement .commonSpan{
		font-weight: 600;
		margin-right: 10px;
		line-height: 45px;
	    display: block;
	    float: left;
	}
	.taskannouncement .taskarea{
		width: 300px;
	}
</style>
<script>
	export default {
	      data() {
	        return {
	          showerror:false,
	          total:1,
			  current:1,
			  tasksendmodal:false,//发布任务modal
			  changetask:false,//编辑修改modal
			  tasktitle:'',//任务标题
			  taskcontent:'',//任务内容
			  taskprice:'',//任务金额
			  taskproject:'',//任务项目
			  taskvalue:0,//任务难度
			  valueCustomText:0,
			  id:'',
			  changetasktitle:'',//更新任务标题
			  changetaskcontent:'',//更新任务内容
			  changetaskprice:'',//更新任务金额
			  changetaskproject:'',//更新任务项目
			  changetaskvalue:0,//更新任务难度
			  changevalueCustomText:0,
			  columns: [
                    {
                        title: '日期',
                        key: 'date',
                        width: 120,
                        align: 'center'                       
                    },
                    {
                        title: '发布人',
                        key: 'auther',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '任务来源',
                        key: 'system',
                        align: 'center'
                    },
                    {
                        title: '权重',
                        key: 'weight',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '金额',
                        key: 'price',
                        width: 100,
                        align: 'center'
                    },                    
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render (row, column, index) {    
                        if(row.recipient == null || row.recipient == ""){
                        	return `<i-button type="primary" size="small" class="borderNone" @click="taskeditor(${index})">编辑</i-button> <i-button type="error" size="small" class="borderNone" @click="taskDelete(${index})">删除</i-button>`;
                        }else{
                        	return `已被 ${row.recipient} 接手`;
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
              this.readyList();
            },
            taskeditor(index){//编辑任务
            	let that = this;
		        this.id = this.tableData[index].id;
            	this.changetask = true;
            	this.$http.post("/api/reloadTaskList",{"id":this.id}).then((response)=>{
				    let _data = response.data;				   	
				   	this.changetasktitle = _data.data.title//任务标题
			    	this.changetaskproject = _data.data.system//任务来源项目
			    	this.changetaskvalue = _data.data.weight//任务权重
			    	this.changevalueCustomText = _data.data.weight
			    	this.changetaskprice = _data.data.price//任务金额
			    	this.changetaskcontent = _data.data.content//任务描述	
				})            	
            },
            changeoktask(){//更新任务发布
		    	let name;
		    	name = localStorage.getItem("username")
		    	//判断输入是否完整
	            if(this.changetasktitle == "" || this.changetaskproject == "" || this.changetaskvalue == "" || this.changetaskprice == "" || this.changetaskcontent == ""){
		            this.$Modal.confirm({
		              title: "提示",
		              content: "请填写完整"                
		            })
	            }else{
	            	//限制输入超过35字符
	            	if(this.changetasktitle.length>35){
		                this.showerror = true;
		            }else{
		            	let list={
			    		"auther":name,//当前操作人
			    		"id":this.id,
			    		"title":this.changetasktitle,//任务标题
			    		"project":this.changetaskproject,//任务来源项目
			    		"weight":this.changetaskvalue,//任务权重
			    		"price":this.changetaskprice,//任务金额
			    		"content":this.changetaskcontent//任务描述

				    	};		    
				    	this.$http.post("/api/updateTaskList",list).then((response)=>{
						    let _data = response.data;					   	
						    this.changecanceltask();
						    this.readyList();		
						})
		            }
	            	
	            }
		    	
		    },
		    changecanceltask(){//清除输入
		    	this.changetask = false;	
		    	this.changetasktitle = "";
		    	this.changetaskproject = "";
		    	this.changetaskcontent = "";
		    	this.changetaskvalue = "";
		    	this.changetaskprice = "";
		    	this.showerror = false;
		    }, 
		    taskDelete(index){//删除任务
		    	let that = this;
		        let id = this.tableData[index].id;
				this.$Modal.confirm({
                    title: "提示",
                    content: "是否删除？",
                    onOk () {
              			this.$http.post("/api/deleteTaskList",{"id":id}).then((response)=>{
						    let _data = response.data;					   	
						    that.readyList();		
						})
                    }
                })	      
		    },
		    taskmodal(){//控制modal显示
		    	this.tasksendmodal = true;
		    },
		    changeStar(val){//星级评分
		    	this.valueCustomText = val;
		    	this.changevalueCustomText = val;
		    },
		    oktask(){//新增任务
		    	let name;
		    	name = localStorage.getItem("username")
		    	//判断输入是否完整
	            if(this.tasktitle == "" || this.taskproject == "" || this.taskvalue == "" || this.taskprice == "" || this.taskcontent == ""){
		            this.$Modal.confirm({
		              title: "提示",
		              content: "请填写完整"                
		            })
	            }else{
	            	//限制输入超过35字符
	            	if(this.tasktitle.length>35){
		                this.showerror = true;
		            }else{
		            	let list={
			    		"auther":name,//当前操作人
			    		"title":this.tasktitle,//任务标题
			    		"project":this.taskproject,//任务来源项目
			    		"weight":this.taskvalue,//任务权重
			    		"price":this.taskprice,//任务金额
			    		"content":this.taskcontent//任务描述

				    	};		    
				    	this.$http.post("/api/addTaskList",list).then((response)=>{
						    let _data = response.data;
						    this.readyList();					   	
						    this.canceltask();		
						})
		            }
	            	
	            }
		    	
		    },
		    canceltask(){//清除输入
		    	this.tasksendmodal = false;	
		    	this.tasktitle = "";
		    	this.taskproject = "";
		    	this.taskcontent = "";
		    	this.taskvalue = "";
		    	this.taskprice = "";
		    	this.showerror = false;
		    }, 
		    readyList(){//初始化列表
		    	let current = this.current;
		    	this.$http.post("/api/TaskList",{"current":current}).then((response)=>{
				    let _data = response.data;				   	
				   	this.tableData = _data.data;
				   	this.total = _data.total;		
				})
		    }   
		},
		mounted: function () {
			this.readyList(); 
		}
    }
</script>
