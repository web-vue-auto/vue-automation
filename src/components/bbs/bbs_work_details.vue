<!--BBS工作模块详情页-->
<template>
<div class="work_details">
   	<!-- 面包屑 -->
    <div>
        <Breadcrumb>
	        <Breadcrumb-item>
	            <a href="javascript:;" @click="list">首页</a>
	        </Breadcrumb-item>
	        <Breadcrumb-item>
	           <a href="javascript:;">详情</a>
	        </Breadcrumb-item>
    	</Breadcrumb>
    </div> 
    <!-- 内容部分 -->
    <div class="work_Content">
	    <table class="work_list">
		    <tbody>
		    <tr>
		   	  	<td class="reply" rowspan="2">
		   	  		<span class="xg1">回复:</span> <span class="xi1">{{total}}</span>
		   	  	</td>
		   	  	<td>
		   	  		<h4>{{optionTitle}}</h4>
		   	  	</td>
		   	</tr>
		   	</tbody>
	   	</table>
	   	<div class="clearfix ulList">
	   	<table class="work_item" v-for="item in worklist">
	   		<tbody>
	   		<tr>
	   		  <!-- left -->
	            <td class="bgcolorBlue itemLeft" rowspan="2">
	            <div class="person">
		          	<!-- 用户名 -->
		          	<h5 class="itemTitle">{{item.auther}}</h5>
		          	<div class="louzhubiaoshi" v-if="item.autherType == 0">
                       <a></a>
                    </div>
		          	<!-- 头像 -->
		          	<span class="headImg"><img :src="item.imgUrl == null ? src : item.imgUrl"></span>
		          	<!-- 用户相关信息 -->
		          	<!-- <p class="itemLeft_msg">
		          		<span class="borRight"><a href="javascript:;" class="color369 disblock">4</a>主题</span> -->
		          		<!-- <span><a href="javascript:;" class="color369 disblock">4</a>帖子</span>		          		
		          	</p> -->
		          	<p class="text-center">		          		
		          		<span>帖子: <a href="javascript:;">{{item.count}}</a></span>
		          	</p>
		        </div>
	          	</td>
	          <!-- right -->
	          	<td class="itemRight">
		          	<div class="itemRightTitle">
						<Icon type="person" class="userIcon pull-left"></Icon>
						<span class="sendTime pull-left">发表于 
						<i v-html="new Date(parseInt(item.date) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')"></i>
						</span>
					</div>
					<div class="itemRightContent">
						<p v-html="item.content"></p>
					</div>
	          	</td>
	        </tr>
	        </tbody>
	    </table>
	   	</div>   	
    </div>  
    <!-- 发帖 --> 
    <div style="margin-top: 20px;" class="clearfix">
    	<div id="BBSeditor">
		</div>
		<Button type="primary" style="margin: 10px 0 0;" class="borderNone pull-right" @click="publishMsg">发表帖子</Button>
		<div class="pull-left">		
			<!-- 上传 -->
		    <Upload action="http://192.168.145.159:3000/api/fileUpload" enctype="multipart/form-data" 
		        :on-success="handleSuccess" ref="upload" style="display:inline-block;margin-right:10px;" :on-remove="handleremove" :format="['mp4','avi','rmvb','mkv']">
		          <Button type="ghost" icon="ios-cloud-upload-outline" class="borderNone martop10">上传视频</Button>
		    </Upload>
			<p v-if="isvadio">
				<span><b style="font-weight:700;">url:</b>   {{url}}</span><br/>
				<span class="showEditor">如需上传视频请按照以下格式
				"<'iframe src="http://192.168.145.159:8088/static/upload/-4Nyh3J5STmQvh4d_2_URuAP.mp4"  frameborder="0" allowfullscreen="true" width="100%" height="100%"'><'/iframe'>"(建议上传MP4格式)
				</span>	
			</p>
		</div>
    </div>
    
