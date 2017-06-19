<!-- 个人主页相关 -->
<template>
	<div>
		<div class="container">
	    <div class="yk-header" @click="back">        
	      <div class="photo">         
          <img :src="src" alt="" class="userImg">
          <vue-core-image-upload  
                crop-ratio="1:1" 
                v-bind:class="['pure-button','pure-button-primary','js-btn-crop']"
                v-bind:crop="true"
                text="上传"
                url="http://192.168.145.159:3000/api/headUpload" 
                extensions="png,gif,jpeg,jpg"
                v-bind:data="{'token':this.total}"
                v-on:imageuploaded="imageuploaded"
                v-if="showimg"
                >          
          </vue-core-image-upload>
        </div>    
        <div class="introduce">
	        <div class="people">
	           <h3>{{id}}</h3>
	        </div>
	      </div>
	    </div> <!-- yk-header end -->
	    <div class="main clearfix" v-show="showmain">
	      <div class="main-con main-con1 fl">
	        <div class="img">
	        <a href="javarscript:void(0)" @click="set">
            <Icon type="ios-gear-outline" class="imgicon"></Icon>
          </a>
	        </div>
	        <div class="img-con">
	          <span class="fl">账户设置</span>
	        </div>
	      </div>
	      <div class="main-con main-con2 fr">
	        <div class="img">
	          <a href="javarscript:void(0)" @click="task">
              <Icon type="ios-star-outline" class="imgicon"></Icon>
            </a>
	        </div>
	        <div class="img-con">
	          <span class="fl">我的任务</span>
	        </div>
	      </div>
	      <div class="main-con fl">
	        <div class="img">
	          <a href="javarscript:void(0)" @click="advice">
            <Icon type="compose" class="imgicon"></Icon>
            </a>
	        </div>
	        <div class="img-con">
	          <span class="fl">意见反馈</span>
	        </div>
	      </div>
	      <div class="main-con fr">
	        <div class="img">
	          <a @click="lecturemodal">
            <Icon type="android-share-alt" class="imgicon"></Icon>
            </a>
	        </div>
	        <div class="img-con">
	          <span class="fl">我的讲座</span>
	        </div>
              <!-- 我的讲座 -->
              <Modal
                v-model="lecture"
                title="讲座材料上传"
                class="cleanline"
                >
                <!-- 主题 -->
                <Input v-model="uploadtitle" placeholder="请输入主题" class="borderNone"></Input>
                <span class="errmsg" v-show="showerror">*最多输入35字符</span>
                <!-- 上传 -->
                <Upload action="http://192.168.145.159:3000/api/fileUpload" enctype="multipart/form-data" 
                :on-success="handleSuccess" :before-upload="handleBeforeUpload" ref="upload">
                  <Button type="ghost" icon="ios-cloud-upload-outline" class="borderNone martop10">上传文件</Button>
                  <span class="errmsg">*上传文件不允许超过120M</span>
                </Upload>
                <div class="uploadfoot">                  
                  <Button type="primary" @click="okSave" class="pull-right borderNone">确定</Button>

                </div>               
                 <div slot="footer"></div>
              </Modal>
	      </div>
	    </div><!-- main end -->
      <!-- 修改密码 -->
      <div class="list clearfix" v-if="showset">
        <!-- tab切换 -->
        <Tabs value="name1">
            <Tab-pane label="个人信息" name="name1">
                <div class="max300 person-list">
                  <h4><Icon type="navicon-round"></Icon>个人信息</h4> 
                  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

                    <Form-item label="域账号" prop="domainaccount">
                        <Input v-model="formValidate.domainaccount" placeholder="请输入域账号"></Input>
                    </Form-item>
                    <Form-item label="初始密码" prop="beforepwd">
                        <Input v-model="formValidate.beforepwd" placeholder="请输入初始密码"></Input>
                    </Form-item>
                    <Form-item label="密码" prop="passwd">
                        <Input v-model="formValidate.passwd" placeholder="请输入密码"></Input>
                    </Form-item>
                    <Form-item label="确认密码" prop="passwdCheck">
                        <Input v-model="formValidate.passwdCheck" placeholder="确认密码"></Input>
                    </Form-item>
                    <Form-item label="邮箱" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="revise('formValidate')" class="w90 borderNone">提交</Button>
                        <Button type="ghost" @click="cancel('formValidate')" class="w90 borderNone">取消</Button>
                    </Form-item>
                  </Form>
                </div>
            </Tab-pane>
            <Tab-pane label="修改头像" name="name2">
            <!-- 修改头像 -->
              <div id="uploadSpeclial">
                 <vue-core-image-upload 
                  v-bind:class="['pure-button','pure-button-primary','js-btn-crop']" 
                  v-bind:crop="false" 
                  url="http://192.168.145.159:3000/api/headUpload" 
                  text="修改头像"
                  v-on:imageuploaded="imageuploaded"
                  v-bind:data="{'token':this.total}"
                  extensions="png,gif,jpeg,jpg">
                </vue-core-image-upload>   
              </div>
            </Tab-pane>
        </Tabs>
      </div>
      <!-- list end -->
	  </div> <!-- container end -->
	</div>
