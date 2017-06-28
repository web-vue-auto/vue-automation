<template>
  <div id="app">

  <!-- Header Starts -->
    <div class="navbar navbar-default navbar-fixed-top maxh70" role="navigation" id="top-nav">
        <div class="container">
          <div class="navbar-header">
            <!-- Logo Starts -->
            <span class="navbar-brand pad8">
              <router-link to="/index">
               <!-- <img src="/static/images/logo.png" alt="logo" width="230px" height="54px" > -->
               <div  class="logo pull-left">
                <div class="bg0 pa"></div>
                  <div class="hx-box pa">
                      <ul class="pr">
                          <li class="hx-k1 pa0">
                              <span></span>
                          </li>
                          <li class="hx-k2 pa0">
                              <span></span>
                          </li>
                          <li class="hx-k3 pa0">
                              <span></span>
                          </li>
                      </ul>
                  </div>
              </div>
               <h2 style="width:230px; height:54px;margin-left:10px " class="pull-left" >前端基础平台</h2>
               
              </router-link>
            </span>
            <!-- #Logo Ends -->

            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

          </div>


          <!-- Nav Starts -->
          <div class="navbar-collapse  collapse clearfix">
            <div class="user clearfix">
              <div class="UserPic" v-if="usersex">
                <img :src="url"  v-if="!usersexshow">
                <span  v-if="usersexshow">{{usersex}}</span>
              </div>
              <div class="Username" v-if="username">
                <b>{{username}}</b>
                <span @click="routGo">退出</span>
              </div>
              <div class="Username" v-if="!username">
                <span @click="goLogin">登录</span>
              </div>
            </div>
          </div>
          <!-- #Nav Ends -->

        </div>
    </div>
  <!-- #Header Starts -->
    <router-view></router-view>
  <!-- Footer Starts -->
    <div class="footer text-center spacer">
    <p class="wowload flipInX"><a href="#"><i class="fa fa-facebook fa-2x"></i></a> <a href="#"><i class="fa fa-instagram fa-2x"></i></a> <a href="#"><i class="fa fa-twitter fa-2x"></i></a> <a href="#"><i class="fa fa-flickr fa-2x"></i></a> </p>
    CopyRight © 2016 daikuan.com,All Rights Reserved 易鑫金融
    </div>
    <!-- # Footer Ends -->

    <!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->
    <div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
        <!-- The container for the modal slides -->
        <div class="slides"></div>
        <!-- Controls for the borderless lightbox -->
        <h3 class="title">Title</h3>
        <a class="prev">‹</a>
        <a class="next">›</a>
        <a class="close">×</a>
        <!-- The modal dialog, which will be used to wrap the lightbox content -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: mapGetters({
      username: 'username',
      usersex:'usersex'
  }),
  data () {
    return {
      showLog :true,
      url:"",
      usersexshow:false
    }
  },
  watch:{
      usersex (val) {
            if (val) {
                let token = localStorage.getItem("token");
                this.$http.post("/api/getUserInfomation",{'token':token}).then((response)=>{
                  if(response.data.data[0].imgUrl && response.data.data[0].imgUrl != undefined) {
                      this.url = response.data.data[0].imgUrl;
                      this.usersexshow = false;
                  }else {
                      this.url = "";
                      this.usersexshow = true;
                  }
                })
            }
      }
  },
  mounted(){
    this.firstReload();
  },
  methods:{
    firstReload () {
      let name = localStorage.getItem('username');
      if( !!name ){
        this.$store.dispatch('updateUsername', localStorage.getItem('username'))
      }
    },
    routGo () {
      this.$store.dispatch('updateUsername', false);
      localStorage.clear();
      this.UserPic = false;
      this.$router.push({ name: 'joinus'});
    },
    goLogin(){
      this.$router.push({ name: 'joinus'});
    }
  }
}
</script>

<style>
  @import "./assets/scss/common.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
.maxh85 {
  height: 85px !important;
}
.maxh70 {
  height: 70px !important;
  background: #F7F7F7;
}
.user {
  width: 280px;
  height: 70px;
  float: right;
  text-align: left;
}
.UserPic {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 50%;
  float: left;
  overflow: hidden;
  background: #fff;
}
.UserPic span {
    display: inline-block;
    height: 55px;
    line-height: 55px;
    text-align: center;
    width: 100%;
    font-size: 20px;
    color: #58B7FF;
    font-weight: bold;
}
.UserPic img {
  width: 50px;
  height: 50px;
}
.Username {
  height: 30px;
  float: left;
  margin-top: 27px;
  text-align: center;
  letter-spacing: 3px;
  cursor: pointer;
  margin-left: 10px;
}
.Username b {
  color: #39f;
  font-weight: normal;
  font-size:14px;
}
.Username span {
  color: #39f;
  cursor: pointer;
  font-size: 14px;
}
.pad8 {
  padding-top: 8px !important;
}
.pad8 a {
  display: block;
  text-decoration: none;
}
.pad8 h2 {
  color: #39f;
  font-size: 29px;
  font-weight: bold;
  line-height: 54px;
}
.vueStyle {
  margin-top: 85px !important;
}
.pad8 .logo{
    width: 60px;
    height: 54px;
    position: relative;
}
.pad8 .bg0 {
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url("/static/images/bg0.png") no-repeat center center;
      background-size: 150%;
  }
.pad8 .pa {
   position: absolute;
}
.pad8 .pa0 {
  position: absolute;
}
.pad8 .pr {
  position: relative;
}
.pad8 .hx-box {
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%) rotateY(75deg);
}

.pad8 .hx-box ul {
    width: 50px;
    height: 50px;
    transform-style: preserve-3d;
    animation: hxz 20s linear infinite;
}

@keyframes hxz {
    0% {
        transform: rotateX(0deg);
    }
    100% {
        transform: rotateX(-360deg);
    }
}

.pad8 .hx-box ul li {
    width: 50px;
    height: 50px;
    border: 4px solid #5ec0ff;
    border-radius: 1000px;
}

.pad8 .hx-box ul li span {
    display: block;
    width: 100%;
    height: 100%;
    background: url("/static/images/hx.png") no-repeat center center;
    background-size: 100% 100%;
    animation: hx 4s linear infinite;
}

  @keyframes hx {
      to {
          transform: rotate(360deg);
      }
  }

.pad8 .hx-k2 {
    transform: rotateX(60deg) rotateZ(60deg)
}

.pad8 .hx-k3 {
    transform: rotateX(-60deg) rotateZ(-60deg)
}
</style>
