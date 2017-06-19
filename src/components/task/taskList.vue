<!-- 投票 -->
<template>
	<div class="pad20 messageTable">	
	<!-- 任务内容 -->
    <div class="tasKMsgContent">
    <!-- 选项 -->
    	<div v-show="showSelect" class="content">
    		<span class="pad10 fontBold">活动内容:</span><span class="tip">(最多只能选择 {{num}} 个)</span>
        		<Checkbox-group v-model="taskCheckItem" @on-change="checkAllGroupChange" class="checkGroup pad10" >
			        <Checkbox :label="item.id" v-for="item in taskCheck" :disabled="disabled" :key="item.id">{{item.name}}</Checkbox>				   
			    </Checkbox-group>
			    <div class="checkFoot">
			    	<Button type="success" class="borderNone pull-right" @click="submitCheck" :disabled="disabledBtn">提交</Button>
			        <Button class="borderNone pull-right" @click="cancalCheck">取消</Button>	
			    </div>			   
    	</div>
    	<!-- 图表 -->
        <div  v-show="showOption" id="main" style="width: 600px;height:400px;"></div>
    </div>
	</div>
</template>
<style lang="less">
	.messageTable .pad20 {
		padding: 10px 10px 0px 10px;
	}
	.messageTable .pad5 {
		padding: 5px 20px 5px 0px;
	}
	.messageTable .pull-right{
		float:right;
	}
	.messageTable .msgtable{margin: 0 20px;}
	.messageTable .mar20{
		margin-top:20px;
	}
	//任务
	.tasKMsgContent{
			margin:30px auto;
			padding:10px;
			min-height: 550px;					
			font-size: 14px;
			.fontBold{font-weight: bold;}
			.pad10{padding:10px;}
			.content{
				display: block;
				width: 500px;
				margin: 0 auto;
			}
			#main{
				margin: 0 auto;
			}
			.checktitle{
				float:left;
				line-height: 22px;
				margin:0 5px;
			}
			.tip{color:#999;}
			.checkGroup{
				margin:10px;
				border:1px solid #ccc;
				max-width: 500px;
				min-height: 200px;
			}
			.checkFoot{
				margin:10px;
				max-width: 500px;
				min-height: 200px;
				button{margin-left: 10px;}
			}
		}
</style>
<script>
	export default {
	      data() {
	        return {
	          taskCheck:[],//任务选项
              taskCheckItem:[],//取值任务选项
              num:'',//限制选项多少
              disabled: false,//禁止选择
              disabledBtn:false,//选项超过4个禁止点击
              showSelect:false,//选项卡显隐
              showOption:false//图表
              
	        }
	      },
	      methods:{
		    readtoken(){//检验用户是否提交投票
		    	let total = localStorage.getItem("token");			    
        		this.$http.post("/api/getCountCheck",{"token":total}).then((response)=>{
        		 	let _data = response.data;        		 	       		 	
        		 	if(_data.type == "success"){
        		 		this.showSelect = true;
			    	   	this.showOption = false;
			    	}else{      		 		
        		 		this.showSelect = false;
			    	    this.showOption = true;	
			    	   
        		 	}	                  					
                	 			     				
		          })
        	},
		    readTaskCheck(){//任务选项
        		 this.$http.post("/api/getProjectList").then((response)=>{
        		 	let _data = response.data;        		 	
		            this.taskCheck = _data; 
		          })
        	},
        	checkAllGroupChange(data){//选中checkbox
        		//判断选中超过三个禁止选择       		
        		if(data.length>this.num){
        			this.disabled = true;
        			this.disabledBtn = true;
        		}	
        	},
        	submitCheck(){//提交选项
        		let total = localStorage.getItem("token");
			    let taskItem = this.taskCheckItem.join();
			    let this_ = this;
        		this.$http.post("/api/getProjectSave",{"token":total,"id":taskItem}).then((response)=>{
        		 	let _data = response.data;
        		 	let self = this;
        		 		this.$Modal.success({
		                    title: "提示",
		                    content: _data.data,
		                    onOk () {        					
		                        	self.showSelect = false;
	        					self.showOption = true;	
	        					// 重新加载视图更新
	        					this_.readNum();		     				
		                    }
		                })	
        		 	
		           
		        })

        	},
        	cancalCheck(){//取消选择
        		this.taskCheckItem = [];
        		this.disabled = false;
        		this.disabledBtn = false;
        	},
        	readNum(){//任务选项反馈
        		let optionCount = [];
        		let optionName = [];
        		let optionNameList = [];
        		let optionTitle = [];
        		this.$http.post("/api/getCount").then((response)=>{
        		 	let _data = response.data;
		            _data.forEach(function(value, index, array) {
		              optionName.push(value.name)
		              optionCount.push(value.count)		             	
		              optionTitle.push(value.title)
					});	

					this.options(optionName,optionCount,optionTitle)			

				})
        	},
        	options(name,count,title){//投票图表        		
	        	// 基于准备好的dom，初始化echarts实例
		        var myChart = echarts.init(document.getElementById('main'));       
		        // 指定图表的配置项和数据
		        var option = {
		            title: {//标题
		            	text: '任务类型投票分布'	                           
		            },
		            tooltip: {
		            	
		            },
		            legend: {//图例
		                data:title	                
		            },		          
		            xAxis: {//x轴颜色
		                data: name,
		                nameTextStyle:{
		                	color:'#fff',
		                },
		                axisLabel: {  
                           interval: 0,  
                           formatter:function(value)  
                           {  
                               return value.substr(0,3);  
                           }  
                        }  
		                
		            },
		            yAxis: {//y轴颜色
		            	
		            },
		            series: [{
		                name: title[0],
		                type: 'bar',
		                data: count,
		                itemStyle:{
		                	normal:{
		                		color:'#58B7FF'
		                	}
		                }
		            }]
		        };
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
        	}               	
		},
		mounted: function () {
			//this.readyTable();
			this.readtoken();
			this.readTaskCheck();
			this.readNum();	
			//限制选择数量		
			this.$http.post("/api/getProjectListNum").then((response)=>{
    		 	let _data = response.data;  
    		 	if(_data.typenum == "" || _data.typenum  == null){
    		 		this.num = 0;
    		 	}else{
    		 		this.num = _data.typenum;	
    		 	}     		 	
	            
			})
			  
		}
		

    }
</script>
