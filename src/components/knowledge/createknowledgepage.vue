<!-- 新建编辑 -->
<template>
<div class="clearfix publish">
	<div class="markdown">
		<!-- 面包屑 -->
		<div>
			<Breadcrumb>		 
		        <Breadcrumb-item><a href="javascript:;" @click="list">文章列表</a></Breadcrumb-item>
		        <Breadcrumb-item>编辑器</Breadcrumb-item>
		    </Breadcrumb>
		</div>
		<div class="marTop20">
			<Input placeholder="请输入标题" class="borderNone" v-model="title"></Input>
		</div>
		<!-- 编辑器 -->
		<div class="marTop20">
	        <div id="vueeditor" style="height:400px;max-height:500px;" >
				<p></p>
			</div>
	    </div>
		<Button type="primary" class="marTop20 borderNone"  @click="submit">发表</Button>
	</div>
</div>
</template>
<style>
	.publish{margin:20px;}
	.publish .title{font-size: 30px;line-height: 40px;font-weight: bold;}
	.publish .line{border:1px dotted #ccc;}
	.publish .padtop20{padding-top: 20px;}
	.publish .markdown{margin:20px 80px;}
	.publish .marTop20{margin-top: 20px;}
	.publish .ql-container .ql-editor {min-height: 20em;padding-bottom: 1em;max-height: 25em;}
	.borderNone input {border-radius: 0 !important;}
</style>
<script>
	export default {
	    data() {
	        return {
	        	token:'',
				content: '',
				title:'',
				editor:{},
			    editorOption: { }//编辑器
	        }
	    },
	    methods:{
	    	list(){//面包屑跳转路由
		          let that = this;
		          that.$router.push({ path: 'knowledge'})
		    },
			submit(){//发表
				let that = this;
			    let editor = this.editor;  
				// 获取编辑器纯文本内容
		        let html = editor.$txt.html();
		        //标题				
			    let title = this.title;
			    //发布内容
			    let content = html;
			    //当前操作人
			    let autherId = this.token;
			    let mark = this.$route.query.id;
			   	if(title != "" && content != ""){
			   		if(mark != undefined){
	     			//更新			   
				    this.$Modal.confirm({
	                    title: "提示",
	                    content: "是否更新文章？",
	                    onOk () {
	                      this.$http.post("/api/knowledgeUpdate",{"title":title,"autherId":autherId,"content":content,"id":mark}).then((response)=>{				   
						   		 that.$router.push({ path: 'knowledge' })	
						})
	                    }
	                })			      
	     		}else{
	     		//发表
		     		this.$Modal.confirm({
	                    title: "提示",
	                    content: "是否发表文章？",
	                    onOk () {
	                      this.$http.post("/api/knowledgeAdd",{"title":title,"autherId":autherId,"content":content}).then((response)=>{							   
							    that.$router.push({ path: 'knowledge' })	
						})
	                    }
	                })
		     	}	
			    }else{			   
			        this.$Modal.info({
	                    title: "提示",
	                    content: "请填写完整"	              
	                })

			    }
			},
			replay(mark){//返显
				this.$http.post("/api/knowledgeReplay",{"id":mark}).then((response)=>{
	              let _data = response.data;   
	              this.title = _data[0].Title;
	              let editor = this.editor; 
	              editor.$txt.html(_data[0].content);
	             
	        	})
			}
		},
		mounted: function () {
	      	let mark = this.$route.query.id;
	        if(mark != undefined){
		        this.replay(mark);
		    }
		    let total = localStorage.getItem("token");
			this.token =total;

			//富文本
			let editor = new wangEditor('vueeditor');
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

        	


	    }
    }
</script>