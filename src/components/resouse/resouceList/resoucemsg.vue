<!-- resource编辑 -->
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
	<!-- 类型 -->
	<div class="marTop20 borderNone">
	<span>类型：</span>
	<Select v-model="selectvalue" style="width:200px" class="borderNone">
        <Option v-for="item in optiomList" :value="item" :key="item">{{ item }}</Option>
    </Select>
	</div>
	<!-- 编辑器 -->
	<div class="marTop20">
        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
    </div>
    <!-- 发表 -->
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
	import { quillEditor } from 'vue-quill-editor'
	export default {
	    data() {
	        return {
	        	token:'',
				content: '',
				title:'',
				selectvalue:'',
				optiomList:[],
			    editorOption: {}
	        }
	    },
	    methods:{
	    	list(){//面包屑跳转路由
		          let that = this;
		          that.$router.push({ path: 'resouce_list'})
		    },
		    onEditorChange({ editor, html, text }) {
                this.content = html;
            },
			submit(){
				let type = this.selectvalue;
			    let title = this.title;
			    let content = this.content;
			    let autherId = this.token
			    let mark = this.$route.query.id;
			    if(type != "" && title != "" && content!= ""){			    
		        if(mark != undefined){
	     		//更新				    
				this.$confirm('是否更新文章？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		           this.$http.post("/api/resouceUpdate",{"title":title,"autherId":autherId,"content":content,"id":mark,'type':type}).then((response)=>{
					    let that = this;
					    that.$router.push({ path: 'resouce_list' })
					})		          
		        })			       
	     		}else{	     			     	
	     		//发表			    
				this.$confirm('是否发表文章？', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			        }).then(() => {
			        	this.$http.post("/api/addresouce",{"title":title,"autherId":autherId,"content":content,'type':type}).then((response)=>{
				    let that = this;
				    that.$router.push({ path: 'resouce_list' })
					})          
					}) 
			    }		        	
			    }else{
			    	this.$confirm('请填写完整', '提示', {
				        confirmButtonText: '确定',
				        cancelButtonText: '取消',
				        type: 'warning'
			        })	
			    }	     		
			},
			replay(mark){//编辑
				this.$http.post("/api/searchresouce",{"id":mark}).then((response)=>{
	              let _data = response.data.data;  
	              console.log(_data)  
	              this.title = _data[0].title;
	              this.content = _data[0].content;
	              this.selectvalue = _data[0].type; 

	        	})
			},
			readyselect(){//类型
			  let total = localStorage.getItem("token");			  
	          this.$http.post("/api/searchToken",{'token':total}).then((response)=>{
	          let _data = response.data;       
	          	this.optiomList = _data.data[0].permissions.split(',');	              
	        })
	        }
		},
		components: {
		    quillEditor
		},
		mounted: function () {
			this.readyselect();
	      	let mark = this.$route.query.id;
	        if(mark != undefined){
		        this.replay(mark);
		    }
		    let total = localStorage.getItem("token");
			this.token =total;
	    },
		computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>