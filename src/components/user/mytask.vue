<!-- 我的任务 -->
<template>
	<div class="bgImg min750">     
      <div class="list clearfix advice">
        <!-- 操作按钮 -->
        <div class="list-btn">
           <Button type="ghost" @click="back" class="pull-left borderNone">返回</Button>           
        </div>         
        <div class="mytasklist clearfix">
          <div v-for="item in optionList" :id="item.id">
            <p class="ask">
              <Icon type="ios-help-outline" class="helpIcon"></Icon>
              <span>{{item.title}}</span>             
              <span class="advicelist-date">{{item.date}}</span>
            </p>
          </div>
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
.list .mytasklist{
  margin: 60px auto 20px;
  height: 560px;
  overflow-y:scroll; 
}
.list .mytasklist .ask{
  font-weight: 700;
  font-size: 16px;
}
.list .mytasklist .ask .helpIcon{
  color:#28a745;
  margin:0 5px;
  font-weight: 600;
}
.list .mytasklist .advicelist-date{
  color:#586069;
  float: right;
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
}
.list .mytasklist div{
  margin:5px 0;
  background: #fff;
  border:1px solid #eee;
  padding: 10px;
}
.list .mytasklist>div:hover {
    box-shadow: 0px 0px 5px #3399ff;
}
.list .mytasklist div h5{
  font-weight: 600;
  margin:3px 0;
}

</style>
<script>
export default {
  data() {
      return {
        optionList:[],
        optionTitle:'',//意见详细之标题
        optionContent:''//意见详细之内容
      }
  },
  methods:{
      back(){
        this.$router.push({name:"userperson"});
      },
      readyList(){
         let auther = localStorage.getItem("username");
         this.$http.post("/api/userTask",{"auther":auther}).then((response)=>{
              let _data = response.data;        
              this.optionList = _data.data;
            })
      }
  },
  mounted(){
    this.readyList();
  }
}
</script>