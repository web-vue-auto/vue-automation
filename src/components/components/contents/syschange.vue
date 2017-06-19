<template>
    <div class="comp_content">
        <!-- 新增 -->
            <div class="text-center mar_t15">
                <Input placeholder="请添加系统" style="width: 300px" class="borderNone" v-model="addText"></Input>
                <Button type="primary" class="borderNone" @click="addSearch"><Icon type="plus-round"></Icon>新增</Button>
            </div>
            <!-- 表格 -->
            <div class="mar_t15">
                <Table :columns="system" :data="systemData" border></Table>
            </div>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                addText: "",
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
                        render: (h,params) =>{
                            return h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.delsys(params.row.id)
                                    }
                                }
                            }, '删除')
                        }
                    }
                ],
                systemData:[],
            }
        },
        methods: {
            addsys() {
                this.$http.post("/api/getnewSystem").then((res)=>{
                    this.$set(this.$data,'systemData',res.data.data);
                })
            },
            delsys(val) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "确定删除本系统？",
                    onOk: ()=> {
                        this.$http.post("/api/delnewSystem",{id:val}).then((res)=>{
                            // 刷新列表
                            this.addsys();
                        })
                    }
                });
            },
            addSearch() {
                if (this.addText == "") {
                    this.$Modal.error({
                        title: "提示",
                        content: "请添加所属业务系统！"
                    });
                    return;
                }
                // 执行接口
                this.$http.post('/api/newSystem',{"name":this.addText,"person":this.$store.getters.username}).then((res)=>{
                    if (res.data.type) {
                        this.$Modal.confirm({
                            title: "提示",
                            content: res.data.data,
                            onOk: () => {
                                this.addsys();
                                // 重置选项
                                this.$set(this.$data,'addText',"");
                            }
                        });
                    }else{
                        this.$Modal.confirm({
                            title: "提示",
                            content: res.data.data
                        });
                    }
                })
            }
        },
        mounted (){
            this.addsys();
        }
    }
</script>
