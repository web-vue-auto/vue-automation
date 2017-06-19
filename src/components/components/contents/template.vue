<!-- 模板 -->
<template>
    <div class="template">
    	<!-- 查询 -->
        <div class="text-center">
            <Input v-model="searchvalue" placeholder="模板" style="width: 300px" class="borderNone"></Input>
            <Button type="primary" icon="ios-search" class="borderNone" @click="searchtemplate">搜索</Button>
            <Button  type="primary" class="borderNone" @click="create" icon="plus">新增</Button>
            <Button  type="ghost" class="borderNone" @click="clearInput">重置</Button>
        </div>
        <!-- 新增模板 -->
        <Modal
	        v-model="addmodal"
	        title="新增模板"
	        @on-cancel="closemodal"
	    >
	       <div>
	       	 <Input v-model="templatename" placeholder="请输入模板名称..." class="borderNone" style="width: 300px"></Input>
	       	<p  class="modelerr" v-show="showtitle"><Icon type="asterisk" ></Icon>请输入标题</p>
	       	<div class="mar_t20">	
	       		<p>HTML</p>       	  
	       	 	<codemirror v-model="htmlcode" :options="editorOptionhtml" ref="codeEditor" @change="onEditorCodeChangehtml"></codemirror>
	       	 	<p  class="modelerr" v-show="showhtml"><Icon type="asterisk" ></Icon>请输入区块html</p>
	       	 	<p>CSS</p>
	       	 	<codemirror v-model="csscode" :options="editorOptioncss" ref="codeEditor" @change="onEditorCodeChangecss"></codemirror>
	       	 	<p  class="modelerr" v-show="showcss"><Icon type="asterisk" ></Icon>请输入区块css</p>
	       	</div>
	       	<div class="mar_t20 clearfix">
	       		<Button type="ghost" class="borderNone pull-right" @click="cancel" style="margin-left:10px;">取消</Button>
	       		<Button type="success" @click="okAdd" class="pull-right borderNone">新建</Button>	       
	       	</div>
	       </div>
	       <div slot="footer"></div>        
       	</Modal>
	    <!--  模板列表 -->
	    <div class="container mar_t20">
	        <div class="box" v-for="item in list">	   
	            <div class="box-content">
	                <h3 class="title">{{item.title}}</h3>
	                <span class="post">{{item.author}}</span>
	                <ul class="icon">
	                    <li @click="editcode(item.id)"><a href="#"><Icon type="edit"></Icon></a></li>
	                    <li @click="deletecode(item.id)"><a href="#"><Icon type="close"></Icon></a></li>                       
	                </ul>
	            </div>
	        </div>
		</div>   
		<!-- 分页 -->
		<div class="tablepage text-center clearfix">
            <Page :total="total" @on-change="changePage" show-total :current="current"
            ></Page>
        </div>     	
    </div>
</template>
<style lang="less">
	.template {
		overflow: hidden;
		.mar_t20 {
			margin-top:20px;
		}
		//模板效果		
		.box {
			float: left;
			width:300px;
			margin:10px;
		    text-align: center;
		    overflow: hidden;
		    position: relative;
		    min-height: 200px;
		    border:1px solid #ccc;
		}
		.box:before {
		    content: "";
		    width: 0;
		    height: 100%;
		    background: #000;
		    padding: 14px 18px;
		    position: absolute;
		    top: 0;
		    left: 50%;
		    opacity: 0;
		    transition: all 500ms cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
		}
		.box:hover:before {
		    width: 100%;
		    left: 0;
		    opacity: 0.5;
		}
		.box img {
		    width: 100%;
		    height: auto;
		}
		.box .box-content {
		    width: 100%;
		    padding: 14px 18px;
		    color: #fff;
		    position: absolute;
		    top: 38%;
		    left: 0;
		}
		.box .title {
			color:#666;
		    font-size: 25px;
		    font-weight: 600;
		    line-height: 30px;
		    text-transform: uppercase;
		    margin: 0;
		    transition: all 0.5s ease 0s;
		}
		.box .post {
			color:#666;
		    font-size: 15px;
		    text-transform: capitalize;
		    transition: all 0.5s ease 0s;
		}
		.box .icon {
		    padding: 0;
		    margin: 0;
		    list-style: none;
		    margin-top: 5px;
		}
		.box .icon li {
		    display: inline-block;
		}
		.box .icon li a {
		    display: block;
		    width: 40px;
		    height: 40px;
		    line-height: 40px;
		    border-radius: 50%;
		    background: #f74e55;
		    font-size: 20px;
		    font-weight: 700;
		    color: #fff;
		    margin-right: 5px;
		    opacity: 0;
		    transform: translateY(50px);
		    transition: all 0.5s ease 0s;
		}
		.box:hover .icon li a {
		    opacity: 1;
		    transform: translateY(0px);
		    transition-delay: 0.5s;
		}
		.box:hover .icon li:last-child a {
		    transition-delay: 0.8s;
		}
		@media only screen and (max-width:990px) {
		    .box{ 
		    	margin-bottom: 30px;
		    }
		}
	}
