<!-- 发起投票 -->
<template>
	<div class="taskSend">
		<h4><Icon type="stats-bars"></Icon>发起投票</h4>
		<!-- 输入任务 -->
		<div class="taskInput">
            <div class="tagItemnumber clearfix">
                <span class="pull-left">投票标题:</span>
    			<Input v-model="inputTitle" placeholder="请输入标题.." style="width: 400px" class="taskInputItem borderNone pull-left"></Input>
            </div>
            <div class="tagItemnumber clearfix">
                <span class="pull-left">限制数量:</span>
                <Input-number :max="10" :min="1" v-model="inputNum" class="taskInputItem borderNone pull-left" style="width: 400px"></Input-number>
            </div>
            <div class="tagItemnumber clearfix">
                <span class="pull-left">任务选项:</span>
    			<Input v-model="inputMsg" placeholder="请输入选项.." style="width: 400px" class="taskInputItem borderNone pull-left"></Input>
            </div>
            <!-- <Input v-model="inputNum" placeholder="限制最多输入.." style="width: 500px" class="taskInputItem borderNone"></Input> -->  
			<div class="tagItemContent clearfix">
		    	<Tag type="dot" closable color="blue" v-for="item in tagItem" :key="item" :name="item" closable @on-close="handleClose">{{ item }}</Tag>
			</div>
		</div>	
		<div class="taskBtn">
			<Button type="primary" icon="plus-round" class="borderNone marl10" @click="addInput">添加选项</Button>
            <Button type="error" icon="plus-round" class="borderNone marl10" @click="clearSql">清空</Button>
			<Button type="ghost" class="borderNone pull-right marl10" @click="cancel">取消</Button>
			<Button type="success" class="borderNone pull-right" @click="submit">发起投票</Button>
		</div>	
		
	</div>
</template>
<style lang="less">
	.taskSend{
		margin:30px auto;
		width: 510px;
		h4{font-weight: bold;padding-left: 10px;}
        .clearfix{clear:both;}
		.taskInput{
			padding:10px;
            .tagItemnumber{
                span{
                    line-height: 40px;
                    padding-right: 10px;
                }
            }
		   .taskInputItem{display: block;margin: 5px 0;}
		   .tagItemContent{border:1px solid #d7dde4;width: 500px;padding: 10px;min-height: 150px;overflow-y: scroll;}
		}
		.taskBtn{margin-top:10px;}
		.marl10{margin-left: 10px;}
	}
</style>
<script>
export default {
    data() {
        return {
        	inputTitle:'',//投票标题
        	inputMsg:'',//投票内容
            inputNum:1,//限制投票数量
        	tagItem:[]
        }
    },
    mounted () {
        // 初始化加载数据
        this.$http.post("/api/getListDate").then((response)=>{
                let data = response.data.data;
                data.forEach((item,index)=>{
                    //初始化选项
                    this.$set(this.tagItem,index,item.name);
                    // 添加标题
                    this.$set(this.$data,"inputTitle",item.title);
                })
        })
    },
    methods:{
          clearSql () {
                // 清空数据库
                this.$Modal.confirm({
                    title: "提示",
                    content: "是否执行清空操作？</br>清空后数据将全部重置！",
                    onOk: () => {
                        this.$http.post("/api/getListDateDelete").then((response)=>{
                            console.log("删除成功！");
                            this.inputTitle = "";
                            this.inputMsg = "";
                            this.inputNum = "";
                            this.tagItem = [];
                        })
                    }
                })        
          },
    	addInput(){//添加选项
            if(this.inputMsg == ""){
            	this.$Modal.confirm({
                    title: "提示",
                    content: "请填写选项"
                })               
            }else{
            	this.tagItem.push(this.inputMsg)
            	//清空选项输入框
            	this.inputMsg = "";
            }
            
    	},
    	handleClose(event, name) {//删除选项
                const index = this.tagItem.indexOf(name);
                this.tagItem.splice(index, 1);
        },
        submit(){//发起投票
        	let title = this.inputTitle;
        	let msg = this.inputMsg;
            let num = this.inputNum;
        	let tagItem = this.tagItem.join();
        	if(title == "" || tagItem == "" || num == ""){
        		this.$Modal.confirm({
                        title: "提示",
                        content: "请填写完善"
                    })
                    return;
        	}
        	
        	this.$http.post("/api/goVote",{"title":title,"content":tagItem,"num":num}).then((response)=>{
        		 	let _data = response.data;
		            let self = this;
		            this.$Modal.success({
            	                    title: "提示",
            	                    content: _data.data,
                                         onOk: () => {
                                            this.$router.push({ path: '/task'})
                                         }               
		            })
		    })
        },
        cancel(){//取消
        	this.inputTitle = '';
        	this.inputMsg = '';
            this.inputNum = '';
        	this.tagItem = [];
        }
    }
}
</script>