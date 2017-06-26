<template>
    <div class="comp_content">
        <!-- 标题 -->
        <div class="comp_content_title mar_t15">
                <Input style="width: 250px" class="borderNone" v-model="search"></Input>
                <Button type="primary" class="borderNone" @click="goSearch" icon="search">搜索</Button>
                <Button type="primary" class="borderNone" @click="openModel" icon="plus">创建</Button>
                <Button  type="ghost" class="borderNone" @click="clearInput">重置</Button>
        </div>
        <!-- 内容 -->
        <div class="mar_t15">
                <Table stripe border :columns="dataTitle" :data="dataSouce"></Table>
        </div>
        <div class="text-center mar_t15">
            <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
        </div>
        <!-- 模态窗 -->
        <div>
            <Modal
                v-model="modal_"
                title="区块创建"
                @on-cancel="closemodal">
                <!-- 内容区 -->
                <div class="codearea">
                     <Input placeholder="标题" class="borderNone" v-model="titlecode"></Input>
                </div>
                <p  class="modelerr" v-show="title_"><Icon type="asterisk" ></Icon>请输入标题</p>
                <p>HTML</p>
                <div class="">
                    <codemirror v-model="htmlcode" :options="editorOptionhtml" ref="codeEditor"  @change="onEditorCodeChangehtml"></codemirror>
                </div>
                <p  class="modelerr" v-show="html_"><Icon type="asterisk" ></Icon>请输入区块html</p>
                <p>CSS</p>
                <div class="">
                    <codemirror v-model="csscode" :options="editorOption" ref="codeEditor"
                    @change="onEditorCodeChangecss"></codemirror>
                </div>
                <p  class="modelerr" v-show="css_"><Icon type="asterisk" ></Icon>请输入区块css</p>
                <div class="mar_t20 clearfix">
                    <Button type="ghost" class="borderNone pull-right" @click="cancel" style="margin-left:10px;">取消</Button>
                    <Button type="success" @click="oksave" class="pull-right borderNone">新建</Button>
                </div>
                <div slot="footer"></div>
            </Modal>
        </div>
    </div>
</template>
<style lang="less">
    .modelerr {
        color: red;
    }
    .codearea {
        margin-top: 10px;
        textarea {
            height: 120px !important;
            overflow-y: scroll;
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
        name: 'block',
        data () {
            return {
                code:'',
                addText: "",
                html_:false,
                search: "",
                titlecode: "",
                css_:false,
                codeid: "",
                title_: false,
                total: 0,
                current: 1,
                modal_: false,
                dataTitle: [
                    {
                        title: '名称',
                        align: "center",
                        key: 'title'
                    },
                    {
                        title: '最后操作人',
                        align: "center",
                        width:"180",
                        key: 'name'
                    },
                    {
                        title: '操作',
                        align: "center",
                        render: (h,params) =>{
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
                                            // 添加状态控制两个弹框同时出现的情况
                                            this.$emit("status",false);
                                            this.changecode(params.row.id)
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
                                            this.delcode(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                      }
                    }],
                dataSouce: [],
                htmlcode: '',
                csscode: '',
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
                  mode: 'text/css',
                  lineWrapping: true,
                  theme: 'monokai'
                }
            }
        },
        methods: {
            clearInput(){
                //清空输入
                this.search = '';
                this.openList(1);
            },
            changePage (val) {
                this.openList(val);
            },
            goSearch () {
                this.openList(1);
            },
            changecode (id) {
                 this.modal_ = !this.modal_;
                 this.$http.post("/api/searchblock",{id:id}).then((res)=>{
                        let data = res.data.data;
                        this.$set(this.$data,'htmlcode',data[0].html_code);
                        this.$set(this.$data,'csscode',data[0].css_code);
                        this.$set(this.$data,'titlecode',data[0].title);
                 })
                 this.codeid = id;
            },
            delcode (id) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "确定删除区块！",
                    onOk: ()=>{
                        this.$http.post("/api/delblock",{
                            id:id
                        }).then((res)=>{
                            this.openList(1);
                        })
                    }
                });
            },
            openModel() {//创建modal
                this.modal_ = !this.modal_;
                this.titlecode = '';
                this.htmlcode = '';
                this.csscode = '';
                this.html_ = false;
                this.css_ = false;
                this.title_ = false;
                this.$emit("status",false);
            },
             oksave () {//新建

                if(this.titlecode == ""){
                    this.title_ = true;
                    return;
                }
                if(this.htmlcode == ""){
                    this.html_ = true;
                    return;
                }
                if(this.csscode == ""){
                    this.css_ = true;
                    return;
                }
                else{

                    // 执行保存
                    this.$http.post("/api/addblock",{
                        name: this.$store.getters.username,
                        title: this.titlecode,
                        html_code: this.htmlcode,
                        id: this.codeid,
                        css_code: this.csscode
                    }).then((res)=>{
                        this.$Modal.success({
                            title: "提示",
                            content: res.data.data,
                            onOk: ()=>{
                                this.openList(1);
                                this.modal_ = !this.modal_;
                                this.html_ = false;
                                this.css_ = false;
                                this.title_ = false;
                                this.$emit('oksave',true);
                            }
                        });
                    })

                }

            },
            cancel () {// 点击取消
                this.modal_ = !this.modal_;
                this.titlecode = '';
                this.csscode = '';
                this.htmlcode = '';

            },
            closemodal(){//右上角的关闭按钮，关闭时清空
                this.titlecode = '';
                this.csscode = '';
                this.htmlcode = '';
            },
            openList (num) {//初始化列表
                this.$http.post("/api/blockList",{
                    search: this.search,
                    current: num
                }).then((res)=>{
                    this.$set(this.$data,'dataSouce',res.data.data.data);
                    this.$set(this.$data,'total',res.data.data.total);
                })
            },
            onEditorCodeChangehtml(newCode) {//代码编辑器---html
                this.htmlcode = newCode;
            },
            onEditorCodeChangecss(newCode) {//代码编辑器---css
                this.csscode = newCode;
            }
        },
        computed: {
            editor() {
                return this.$refs.codeEditor.editor
            }
        },
        mounted() {
            this.openList(1);
        }
    }
</script>
