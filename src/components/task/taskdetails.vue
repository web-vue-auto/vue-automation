<!-- 任务列表 -->
<template>
	<div class="taskdetails">
	<div class="task-container">
		<ul>
			<li v-for="item in tasklist">
				<h2 @click="lookMsg(item.id)">{{item.title}}</h2>
				<h3>${{item.price}}</h3>
				<p class="minheight" @click="lookMsg(item.id)">
					{{item.content}}				   
				</p>
				<p>
					<a href="javascript:;" @click="task(item.id)" v-if="item.recipient == null || item.recipient == '' "><span>接受</span></a>
					<a href="javascript:;" v-else class="bggary"><span>已认领</span></a>
				</p>
			</li>			
		</ul>
	</div>
	<!-- 查看详情 -->
	<Modal v-model="messageModal" width="500" class="cleanline">
        <p slot="header">
            <Icon type="information-circled" style="color:#39f"></Icon>
            <span>任务详情</span>
        </p>
        <div class="messagelist">
        <div class="clearfix">
	        <span class="commonSpan pull-left">任务标题 :</span>
	        <span class="pull-left styleSpan">{{tasktitle}}</span>
	    </div>
        <div class="clearfix">
	        <span class="commonSpan pull-left">任务来源 :</span>
	        <span class="pull-left styleSpan">{{taskproject}}</span>	        
        </div>
        <div class="clearfix">
	        <span class="commonSpan pull-left">任务金额 :</span>
	        <span class="pull-left styleSpan">{{taskprice}}</span>	        
        </div>
        <div class="clearfix">
            <span class="commonSpan pull-left">任务难度 :</span>
	       	<Rate show-text v-model="taskvalue"  style="margin-top:6px;float:left" disabled>
            	<span style="color: #f5a623">{{ valueCustomText }}</span>
        	</Rate> 	
        </div>  
        <div class="clearfix">
        	<span class="commonSpan pull-left">任务描述 :</span>
        	<span class="pull-left textareamsg">{{taskcontent}}</span>
        </div>
        <div style="height: 40px;clear: both;">
        	<Button type="primary" size="large"  @click="sure" class="pull-right marT20">确定</Button>
        </div>
        </div>
        <div slot="footer"></div>
    </Modal>	
	<!-- 分页 -->
	<div class="text-center task-foot">
        <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
    </div>
	</div>
</template>
<style lang="less">
.taskdetails{
	overflow: hidden;
	background: #f7f7f7 url("/static/images/bg04.png");
	min-height: 800px;
	padding:50px 0px 0px 0px;
	.bggary{
		background: #ccc !important;
		color:#000 !important;
	}	
	.marT20{
		margin-top:20px;
	}
	.commonSpan{
		font-weight: 600;
	    display: block;
	    line-height: 45px;
	    margin-right: 10px;
	}
	.styleSpan{
		display: block;
		line-height: 45px;
	}
	.task-container {
		width: 80%;
		margin: 30px auto;
		margin-top: 50px;
		h2{
			height: 23px !important;
			cursor: pointer;
		}	
		ul {
			margin: 0;
			padding: 0;
			list-style-type: none;
			:after {
				content: '';
				clear: both;
				display: block;
			}
			li {
				background: #f5f7f9;
				float: left;
				transition: all .2s;
				width: 20%;
				min-height: 360px;
				box-sizing: border-box;
				border:1px solid #eee;
				padding: 10px;
				margin:20px 0;
				.minheight{
					min-height: 230px;
					text-align: left;
					color:#657180;
				}
				p {
					text-align: center;
					color: #111;
					padding-top: 10px;
					cursor: pointer;
				}
				h2 {
					font-size: 20px;
					text-align: center;
					margin-bottom: 10px;
					text-overflow: ellipsis;
    				overflow: hidden;
    				color:#464c5b;
				}
				h3 {
					font-size: 18px;
					text-align: center;
					border-bottom: 1px solid #ccc;
					padding-bottom: 10px;
				}
				a {
					display: block;
					width: 40%;
					font-size:16px;
					margin: 10px auto;
					text-align: center;
					background: #58B7FF;
					border-radius: 10px;
					transition: all .5s;
					position: relative;
					padding: 10px 0;
					text-decoration: none;
					color: #fff;
					span {
						display: block;
					}
				}
				a:hover {
					box-shadow: 0px 1px 10px rgba(0,0,0,.8);
				}

			}
		}

		ul li:nth-child(4) {
			border-right: none;
		}
		ul li:nth-child(6) {
			clear:both;
		}
		ul li:hover{
			box-shadow: 0px 4px 20px rgba(0,0,0,.3);
			border-radius: 10px;
			transform: scale(1.1);
			-webkit-transform: scale(1.1);
			border: none;
			margin-bottom:20px;
			/*border: 1px solid #ccc;*/
			background: #fff;
		}

	}
	.messagelist{
		margin-bottom: 20px;
		>div{
			height: 40px;
			margin: 5px 0;
		}
		.textareamsg{
			margin-top:14px;
			width: 400px;
			height: auto;
		}
	}
	
	.task-foot{
		padding:30px 0;
		clear:both;
	}

}

</style>
<script>
	 export default {
        data () {
            return {
            	total:1,
			  	current:1,
			  	tasklist:[],
			  	messageModal:false,
			  	tasktitle:'',//任务标题
			    taskcontent:'',//任务内容
			    taskprice:'',//任务金额
			    taskproject:'',//任务项目
			    taskvalue:0,//任务难度
			    valueCustomText:0       
            }
        },
        methods:{
        	changePage (num) {//分页
              this.current = num;  
              this.readylist();
            },
            task(val){
            	let id = val;
            	let self = this;
            	let auther = localStorage.getItem("username"); 
            	this.$Modal.confirm({
		              title: "提示",
		              content: "是否接受任务？",
		              onOk(){
		              	//接受任务
		              	this.$http.post("/api/respectTask",{"id":id,"auther":auther}).then((response)=>{
						    let _data = response.data;
						    if(_data.type == "success"){
						    	setTimeout(function(){
						    		self.$Modal.success({
						              title: "提示",
						              content: _data.data,
						              onOk(){
						              	self.readylist();
						              }                
						            })	
						    	},500 )
						    	
						    }				   	
						    		
						})
		            }               
			    })          	
            		
            },
            lookMsg(val){
            	this.messageModal = true;
            	this.$http.post("/api/reloadTaskList",{"id":val}).then((response)=>{
				    let _data = response.data;				   	
				   	this.tasktitle = _data.data.title//任务标题
			    	this.taskproject = _data.data.system//任务来源项目
			    	this.taskvalue = _data.data.weight//任务权重
			    	this.valueCustomText = _data.data.weight
			    	this.taskprice = _data.data.price//任务金额
			    	this.taskcontent = _data.data.content//任务描述	
				})
            },
            sure(){
            	this.messageModal = false;
            },
            readylist(){//初始化
            	let current = this.current;
            	this.$http.post("/api/TaskList",{"current":current}).then((response)=>{
				    let _data = response.data;				   	
				   	this.tasklist = _data.data;
				   	this.total = _data.total;		
				})
            }
        	
        },
        mounted: function () {  
   			this.readylist();   			
		}
    }
</script>