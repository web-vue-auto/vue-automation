<template>
  <div class="max800">
    <div class="max300 validArea">
      <el-input placeholder="账号"  v-model="username"  v-checkBlur="username" data-vCheck="isRequired" tag="账号"   ></el-input>
      <el-input placeholder="密码" v-model="password" name="password" v-checkBlur="password" data-vCheck="isRequired" tag="密码" ></el-input>
      <el-input placeholder="确认密码" v-model="newpassword" name="newpassword"  v-checkBlur="newpassword" data-vCheck="isRequired" tag="确认密码" ></el-input>
      <div class="text-center">
          <el-button type="" class="w90 borderNone" @click="submit" >提交</el-button>
          <el-button type="" class="w90 borderNone bgColor" @click="goBack" >返回</el-button>
      </div>
    </div>
  </div>
</template>
<style>
  .max800 {
    max-width: 1000px;
    margin: 0 auto;
  }
  .max300 {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 80px;
  }
  .max300 input {
    border-radius: 0 !important;
    margin-bottom: 10px;
  }
  .w90 {
    width: 90px;
  }
  .borderNone{
    border-radius: 0 !important;
  }
  .bgColor{
    background: #00a9c6 !important;
    color: #fff !important;
    border:1px solid #00a9c6 !important
  }
  .red {
        color: red;
  }
</style>
<script type="text/javascript">
  export default{
      name:"register",
      data(){
         return{
            username:"",
            password:"",
            newpassword:""           
         }
      },
      mounted(){
        let _this = this;
         $(document).unbind('keyup').keyup(function (ev) {
            if( _this.$route.name!='form' ) return;
            if(ev.keyCode == 13){
              _this.submit();
            }
        })
      },
      methods:{
         goBack () {
             this.$router.push({ name: 'joinus'});
         },
         submit () {
             if( !this.checkValid( $('.validArea'))   ) {
               return;
             }
              let _this = this;

              //注册之前先验证用户名是否存在
              this.$http.post('/api/checkIdCard',{
                  name:this.username
              }).then( (res) => {
                  if( res.data.type == 'false'){
                     this.$message({
                          message:res.data.data,
                          type:'warning'
                      })
                  }else{
                    this.addUserIdCard()
                  }
              });
         },
         addUserIdCard(){
            let _this = this;

            this.$http.post('/api/addUserIdCard',{
                name:this.username,
                password:this.password
            }).then((res)=>{
                if(res.data.type=="success"){

                    this.updateUsername();
                    this.$message.success('注册成功');
                    localStorage.setItem('username',this.username);
                    localStorage.setItem('token',res.data.token);

                    let timer = setTimeout(function(){
                         _this.$router.push({name:"index"})
                          clearInterval(timer);
                          timer=null;
                    },500)
                } 
            })
         },
         updateUsername(){
           this.$store.dispatch('updateUsername', this.username)
         }
      }
  }
</script>