</style>
<script>
 // require active-line.js
 require('codemirror/addon/selection/active-line.js')
 // autoCloseTags
 require('codemirror/addon/edit/closetag.js')
import { codemirror } from 'vue-codemirror'
	export default {
		components: {
	      codemirror
	    },
		data(){
			return{
				showtitle:false,
				showhtml:false,
				showcss:false,
				addmodal:false,//新增
				total:1,//页面条数
			  	current:1,//当前页
				searchvalue:'',//查询模板
				templatename:'',//模板名称
				htmlcode: '',
		        csscode: '',
		        list:[],
		        editorOptionhtml: {
		          tabSize: 4,
		          styleActiveLine: true,
		          lineNumbers: true,
		          autoCloseTags: true,
		          line: true,
		          mode: 'text/html',
		          theme: 'monokai'
		        },
		        editorOptioncss: {
		          tabSize: 4,
		          styleActiveLine: true,
		          line: true,
		          mode: 'text/css',
		          lineWrapping: true,
		          theme: 'monokai'
		        }
			}
		},
		methods:{
			clearInput(){//清空输入
				this.searchvalue = '';
				this.templateList();
			},
			searchtemplate(){//查询
				this.$http.post("/api/searchTemplateList",{"search":this.searchvalue,"current":this.current}).then((res)=>{
                        let data = res.data.data.data;
                        this.list = data;
                        this.total = res.data.data.total;
                })
			},
			onEditorCodeChangehtml(newCode) {//代码编辑器---html
                this.htmlcode = newCode;
            },
            onEditorCodeChangecss(newCode) {//代码编辑器---css
                this.csscode = newCode;
            },
            create(){//新建
            	this.addmodal = !this.addmodal;
            	this.templatename = '';
            	this.htmlcode = '';
            	this.csscode = '';            	
            },
		    okAdd(){//新增模板                         
		    	if(this.templatename == ""){                  
                    this.showtitle = true;
                    return;
                }
                if(this.htmlcode == ""){                  
                    this.showhtml = true;
                    return;
                }
                if(this.csscode == ""){
                    this.showcss = true;
                    return;
                }
                else{                   
                    // 执行保存
                    this.$http.post("/api/templateAdd",{
                    	id:"",
                        author: this.$store.getters.username,
                        title: this.templatename,
                        html: this.htmlcode,
                        css: this.csscode
                    }).then((res)=>{
                        this.$Modal.success({
                            title: "提示",
                            content: res.data.data,
                            onOk: ()=>{
                            	this.templateList();
                                this.addmodal = !this.addmodal;
                                this.showhtml = false; 
                                this.showcss = false;
                                this.showtitle = false;
                            }
                        });
                    })                    

                }
		    },
		    cancel(){//取消
		    	this.addmodal = !this.addmodal;
		    	this.templatename = '';
		    	this.htmlcode = '';
		    	this.csscode = '';
		    },
		    closemodal(){//右上角的关闭按钮，关闭时清空
		    	this.templatename = '';
		    	this.htmlcode = '';
		    	this.csscode = '';
		    },
		    editcode(id){//编辑
		    	this.addmodal = !this.addmodal;
		    	this.$http.post("/api/templateDetails",{"id":id}).then((res)=>{  
		    			let data = res.data.data;
                        this.templatename = data[0].title;
                        this.htmlcode = data[0].html_code;
                        this.csscode = data[0].css_code;
                }) 

		    },
		    deletecode(id){
		    	this.$Modal.confirm({
                    title: "提示",
                    content: "确定删除区块！",
                    onOk: ()=>{
                        this.$http.post("/api/templateDelete",{
                            id:id
                        }).then((res)=>{
                            this.templateList(1);
                        })
                    }
                });
		    },
		    templateList(){
		    	this.$http.post("/api/templateList",{"current":this.current}).then((res)=>{                     
                       
                       this.list = res.data.data;
                       this.total =res.data.total;
                       console.log(res.data.data)
                }) 
		    },
		    changePage (val) {
		    	this.current = val;		    	
                this.templateList();
            }
		},
		computed: {
      		editor() {
	        	return this.$refs.codeEditor.editor
	      	}
	    },
	    mounted() {
	      	this.templateList();
	    }
	}
</script>