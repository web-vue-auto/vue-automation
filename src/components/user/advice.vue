<!-- 意见反馈 -->
<template>
	<div class="bgImg min750">     
      <div class="list clearfix advice">
        <!-- 操作按钮 -->
        <div class="list-btn">
           <Button type="ghost" @click="back" class="pull-left borderNone">返回</Button>
           <Button type="primary" @click="advicemodal" class="pull-right borderNone">发表意见</Button>
        </div> 
        <!-- 发表意见   -->   
        <Modal
              v-model="sendadvice"
              title="意见反馈"
              class="cleanline"
              @on-cancel="askcancel"
               >
               <Input v-model="advicetitle" placeholder="请输入标题..." style="width: 300px" class="mar20 borderNone"></Input>
               <span class="error" v-show="showerror">*最多输入40字符</span>
               <Input v-model="advicecontent" type="textarea" :rows="4" placeholder="请输入意见内容..." class="borderNone"></Input>
               <div class="advicefoot">
                 <Button type="ghost" @click="canceladvice" class="pull-right borderNone marl10">取消</Button>
                <Button type="primary" @click="okadvice" class="pull-right borderNone ">确定</Button>
               </div>               
               <div slot="footer"></div>
        </Modal>
        <div class="advicelist clearfix">
          <div @click="askmodal($event)" v-for="item in questionList" :id="item.id">
            <p class="ask">
              <Icon type="ios-help-outline" class="helpIcon" v-if="!item.status"></Icon>
              <Icon type="ios-checkmark-outline" class="helpIcon" v-else></Icon>
              <span>{{item.title}}</span>              
              <span class="advicelist-date">{{item.auther}}</span>
              <span class="advicelist-date">{{item.date}}</span>
            </p>
          </div>

        </div>
        <!-- 查看详细问答 -->
        <Modal
              v-model="optionmodal"              
              :styles="{top: '200px'}"
              class="cleanline"
              @on-cancel="optioncancel">
              <p slot="header">
                  <span>{{optionTitle}}</span>
              </p>
              <div class="contentHeight">
                  <p>{{optionContent}}</p>
              </div>
              <div class="authorReply text-center">
              <Radio-group v-model="checkradio" @on-change="ckradio" v-if="showRadio">
                  <Radio label="未解决"></Radio>
                  <Radio label="已解决"></Radio>
                  <Radio label="不予解决"></Radio>
              </Radio-group>
                <div v-else>
                  <Button class="borderNone" type="primary" long size="large">{{radiotext}}</Button>
                </div>
              </div>
              <div class="text-right clearfix">
                <Button class="borderNone" type="ghost" size="large" @click="closeoption">取消</Button>
                <Button class="borderNone" type="primary" size="large" @click="sure">确定</Button>
              </div>
              <div slot="footer"></div>
        </Modal>
        <!-- 分页 -->
        <div class="text-center">
        <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
    </div>
      </div>
      <!-- list end -->
	</div>
</template>
<style scope>
.min750{
  min-height: 750px;
}
.bgImg{
  background: #f7f7f7 url("/static/images/bg04.png");
}
.list {
  padding:20px;
  max-width: 1200px;
  margin: 0 auto;

}
.list .clearfix{
  clear:both;
}
.list .advicefoot{
  height: 30px;
  margin-top:10px;
}
.list .marl10{
  margin-left: 10px;
}
.advice .list-btn{
  margin:10px auto;
}
.advice .mar20{
  margin:10px 0 5px;
}
.list .advicelist{
  margin: 60px auto 20px;
  min-height: 560px;
}
.list .advicelist .ask{
  font-weight: 700;
  font-size: 16px;
}
.list .advicelist .ask .helpIcon{
  color:#28a745;
  margin:0 5px;
  font-weight: 600;
}
.list .advicelist .advicelist-date{
  color:#586069;
  float: right;
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
}
.list .advicelist div{
  margin:5px 0;
  background: #fff;
  border:1px solid #eee;
  padding: 10px;
}
.list .advicelist>div:hover {
    box-shadow: 0px 0px 5px #3399ff;
}
.list .advicelist div h5{
  font-weight: 600;
  margin:3px 0;
}
.list .contentHeight{
  min-height: 100px;
}
.authorReply{
  margin:10px 0;
  border-top:1px solid #ccc;
  padding-top: 20px;
}