</div>
</template>
<style lang="less">
	.work_details{
		margin:70px 15px 15px 15px;
		min-height: 500px;
		.pull-left{float: left;}
		.pull-right{float: right;}
		.borRight{border-right: 1px solid #CCC;}
		.color369{color: #369;}
		.disblock{display: block;}
		.pipe{margin: 0 5px;color: #CCC;}
		.work_Content{
			margin-top:20px;
			.clearfix{clear:both;} 
			.work_list{
			    padding: 0;
			    overflow: hidden;
				.reply{   
					width: 160px;
					padding:10px;
				    background: #E5EDF2;
				    overflow: hidden;
				    border-right: 1px solid #C2D5E3; 
				    float: left;
				    .xg1{
				    	color: #999;
				    }
				    .xi1{
						color: #F26C4F;
					}			    
					}
				h4{					
					font-size: 16px;
					font-weight: bold;
					padding-left: 20px;
					line-height: 38px;
					color:#666;
				}
			}
			.work_item{		
				width: 100%;		
				.louzhubiaoshi {
				    position: absolute;
				    width: 36px;
				    height: 36px;				    
				    top: 46px;
    				right: 14px;
				    background: url(/static/images/lou.png) no-repeat -44px 0;
				    border: 0 solid red;
				}
				border-top:4px solid #C2D5E3;			
				.bgcolorBlue{
					background: #E5EDF2;
				}
				.itemLeft{
					width: 160px;
				    background: #E5EDF2;
				    overflow: hidden;
				    position: relative;
				    .person{
						position: absolute;
						top:5px;
					}
					.itemTitle{
						overflow: hidden;
					    margin-bottom: 10px;
					    padding: 10px 0;
					    padding-left: 14px;
					    border-bottom: 1px dashed #CDCDCD;
					}
					.headImg{
						margin: 10px 15px;
					    height: 130px;
					    width: 130px;
					    display: block;
					    background: #fff;
						img{
							width: 100%;
							height: 100%;
						    padding: 5px 5px 8px;
						    
						}
					} 
					.sendMsg{
						display: inline-block;
	    				padding-left: 25px;
	    				.email{
	    					font-size: 20px;
	    					color:#369;
	    					float: left;  
	    				}
	    				>a{margin-left: 5px;color:#369;}
					}
					.itemLeft_msg{
							padding:0 8px;
							margin:5px 8px; 
							display: inline-block;
							span{    
								float: left;
							    text-align: center;
							    padding:0px 50px;
							}	
					}
				}	
				.itemRight{
					position: relative;
				    min-height: 500px;
					margin-left: 10px;
					padding: 0 20px;
					.itemRightTitle{
						width: 100%;
						overflow: hidden;
					    margin-bottom: 10px;
					    padding: 9px 0;
					    border-bottom: 1px dashed #CDCDCD;
					    .userIcon{
					    	font-size: 16px;
					    	color: #999;
					    }
					    .sendTime{
					    	color:#999;
					    	margin-left: 5px;
					    	i{font-style:normal;color:#666}
					    }
					}
					.itemRightContent{
						padding:8px;
						min-height: 220px;
					}
					.psth{
						background-color: #FFF4DD;
					    color: #F26C4F;
					    width: 240px;
					    padding: 5px 45px 5px 20px;
					    font-size: 14px;
					    .icon_ring {
						    background: #FFF4DD;
						    display: inline-block;
						    width: 8px;
						    height: 8px;
						    margin-right: 5px;
						    border: 2px solid #F26C4F;
						    -webkit-border-radius: 10px;
						    -moz-border-radius: 10px;
						    border-radius: 10px;
						    box-shadow: 0px 0px 1px rgba(0,0,0,0.2);
						    overflow: hidden;
						}
					}
					.itemRigthTalk{
						margin-top:5px;
						p{margin:8px 0;width: 100%;}
						.itemRightTalkImg{
							display: inline-block;
						    width: 30px;
						    height: 30px;
						    background: #ccc;
						}
						.itemRightTalkStyle{
							line-height: 30px;
							margin-left: 5px;
						}
						.itemRightTalkUser{color:#369;font-weight: bold;}
						.itemRightTalkMsg{color:#666;}
						.itemRightTalkTime{color:#999;}
					}
					.itemRightTalkBtn{
						position: absolute;
						bottom: 0;
						width: 100%;
						overflow: hidden;
					    margin-top: 10px;
					    padding: 9px 0;
					    border-top: 1px dashed #CDCDCD;
					    .talk{
					    	font-size: 16px;
					    	color: #00cc66;
					    	line-height: 20px;
					    }
					    span{
					    	color:#666;
					    	margin-left: 5px;
					    }
					}

				}			

			}
		}
		#BBSeditor{height:150px;}
	
	}
</style>
<script>
export default {
	data(){
		return{
			isvadio:false,//控制视频
			url:'',
			src:'/static/images/noavatar_middle.gif',//头像
			editor:{},
			worklist:[],
			rowList:[],//头像相关信息
			total:'',//回复
			optionTitle:''//标题
		}
	},
	methods:{
		list(){//面包屑跳转路由
          	let that = this;
          	that.$router.push({ path: 'bbswork'})
		},
		handleSuccess (res, file) {//文件上传成功时
	        let arr = res.data;
	        this.uploadList = arr;
	        this.url = arr.url; 
	        if(arr.type.includes("mp4")||arr.type.includes("wmv")||arr.type.includes("mkv") ||arr.type.includes("avi") || arr.type.includes("rmvb")){
	        	this.isvadio = true;
	        }      
      	},
      	handleremove(res,file){//删除视频并清除url
      		this.url = "";
      		this.isvadio = false;
      	},
		publishMsg(){//发表帖子
			// 获取编辑区域的html
			let self = this;
			let id = this.$route.query.id;
			let auther = localStorage.getItem("username");
			let localauther = decodeURI(this.$route.query.name);
			let editor = this.editor; 
			let html = editor.$txt.html()
			this.$http.post('/api/addBbsDetials',{
					'content':this.editor.$txt.html(),
					'id':id,
					'auther':auther,
					'localauther':localauther
				}).then((res)=>{
					if(res.data.type == false){
						this.$Modal.error({
		                    title: "提示",
		                    content: res.data.data
			            })
					}else{
						this.$Modal.success({
		                    title: "提示",
		                    content: res.data.data,
		                    onOk(){
				                self.readylist();
								//清空
								self.editor.$txt.html('<p><br></p>');
		                    }
			            })
						

					}
				})
		},
		readylist(){//初始化页面信息			
			let id = this.$route.query.id;
			let name = decodeURI(this.$route.query.name);
			this.$http.post('/api/getBbsDetialsList',{'id':id,'name':name}).then((res)=>{
				let _data = res.data.data;
				let row = res.data.row;
				let self = this;
				_data.forEach((item,index)=>{
					item['count'] = row[index].count;
					item['imgUrl'] = row[index].imgUrl;
				})
				this.worklist = _data;
				this.optionTitle = res.data.title;
				this.total = res.data.total;
			})
		}    
	},
	mounted () {
		//富文本
		var editor = new wangEditor('BBSeditor');
		this.editor = editor;
		//配置上传图片
    	editor.config.uploadImgUrl = '/api/imgUpload';
    	// 自定义load事件
		editor.config.uploadImgFns.onload = function (resultText, xhr) {
	    	let url = JSON.parse(resultText).data.url;
	    	editor.command(null, 'insertHtml', '<img src="' + url + '"  style="max-width:100%;"/>');	        
		};
		// 移除某几个菜单，例如想移除『插入代码』和『全屏』菜单：
	    editor.config.menus = $.map(wangEditor.config.menus, function(item,key) {
        if (item === 'insertcode') {
              return null;
        }
        if (item === 'fullscreen') {
              return null;
        }
        if (item === 'location') {
              return null;
        }
          return item;
        });
        editor.create();
        //初始化页面
        this.readylist();
	}
}
</script> 