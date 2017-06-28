<template>
    <div class="comp_content">
       <table class="mark_list clearfix">
       <tr>
            <td class="w30 list_msg">代理后台IP地址</td>
            <td>
                <Input placeholder="例：192.168.1.1" style="width: 300px" class="borderNone" v-model="data.ip"></Input>
           </td>
       </tr>
       <tr>
            <td class="w30 list_msg">代理后台根目录</td>
            <td>
                <Input placeholder="例：/api/" style="width: 300px" class="borderNone" v-model="data.root"></Input>
           </td>
       </tr>
       <tr>
           <td class="w30 list_msg">VUE模块名称</td>
           <td class="w70">
                <Input  placeholder=".vue文件名称" style="width: 300px" class="borderNone" v-model="data.name"></Input>
           </td>
        </tr>
        <tr>
           <td class="w30 list_msg">项目名称</td>
           <td class="w70">
                <Input placeholder="项目命名" style="width: 300px" class="borderNone" v-model="data.objname"></Input>
           </td>
        </tr>
        <tr>
           <td class="w30 list_msg">所属系统</td>
           <td class="w70">
                <Select v-model="model1" style="width:300px" class="borderNone">
                    <Option v-for="item in systemData" :value="item.id" :key="item">{{ item.name }}</Option>
                </Select>
                <span class="addsysoptin" @click="add">添加系统</span>
           </td>
        </tr>
        <tr>
           <td class="w30 list_msg">测试服务端口号</td>
           <td class="w70">
                <Input placeholder="临时服务端口号" style="width: 300px" class="borderNone" v-model="data.ssd"></Input>
           </td>
        </tr>
        <!-- <tr>
           <td class="w30 list_msg">框架模板</td>
           <td class="w70">
                <div>
                    <Select v-model="localValue" style="width:300px">
                        <Option v-for="item in localData" :value="item.id" :key="item">{{ item.title }}</Option>
                    </Select>
                    <span class="addsysoptin" @click="addblock">添加布局</span>
                </div>
           </td>
        </tr> -->
        <tr>
         <td>
            <p v-if="create.status">
                <span>创建人/创建时间</span>
                <span>{{ create.msg }}</span>
            </p>
            <p v-if="update.status">
                <span>更新人/更新时间</span>
                <span>{{ update.msg }}</span>
            </p>

         </td>
         <td></td>
        </tr>
       </table>
       <div class="text-center mar_20">
            <Button type="primary" class="borderNone" @click="newprject()">创建项目工程</Button>
            <Button type="success" class="borderNone" @click="getout()">进入列表(已有工程)</Button>
       </div>
       <!-- 系统弹窗 -->
       <Modal
          v-model="modal_"
          title="添加系统">
          <syschange></syschange>
      </Modal>
      <!-- 添加布局区块弹窗 -->
      <Modal
         v-model="modal"
         title="添加布局">
         <block @status="getstatus" @oksave="oksave"></block>
     </Modal>
     <!-- 显示提示框 -->
     <Modal
        v-model="returnMsg.status"
        title="消息">
        <p>{{ returnMsg.msg1 }}</p>
        <div slot="footer">
            <Button type="success" @click="opentemplate">进入页面构建(推荐)</Button>
        </div>
    </Modal>
     <Spin size="large" fix v-if="loading"></Spin>
     <Spin fix v-if="sys_loading">系统正在创建项目，请稍等...</Spin>
    </div>
</template>
<style lang="less">
    .npmReturn {
      overflow: scroll;
      width: 100%;
    }
    .comp_content {
        .comp_content_title {
            text-align: center;
        }
        .comp_content > div {
                width: 80%;
                margin: 20px auto;
        }
        .ivu-select-selection {
            border-radius: 0 !important;
            text-align: left;
        }
        .mar_t15{
            margin-top:15px;
        }
        .mar_20{
            margin: 20px 0;
        }
        .mark_list {
            width: 100%;
            tr {
                border:1px solid #ccc;
                border-bottom:none;
                padding:10px;
                td {
                    padding:10px;
                }
            }
            tr:last-child {
                border-bottom: 1px solid #ccc;
            }
            .list_msg {
                text-align: center;
                line-height: 1;
                font-weight: 700;
                font-size: 16px;
                border-right:1px solid #ccc;

            }
            .w30 {
                width:30%;
            }
            .w70 {
                width: 70%;
            }
        }
    }
    .addsysoptin {
      margin-left: 10px;
      text-decoration: underline;
      cursor: pointer;
    }
</style>
<script>
import syschange from "./contents/syschange.vue";
import block from './contents/block.vue';
export default {
        name: 'components',
        data () {
            return {
                currentView: bt,
                returnMsg: {
                  status: false,
                  msg1: ""
                },
                data: {
                  ip: "",
                  ssd: "",
                  name: "",
                  objname: "",
                  root: "",
                },
                addText: "",
                modal_: false,
                loading: false,
                sys_loading: false,
                update: {
                  status: false,
                  msg: ""
                },
                create: {
                  status: false,
                  msg: ""
                },
                modal: false,
                system: [
                    {
                        title: '系统名称',
                        align: "center",
                        key: 'name'
                    },
                    {
                        title: '最后操作人',
                        align: "center",
                        key: 'last_person'
                    },
                    {
                        title: '操作',
                        align: "center",
                        render () {
                            return `<i-button type="text" size="small">删除</i-button>`;
                        }
                    }
                ],
                systemData:[],
                localData:[],
                templateList: [],
                templateValue: "",
                localValue:"",
                model1: ''
            }
        },
        methods: {
            oksave() {
              this.addlocal();
            },
            getout() {
              this.$set(this.$data,'loading',true);
              setTimeout(()=>{ this.$router.push({ name : "vuecli" }) },1000);
            },
            getstatus(a) {
              this.modal = a;
            },
            add() {
              this.modal_ = !this.modal_;
            },
            addblock() {
              this.modal = !this.modal;
            },
            addsys() {
                this.$http.post("/api/getnewSystem").then((res)=>{
                    this.$set(this.$data,'systemData',res.data.data);
                })
            },
            addlocal () {
                this.$http.post("/api/blockListDrop").then((res)=>{
                    this.$set(this.$data,'localData',res.data.data);
                });
            },
            newprject () {
                this.sys_loading = !this.sys_loading;
                setTimeout(() => {
                  this.$http.post("/api/copyFile",{
                    ip: this.data.ip,
                    ssd: this.data.ssd,
                    name: this.data.name,
                    objname: this.data.objname,
                    localValue: this.localValue,
                    root: this.data.root,
                    sys: this.model1
                  }).then((res)=>{
                      this.sys_loading = !this.sys_loading;
                      this.returnMsg.status = !this.returnMsg.status;
                      this.returnMsg.msg1 = res.data.data;
                      this.returnMsg.msg2 = res.data.msg;
                  });
                },3000)
            },
            //进入模板配置
            opentemplate(){
              this.$router.push({ name : "vuemodel" , query:{name : this.data.name, objname : this.data.objname, sys :this.model1  }} )
            }
        },
        mounted() {
            // 初始化加载下拉
            this.addsys();
            this.addlocal();
            // 初始化创建人
            this.$set(this.$data.create,'status',true);
            this.$set(this.$data.create,'msg',`${localStorage.getItem("username")} / ${new Date().Format("yyyy-MM-dd")}`);
        },
        components: {
            syschange,
            block
        }
    }
</script>