</template>
<style scope>
/*修改头像特殊样式*/
#uploadSpeclial .g-core-image-corp-container {
  left:930px;
  width: 100%;
}
.cleanline .ivu-modal-footer{
  border-top:none !important;
  padding: 0 !important;
}
.borderNone .ivu-input{
  border-radius: 0 !important;
}
.martop10{
  margin-top:10px;
}
.userImg{z-index:1000 !important;}
.errmsg {
  display: inline-block;
  margin-top: 7px;
  color: red;
}
.fl {
    float: left;
}

.fr {
    float: right;
}
.tal {
    text-align: left;
}
.tar {
    text-align: right;
}

.tac {
    text-align: center;
}

.hide {
    display: none;
}

.show {
    display: block;
}

.hidden {
    visibility: hidden;
}

.visible {
    visibility: visible;
}
.container {
  width: 1000px;
  margin:0 auto;
  max-width: 1000px;
}
.yk-header {
  background: #5cadff;
  padding-top: 60px;
  padding-bottom: 45px;
}
.ICON {
  width: 700px;
  height: 35px;
  margin: 0 auto;
/*  border: 1px solid black;*/
}
.ICON .icon {
  display: inline-block;
  width: 35px;
  height:35px;
  float:left;
  margin-right:265px; 
 /* background: red;*/
}
.ICON .icon2 {
  width:100px;
}
.ICON .icon3 {
  margin-right: 0;
}
.photo {
  width: 125px;
  height:125px;
  border:2px solid #fff;
  border-radius: 50%;
  background: #d7dde4;
  margin:40px auto;
  overflow: hidden;
  position: relative;
}
.photo img{
  display: inline-block;
  width: 125px;
  height: 125px;
  margin-left: -1px;
  margin-top:-1px;
}
.yk-header .pure-button{
    color:#999;
    position: absolute;
    left: 50%;
    top: 54px;
    margin-left: -15px;

}
.introduce {
  width: 240px;
  margin:0 auto;
  text-align: center;
}
.number,.fans {
  color: #ddeff3;
}
.people {
  color:#fff;
  font-weight: bold;
  margin:20px 0;
  /*border:1px solid black;*/
}
.people h3 {
  display: inline-block;
  height:25px;
  line-height: 25px;
}
.fans {
  font-size: 18px;
}
.fans span{line-height: 18px;color:#fff;}
.attention {
  border-right:1px solid #ddeff3;
  padding-right:30px;
  margin-right: 30px;
}
.main {
  background: #f4f4f4;
  padding-bottom: 20px;
}
.main-con {
  width: 49.5%;
  background: #fff;
  height:190px;
  position: relative;
}
.main-con1,.main-con2 {
  margin-bottom:10px; 
}
.main-con .img {
  position: absolute;
  width: 60px;
  height: 70px;
  left:50%;
  top:50%;
  margin-top:-35px;
  margin-left: -30px;
}
.img  img {
  width: 60px;
  height: 50px;
}
.img .imgicon{
  font-size: 70px;
  color:#5cadff;
  text-align: center;
}
.img-con {
  width: 400px;
  margin:0 auto;
  position: absolute;
  left:50%;
  margin-left: -200px;
  bottom:20px;
}
.main-mid {
  padding:0 40px;
  line-height: 95px;
  background: #fff;
}
.main-midtwo {
  margin-top: 10px;
}
.list {
  background: #FCFCFC;
  padding-bottom: 20px;
}
.list .max300 {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 80px;
}
.list .max300 h4{
  margin:10px 0;
}
.list .cancel{
  margin-left: 55px;
}
.list .error{
  display: block;
  margin:5px 0;
  color:red;
}
.list .js-btn-crop{
  margin-left: 10px;
  border:1px dashed #ccc;
  width: 200px;
  height: 200px;
  padding:30px;
  text-align: center;
  margin:40px auto;
  line-height: 140px;
  color:#000;
  font-weight: 600;
  font-size: 16px;
}
.list .js-btn-crop input,.list .js-btn-crop form{
  width: 200px !important;
  height: 200px !important;
  cursor: pointer;
}
.list .change-img .g-core-image-upload-form{
  width: 255px !important;
  height: 255px !important;
}
.list .js-btn-crop:hover{
  color: #39f;
  border:1px dashed #39f;
  cursor:pointer;
}
.advice .send{
  margin:10px;
  float: right;
}
.advice .mar20{
  margin:10px 0;
}
.person-list .ivu-form-item {
  height:30px !important;
}
.person-list .ivu-form-item .ivu-input-wrapper{
  height:32px !important;
}

.uploadfoot{
  height: 30px;
  margin-top:10px;
}
.footer {
  background: #fff;
  margin-top:30px;
}
.footer .footer-box {
  width: 460px;
  margin:0 auto;
  padding-top: 10px;
}
.footer-box span {
  margin-right: 145px;
}
</style>
<script>
import VueCoreImageUpload  from 'vue-core-image-upload';
export default {
  name:"upload",
  data() {
      const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
          } else {
              if (this.formValidate.passwdCheck !== '') {
                  // 对第二个密码框单独验证
                  this.$refs.formValidate.validateField('passwdCheck');
              }
              callback();
          }
      };
      const validatePassCheck = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.formValidate.passwd) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };
      return {
        showmain:true,
        showimg:true,
        showerror:false,//警告提示
        showset:false,//控制设置模块
        lecture:false,//我的讲座modal
        formValidate: {
          domainaccount:'',//域账号
          beforepwd:'',//初始密码
          passwd:'',//密码
          passwdCheck:'',//确认密码
          mail:''//email
        },
        ruleValidate: {
            domainaccount: [
                { required: true, message: '请输入域账号', trigger: 'blur' }
            ],            
            beforepwd: [
                { required: true, message: '请输入初始密码', trigger: 'blur' }
            ],
            passwd: [
                { validator: validatePass, trigger: 'blur' }
            ],
            passwdCheck: [
                { validator: validatePassCheck, trigger: 'blur' }
            ],
            mail: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            ]
        },      
        src:'',//图片地址
        uploadtitle:"",//主题
        total:'',//token
        id:'',//用户名     
        uploadList:''//上传文件      
      }
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  methods:{
      lecturemodal(){//上传modal
        this.lecture = !this.lecture;
        this.showerror = false;
        this.uploadtitle = "";
      },
      handleBeforeUpload () {//限制只能上传一个文件
        const check = this.uploadList.length < 2;
        if (!check) {
            this.$Modal.confirm({
            title: "提示",
            content: "最多只能上传一个附件,如需上传多个请压缩成文件夹。"               
        })
        }
        return check;
      },
      handleSuccess (res, file) {//文件上传成功时
        let arr = res.data;
        this.uploadList = arr;        
      },
      okSave () {//保存上传文件
        if(this.uploadtitle == "" || this.uploadList == ""){
          this.$Modal.confirm({
              title: "提示",
              content: "请填写完整"                
          })
        }else{
          //判断输入长度
          if(this.uploadtitle.length > 35){
            this.showerror = true;
          }else{
            let name; 
            name = localStorage.getItem("username");
            let list = {
              "auther" : name,
              "title" : this.uploadtitle,
              "data" : this.uploadList
            };
            this.$http.post("/api/fileUploadSave",list).then((response)=>{
              let _data = response.data;
              let self = this;
              if(_data.type == "success"){
                this.$Modal.success({
                  title: "提示",
                  content: _data.data,
                  onOk () {
                    self.lecture = !self.lecture;
                    //清空
                    self.uploadtitle = "";
                    // 清空数据
                    self.$set(self.$data,'uploadList',"");
                    // 清空dom
                    document.querySelector(".ivu-upload-list").innerHTML="";
                  }               
                })
              }
              
            })
          }        

        }
      },
      set(){//进入详情
        this.showmain = false;
        this.showset = true;
      },
      advice(){//意见反馈
        this.$router.push({name:"advice"});
      },
      task(){
        this.$router.push({name:"mytask"}); 
      },
      back(){//返回
        this.showmain = true;
        this.showset = false;
      },
      cancel(name){//取消
        this.showmain = true;
        this.showset = false;
        this.formValidate.domainaccount = "";
        this.formValidate.beforepwd = "";
        this.formValidate.passwd = "";
        this.formValidate.passwdCheck = "";
        this.formValidate.mail = "";
        this.$refs[name].resetFields();
      },
      revise(name){//修改
        let domainaccount = this.formValidate.domainaccount;
        let before = this.formValidate.beforepwd;
        let userpwd = this.formValidate.passwd;
        let newuserpwd = this.formValidate.passwdCheck; 
        let email = this.formValidate.mail;     
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.$http.post("/api/getUserChecknum",{"mlocal":domainaccount,"password":before,"token":this.total,"newPassword":newuserpwd,"email":email}).then((response)=>{
                  let _data = response.data;
                  let self = this; 
                  if(_data.type == "success"){
                    this.back();
                  }
                  this.$Modal.info({
                      title: "提示",
                      content: _data.data,
                      onOk () {
                          self.beforepwd = "";
                          self.userpwd = "";
                          self.newuserpwd = "";
                      }
                          
                  })
              })
            }
        })







          
            
      },
      imageuploaded(res){//完成图片上传
        this.src = res.data.imageUrl;  
      }
  },
  mounted(){
    this.total = localStorage.getItem("token");
    //返显上传的头像
    this.$http.post("/api/getUserInfomation",{"token":this.total}).then((response)=>{
            let _data = response.data;
            this.id = _data.data[0].id;   
            this.src= _data.data[0].imgUrl;
            this.formValidate.domainaccount = _data.data[0].local_id;
            this.formValidate.mail = _data.data[0].email;
            //隐藏上传
            if(this.src == null || this.src == ""){
              this.showimg = true;
            }else{
              this.showimg = false;
            }   
    })

  }
 
}
</script>