<!-- BBS-work -->
<template>
<div class="bbs_warp">
<div class="bbs_container">
<div class="bbs_work clearfix">
	<!-- 左侧 -->
	<div class="leftContent pull-left">
	<!--循环 msg-->
		<p class="msgtip" v-if="showTip">暂无数据</p>
		<div class="msg" v-for="item in list" v-else>
			<h3><Icon type="compose" class="icon titleIcon"></Icon>
				<a href="#">
					<router-link :to="{ path:'bbsworkdetails', query: { id: item.id ,name:encodeURI(item.auther)}}"> 
					{{ item.title }}
					</router-link>
				</a>
			</h3>
			<div class="pline">
				<span>
                    <Icon type="calendar" class="icon spanIcon"></Icon>
                    <a href="javascript:;" class="pull-left">{{ item.date }}</a>
				</span>
				<span>
				    <Icon type="chatbox-working" class="icon spanIcon"></Icon>
				    <a href="javascript:;" class="pull-left">{{ item.reply_count }}</a>
				</span>
				<span class="pull-right" @click="checklike(item.id,item.restore = !item.restore)">
				    <Icon type="ios-heart" class="icon spanIcon" 
				    :class="{'activeicon': item.restore}" ></Icon>
				    <a href="javascript:;" class="pull-left">{{ item.thumb_up }}</a>
				</span>
			</div>	
		</div>
	</div>
	<!-- 右侧 -->
	<div class="rightContent pull-left">
        <!-- 搜索 -->
        <div class="ma_10">
            <Input placeholder="请输入..." class="borderNone w80 fl_" v-model="inputsearch"></Input>
            <Button type="primary" icon="ios-search" class="borderNone " @click="searchList">搜索</Button>
        </div>
        <!--循环rightlist-->
        <div class="rightlist">
              <h3 class="title">话题TOP5</h3>
              <ul>
                  <li v-for="item in topList">
                      <Icon type="bookmark" class="chevronIcon"></Icon>
                      <a href="javascript:;">{{item.name}}</a>
                  </li>
              </ul>  
        </div>
        <!--图表 -->
        <div class="rightlist">
            <div id="mainpie" style="width: 320px;height:300px;"></div>   
        </div>
            
        </div>	
</div>
<div class="bbs_foot">
    <!--分页-->
    <div class="clearfix">
    	<Page :total="total" @on-change="changePage" show-total :current="current"></Page>
    </div>  
</div>
<div class="sendBtn" v-show="sendBtn">
	<Button type="primary" icon="chevron-down" class="borderNone" @click="sendMsg">发帖</Button>
</div>
<!-- 富文本 -->
<div v-show="showEditor">
	<Input v-model="bbsWorkTitle" placeholder="请输入标题..." style="width: 300px;   margin: 10px 0 0;" class="borderNone"></Input>
	<span class="showEditor" v-if="showMsg">*请输入标题(不超过35个字)</span>
	<Button style="margin: 10px 0;" icon="chevron-left" class="borderNone pull-right" @click="cancelEditor">取消</Button>	
	<div>		
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
	
	<!-- 富文本编辑器 -->
	<div id="BBSeditor" class="mar_t20"></div>	
	<Button type="primary" style="margin: 10px 0;" class="borderNone clearfix" @click="articalSave">发表帖子</Button>
</div>	
</div>
</div>
</template>
<style scope lang="less">
    @import "../../assets/css/bbs.css";
    .showEditor {
    	color: red
    }
    .leftContent{    	
    	.msgtip{
    		margin-top:10px;
    		min-height: 500px;
    		border:1px solid #ccc;
    		text-align: center;
    		font-weight: 700;
    		padding-top: 10px;
    		font-size: 16px;	
    	}
    	.text-center{
    		text-align: center;
    	}
    }
	.pull-left{
		.w80 {
			width: 70%;
		}
		.fl_ {
			text-align: right;
		}
		.ma_10 {
			margin-top: 10px;
		}
	}
	.mar_t20{
		margin-top: 20px;
	}
	.mar_b10{
		margin-bottom: 10px;
	}
	.activeicon{
    	color:red !important;
    } 
