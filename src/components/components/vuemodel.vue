<template>
	<div class="vuemodel">
	<div class="vuemodel_main">
		<div class="vuemodel_main_left">
			<div width="200px" class="vuemodel_nav">
			        <div class="vuemodel_add">
			             <Button type="warning" icon="plus" class="borderNone pull-right addbtn" @click="addblock">{{ message }}</Button>			       		
			        	 <Button type="primary" icon="plus" class="borderNone pull-right addbtn" @click="addHtmlCode">添加模块</Button>
			        	 <Button type="success" icon="plus" class="borderNone pull-right addbtn" @click="saveTemplate">生成模板</Button>

			        </div>
			        <!-- 取消左边栏 -->
					<!-- <div>
						<ul>
							<li v-for="item in list">
								<span>
									<Icon type="gear-a"></Icon>
								</span>
								<a href="javascript:;">{{item.title}}</a>
							</li>
						</ul>
					</div> -->
					<!-- 添加布局区块弹窗 -->
				    <Modal
				         v-model="modal"
				         title="添加布局">
				         <block @status="getstatus" @oksave="oksave" @templateCode="templateCode"></block>
				    </Modal>											
			</div>
		</div>
		<div class="vuemodel_main_right">
			<div class="vuemodel_content">
				<div class="vuemodel_content_main">
					<!-- 内容 -->
					 <component :status="choose" :is="item" @code="code" v-for="item in View_code" :key="item"></component>
					 <Modal
		                v-model="modal_"
		                title="区块创建"
		                @on-cancel="closemodal">
		                <!-- 内容区 -->
		                <div class="codearea">
		                     <Input placeholder="组件名称" class="borderNone" v-model="titlecode"></Input>
		                </div>		      
		                <p>组件Name</p>
		                <div class="">
		                    <codemirror v-model="htmlcode" :options="editorOptionhtml" ref="codeEditor"  @change="onEditorCodeChangehtml"></codemirror>
		                </div>
		                <p>组件基本配置</p>
		                <div class="">
		                    <codemirror v-model="htmlcode2" :options="editorOption" ref="codeEditor"
		                    @change="onEditorCodeChangehtml2"></codemirror>
		                </div>
		                <div class="mar_t20 clearfix">
		                    <Button type="ghost" class="borderNone pull-right" @click="cancel" style="margin-left:10px;">取消</Button>
		                    <Button type="success" @click="oksave" class="pull-right borderNone">新建</Button>
		                </div>
		                <div slot="footer"></div>
		            </Modal>
				</div>
			</div>	
		</div>
	</div>
		
	</div>
	
</template>
<style lang="less">
	.body{
		width: 100%;
		height: 100%;
	}
	.clearfix {
	    *zoom: 1;
	}

	.clearfix:before,
	.clearfix:after {
	    display: table;
	    line-height: 0;
	    content: "";
	}

	.clearfix:after {
	    clear: both;
	}
	.vuemodel {
		overflow: hidden;
		width: 100%;
		height: 100%;
		margin:0;
		padding: 0;
		box-sizing: border-box;
		margin-top:70px;
		.pull-left {
			float:left;
		}
		.clearfix {
			clear:both;
		}		
		.vuemodel_main{
			width: 100%;
			min-height: 1200px;
		    display: flex;
			.vuemodel_main_left{
				-webkit-box-flex: 1;     
				-moz-box-flex: 1;         
				width: 20%;              
				-webkit-flex: 1;          
				-ms-flex: 1;            
				flex: 1;   				
				min-height: 1200px;	
				border-right:1px solid #ccc;			
				.vuemodel_nav {		
					height: auto;
					min-width: 200px;
					.vuemodel_add {
						height:45px;
						margin-top:5px;
						.addbtn {
							width: 190px;
							margin:2px 5px 5px 0;
						}
					}
					ul {
						background: #FFFFFF;
					    float: left;
					    position: relative;
					    width: auto;
					    top: -1px;
					    z-index: 199;
					    margin-top:10px;
							li {
							position: relative;
						    line-height: 38px;
						    color: #4f4f4f;
						    cursor: pointer;
						    background: #FFFFFF;			   
						    span {
						    	position: relative;
						    	text-align: center;
							    float: left;
							    margin: 0;
							    padding: 0;
							    display: block;
							    height: 37px;
							    line-height: 1.5;
							    width: 40px;
							    clear:left;
							    color: #ccc;
							    z-index: 9;
							    i{
							    	font-size: 20px;
							    }
						    }
						    a {
						    	color:#666;
						    	font-size:14px;
						    	float: left;
						    	text-decoration: none;
						    	display: block;
							    height: 37px;
							    line-height: 1.5;
						    }
						}

					}
				}
			}
			.vuemodel_main_right{
				-webkit-box-ordinal-group: 2;
				-moz-box-ordinal-group: 2;
				-ms-flex-order: 2;           
				-webkit-order: 2;              
				order: 2;                       			
				min-height: 1200px;
				.vuemodel_content {					
					width: 1148px;
				    overflow: hidden;									
				}

			}
		}
		
		
	}