</style>
<script>
export default {
  data() {
      return {
        id:'',
        total:1,
        current:1,
        auther:'',
        showRadio:true,//控制radio
        showerror:false,//警告提示
        sendadvice:false,//发表意见modal
        advicetitle:'',//意见标题
        advicecontent:'',//意见内容
        optionmodal:false,
        questionList:[],
        checkradio:'',//选择
        radiotext:'',
        optionTitle:'',//意见详细之标题
        optionContent:''//意见详细之内容
      }
  },
  methods:{
      changePage (num) {//分页
          this.current = num;
          this.readyList();
      },
      optioncancel(){
        //清空输入
        this.closeoption();
      },
      askcancel(){
         //清空输入
        this.advicetitle = "";
        this.advicecontent = ""; 
        this.showerror = false;
      },
      advicemodal(){//控制modal显示
        this.sendadvice = true;
        //清空输入
        this.advicetitle = "";
        this.advicecontent = ""; 
        this.showerror = false;
      },
      back(){
        this.$router.push({name:"userperson"});
      },
      askmodal(e){//查看详细内容
        this.id = e.currentTarget.id; 
        this.optionmodal = true;
        this.$http.post("/api/getOptionRe",{"id":this.id}).then((response)=>{
              let _data = response.data;     
              this.auther = _data.data.auther;
              this.optionTitle = _data.data.title;  
              this.optionContent = _data.data.content;                  
        })
        //控制显示
        this.$http.post("/api/getOptionReStatus",{"id":this.id}).then((response)=>{
              let _data = response.data; 
              if(_data.data.status == "" || _data.data.status == null){
                this.showRadio = true;
              }else{
                this.showRadio = false;
                this.radiotext = _data.data.status;
              }                     
        })


      },
      closeoption(){//取消
        this.optionmodal = false;
        this.checkradio = '';
      }, 
      sure(){//保存选择状态
        this.$http.post("/api/getOptionReSave",{"id":this.id,'status':this.checkradio,'auther':this.auther}).then((response)=>{
              let _data = response.data; 
              this.optionmodal = false;  
              this.readyList();            
        })
      },
      okadvice(){//发表意见
          let total;
          let self = this;
          total = localStorage.getItem("token")
          //判断输入是否完整
          if(this.advicetitle == " " || this.advicecontent == ""){
            this.$Modal.confirm({
              title: "提示",
              content: "请填写完整"                
            })
          }else{
            //判断标题长度大于40时禁止提交
              if(this.advicetitle.length>40){
                this.showerror = true;
              }else{
                let list={
                  "token":total,
                  "title":this.advicetitle,
                  "content":this.advicecontent
                }
                this.$http.post("/api/getOptionSave",list).then((response)=>{
                    let _data = response.data; 
                    //清空输入 
                    if(_data.type == "success"){
                      self.sendadvice = false;
                      this.canceladvice();
                      //刷新页面
                      this.readyList();
                    }
                      

                }) 
              }
          }
      },
      canceladvice(){//取消编辑
        this.sendadvice = false;
        this.advicetitle = "";
        this.advicecontent = "";        
      },
      ckradio(){//选中radio
        this.radiotext = this.checkradio;
      },
      readyList(){
        let current = this.current;
         this.$http.post("/api/getOptionList",{"current":current}).then((response)=>{
              let _data = response.data;        
              this.questionList = _data.data;
              this.total = _data.total;
          })
      }
  },
  mounted(){
    this.readyList();
  }
}
</script>