</style>
<script>
export default {
	data(){
		return{
			isvadio:false,//控制视频
			showTip:false,//显示提示
			total:1,//页面条数
			current:1,//当前页
			bbsWorkTitle:'',//发帖标题
			sendBtn:true,//发帖
			showMsg:false,//验证字数
			editor:{},
			list:[],//列表
			showEditor:false,//显示富文本
			topList:[],
			inputsearch:'',
			url:''
		}
	},
	methods:{
		checklike(id,status){//点赞 
			let token;
			token = localStorage.getItem("token")
			this.$http.post('/api/addBbsArticleLove',{'id':id,'status':status,'token':token}).then((res)=>{
				this.tablist();
				// 刷新echarts
				this.topLists();
			})
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
		changePage (num) {//分页
            this.current = num;
            this.tablist();
        },
		tablist () {
			let current = this.current;
			let token;
			token = localStorage.getItem("token")
			this.$http.post('/api/BbsArticleList',{'current':current,'token':token}).then((res)=>{
					if(res.data.data == ""){
			        	this.showTip = true;
			        }else{
			        	this.showTip = false;
			        }
					res.data.data.forEach((item)=>{
					item['status'] = false;

				})
				this.$set(this.$data,'list',res.data.data);
				this.total = res.data.total;
			})	
		},
		searchList(){//查询
			let current = this.current;
			this.$http.post('/api/getListResult',{'current':current,'title':this.inputsearch}).then((res)=>{
				if(res.data.data.data== ""){
			        	this.showTip = true;
			        }else{
			        	this.showTip = false;
			        }
				this.$set(this.$data,'list',res.data.data.data);
				this.total = res.data.data.total;
			})	
		},
		sendMsg(){
			this.showEditor = true;
			this.sendBtn = false;
		},
		cancelEditor(){
			this.showEditor = false;
			this.sendBtn = true;
			this.wangeditclear();
		},
		wangeditclear () {//清除富文本编辑器
			document.getElementById('BBSeditor').innerHTML = "";
			this.bbsWorkTitle = "";
		},
		articalSave () {
			let auther = localStorage.getItem("username");
			// 发表文章
			if (this.bbsWorkTitle == "" || this.bbsWorkTitle.length > 35) {
				// 文章校验
				this.showMsg = !this.showMsg;
			}else{
				this.$http.post('/api/addBbsArticle',{
					'auther':auther,
					'title': this.bbsWorkTitle,
					'content':this.editor.$txt.html()
				}).then((res)=>{
					// 发表文章返回信息
					if (res.data.type) {
						this.$Modal.success({
			                    title: "提示",
			                    content: res.data.data,
			                    onOk: () => {
								this.showEditor = !this.showEditor;
								this.sendBtn = !this.sendBtn;
								this.wangeditclear();
								this.tablist();	
							}
			                })	
					}else{
						this.$Modal.error({
			                    title: "提示",
			                    content: res.data.data
			                })	
					}
				})
			}
		},
		topLists(){//初始化top5
			this.$http.post('/api/getTopList').then((res)=>{
				let _data = res.data.data;
				this.topList = _data;
				_data.forEach((item)=>{
					item['value'] = item.thumb_up;
					item['name'] = item.title;					
					delete item.thumb_up;
					delete item.title;
				})
				  this.options(_data) 
			})
			
		},
		options(data){//投票图表  
			var myChart = echarts.init(document.getElementById('mainpie'));       
			var option = {
			 title: {
		        text: '话题TOP5',
		        left: 'center',
		        top: 10,
		        textStyle: {
		            color: '#000'
		        }
		    },

		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },

		    visualMap: {
		        show: false,
		        min: 0,
		        max: 4,
		        inRange: {
		            colorLightness: [0, 1]
		        }
		    },
		    series : [
		        {
		            name:'话题',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            data:data,
		            roseType: 'angle',
		            label: {
		                normal: {
		                    textStyle: {
		                        color: '#999'
		                    },
				            formatter:function(data){ //让series中的文字进行换行  
		                     return data.name.substr(0,4);  
		                    }
		                }
		             	 
		            },
		            labelLine: {
		                normal: {
		                    lineStyle: {
		                        color: '#999'
		                    },
		                    smooth: 0.2,
		                    length: 5,
		                    length2: 20
		                }
		            },
		            itemStyle: {
		                 normal: {
		                    color: '#39f'
		             
		                }
				        
		            },

		            animationType: 'scale',
		            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
				            }
				        }
				    ]
				};
				// 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
        	}
	},
	mounted () {
		//富文本
		let editor = new wangEditor('BBSeditor');
		this.$set(this.$data,'editor',editor);
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
        this.tablist();
        this.topLists();
        this.options();

	}
}
</script> 