</style>
<script>
// require active-line.js
require('codemirror/addon/selection/active-line.js')
// autoCloseTags
require('codemirror/addon/edit/closetag.js')
import { codemirror } from 'vue-codemirror';
import block from './contents/block.vue';
export default {
	 name: "vuemodel",
	 data () {
	 	return {
	 		// 创建区块模板
	 		View_code: ["combtn"],
	 		modal:false,
	 		modal_:false,
	 		message: "页面预览",
	 		localData:[],
	 		choose: true,
	 		localValue:"",
	 		titlecode:'',//标题
	 		htmlcode: '',
	 		htmlcode2: '',
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
            editorOption: {
              tabSize: 4,
              styleActiveLine: true,
              line: true,
              mode: 'text/html',
              lineWrapping: true,
              theme: 'monokai'
            },
            template_code:'',
            html_code:''
	 	}
	 }, 
	 methods: {
	 	//模态窗显示
	 	addHtmlCode(){
	 		this.modal_ = true;
	 	},
	 	addblock() {          
            this.choose = !this.choose;
            if (this.choose) this.message = "页面预览";
            else this.message = "关闭预览";
        },
        getstatus(a) {
            this.modal = a;
        },
        //获取选中模板
        templateCode(code){

        },
	 	//取消
	 	cancel(){
	 		this.modal_ = !this.modal_;
	 		this.titlecode = "";
	 		this.htmlcode = "";
	 		this.htmlcode2 = "";
	 	},
	 	// 执行保存
	 	oksave(){	
	 		let self = this; 	
            this.$http.post("/api/templateAdd",{
                author: this.$store.getters.username,
                title: this.titlecode,
                html: this.htmlcode,
                html2: this.htmlcode2
            }).then((res)=>{
                this.$Modal.success({
                    title: "提示",
                    content: res.data.data,
                    onOk: ()=>{
                        self.modal_ = !self.modal_;  
                        self.getList();                   
                    }
                });
            })
	 	},
	 	//清空
	 	closemodal(){

	 	},
	 	onEditorCodeChangehtml(newCode) {//代码编辑器---html
                this.htmlcode = newCode;
        },
        onEditorCodeChangehtml2(newCode) {//代码编辑器---html
            this.htmlcode2 = newCode;
        },
        code(code){
        	// 初始化
        	if (code) {
        		this.View_code.push("combtn");
        	}
        },
        //保存模板
        saveTemplate(){
        	let self = this; 	
            this.$http.post("/api/creatTemplate",{
                author: this.$store.getters.username,
                name : this.$route.query.name,
                proname: this.$route.query.objname,//项目名称
                sysname: this.$route.query.sys,//系统名称
                template_code: JSON.stringify(this.template_code),//源码
                html_code:JSON.stringify(this.html_code),
            }).then((res)=>{
                this.$Modal.success({
                    title: "提示",
                    content: res.data.data                   
                });
                console.log(res.data.data)
            })
        }
	},
	components: {
        block
    }
}
</script>
