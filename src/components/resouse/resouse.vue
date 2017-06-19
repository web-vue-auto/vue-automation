<!-- resouce详情页 -->
<template>
<div class="fullpage">

<!-- <div class="MenusAll" v-show="showmenus">
  <button @click="startMenu">Open Menu</button> 
  <div class="typeMenu">

      <ul v-show="hideMenu" :class="{'moveFromBottom':moveFromBottom}">     
         <li v-for="item in firstItem" :value="item.id" @click="getSecond(item.value,$event)">
         <a href="#">{{item.value}}</a>       
      </li>
      </ul>

      <ul v-show="showMenu" :class="{'moveFromBottom':moveFromBottom}">  
          <li @click="backMenu"><a href="javascript:;"><Icon type="arrow-return-left"></Icon></a></li>       
          <li v-for="item in secondItem" :id="item.id" @click="getThree(item.value,$event)">
          <a href="#">{{item.value}}</a>                
          </li>             
      </ul>  

      <ul v-show="showMenuThree" :class="{'moveFromBottom':moveFromBottom}">
        <li @click="backMenu"><a href="javascript:;"><Icon type="arrow-return-left"></Icon></a></li>  
        <li v-for="item in threeItem" @click="clickType(item.value,$event)" :pid="item.pid">
          <a href="#">{{item.value}}</a>
        </li>
      </ul>
  </div> 
</div> -->

<!-- 导航开始 -->
<div class="menus" v-show="showmenus">
  <!-- <Input v-model="modelinput"  class="searchInput borderNone"></Input>
  <Button type="primary" icon="search" class="borderNone" @click="search">搜索</Button> 
  <Input v-model="readInput"  class="searchInput borderNone" readonly></Input>
  <i @click="clearInput"><Icon type="close-circled" class="iconColor"></Icon></i>  -->
</div>
<!-- 导航结束 -->
<!-- 面包屑开始 -->
<div class="breadcrumbs" v-show="showbread">
  <Breadcrumb>     
    <Breadcrumb-item><a href="javascript:;" @click="list">文章列表</a></Breadcrumb-item>
    <Breadcrumb-item>{{breadtitle}}</Breadcrumb-item>
  </Breadcrumb>
</div>
<!-- 面包屑结束 --> 
<div class="pageContent">
  <div id="pt-main" class="pt-perspective">
    <!-- 文章列表 -->
    <div class="pt-page pt-page-1" :class="{'pt-page-current': showpage1,'pt-page-moveFromRight':moveleft}">
      <!-- 目录 -->
      <div class="title">目　录</div>
      <span class="contenttip" v-show="showContentTip">{{tip}}</span>
      <p v-for="item in items">
         <Icon type="document" class="marR10"></Icon>
         <a :href="item.url" class="titleStyle" :name="item.title" target="_black">{{item.title}}</a>
         <!-- <a href="javascript:;" class="pull-right aStyle">{{item.auther}}</a> -->
         <a :href="item.url" class="pull-right aStyle" target="_black">{{item.time}}</a>
      </p>
      <!-- 分页 -->   
      <div class="listpage text-center">
        <Page :total="total" @on-change="changePage" show-total :page-size="20" :current="current"></Page>
      </div>
    </div>
    <!-- 文章详情 -->
    <div class="pt-page pt-page-2 page2 pad40" :class="{'pt-page-moveFromLeft':moveright,'pt-page-current': showpage2}">
      <p><span class="weigthblod">作者：</span><span class="mar20">{{editor}}</span></p>
      <p><span class="weigthblod">发布时间：</span><span class="mar20">{{time}}</span></p>
      <p><span class="weigthblod">文章类型：</span><span class="mar20">{{type}}</span></p>
      <div class="martop20" v-html="pagecontent">{{pagecontent}}</div>
    </div>
  </div> 
  </div> 
</div>
</template>
<style scope lang="less">
@import "../../assets/css/fullpage.css";
.pt-page{
  .aStyle{
    font-size: 10px;
  }
  .titleStyle{
      text-overflow: ellipsis;
      width: 360px;
      height: 30px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      vertical-align: middle;
  }
}
</style>
<script>
export default {
    name:"resouce",
    data () {
        return {      
            tip:'',//提示
            showContentTip:false,//暂无数据
            showmenus:true,//隐藏类型导航
            total:1,
            current:1,//当前页
            showbread:false,//隐藏面包屑
            showpage1:true,//第一页
            showpage2:false,//第二页
            moveleft:false,//文章页动效
            moveright:false,//文章页动效
            movetoright:false,//文章页动效
            breadtitle:'',//面包屑标题
            type:'',//文章类型
            editor:'',//作者
            time:'',//时间
            pagecontent:'',//文章内容
            showMenu:false,//显示导航
            hideMenu:false,//隐藏导航
            showMenuThree:false,//显示第三级导航
            moveFromTop:false,
            moveFromBottom:false,
            firstItem:[],//一级导航
            secondItem:[],//二级导航
            threeItem:[],//三级导航
            items: [],//文章详情
            readInput:'',//只读输入框
            modelinput:''//搜索输入框
        }
    },
    methods: { 
        startMenu(){          
          this.showMenu = false,
          this.showMenuThree = false;
          if(this.hideMenu == false){
            this.menus();//导航  
          }else{
              this.hideMenu = false;
          }
                       
        },
        menus(){//一级导航   
            this.$http.post("/api/groupTypeOne",{'pid':-1}).then((response)=>{
                let _data = response.data;          
                this.firstItem = _data; 
                this.hideMenu = true;
                this.moveFromBottom = true;
            })
        },
        getSecond(name,e){//二级导航
              let id = e.currentTarget.value;             
              this.$http.post("/api/groupTypeTwo",{'id':id}).then((response)=>{
                    let _data = response.data; 
                    if(_data != ""){
                      this.hideMenu = false;
                      this.showMenu = true; 
                      this.moveFromBottom = true;
                      this.secondItem = _data; 
                    }else{
                      this.hideMenu = false; 
                    }                     
                    //添加搜索值 
                    this.readInput = name;
                    e.stopPropagation();    
              })
        },
        getThree(name,e){//三级导航
            let id = e.currentTarget.id;
            //控制导航显示下一级
            this.showMenuThree = true;
            this.showMenu = false;
            this.moveFromBottom = true;
            this.$http.post("/api/groupTypeThree",{'id':id}).then((response)=>{
              let _data = response.data; 
              if (_data.length>0) {
                this.threeItem = _data;
                this.readInput = name;  
                e.stopPropagation();
              }else{
                this.showMenuThree = false;
              }         
                            
           })  
        },
        backMenu(){//返回上一级导航
          if(this.showMenu){
             this.hideMenu = true;
             this.showMenu = false;
             this.moveFromBottom = true;
          }else if(this.showMenuThree){
             this.showMenuThree = false;
             this.showMenu = true;
             this.moveFromBottom = true;
          }
        },
        changePage (num) {//分页
          this.current = num;
          let currents = this.current;
          this.readypage(currents);
        }, 
        list(){ // 面包屑
          this.showmenus = true;
          this.showpage1 = true;
          this.showpage2 = false;
          this.showbread = false; 
          this.moveleft = true;
          this.moveright = false;
          this.movetoright = true;
        },
        selectSort(item){ // 选择标题
          let id = item.id;
          let title = item.title;
          this.showmenus = false;
          this.breadtitle = title;
          this.showpage1 =!this.showpage1;
          this.showpage2 =!this.showpage2;
          this.moveleft = false;
          this.moveright = true;
          this.showbread = true;
          //文章内容
          this.$http.post("/api/searchresouce",{'id':id}).then((response)=>{
            let _data = response.data;
            this.editor = _data.data[0].auther;
            this.time = _data.data[0].date;
            this.type = _data.data[0].type;
            this.pagecontent = _data.data[0].content;  
          })
        },
        clearInput(){ // 清空选择的框         
          this.readInput = "";
        },
        readypage(currents,search,txt){ // 目录列表
          let type = search;  
          this.$http.post("/api/resouceNewList",{'current':currents,'searchname':txt,'type':type}).then((response)=>{   
            let _data = response.data;
             //判断输入框查询不到数据时
             if(_data.data == ""){
                this.showContentTip = true;
                this.tip = "暂无数据"
             }else{
                this.showContentTip = false;
             }
              this.items = _data.data;
              this.total = _data.total;   
          })
        }, 
        clickType(name,e){ // 选择导航类型
          this.readInput = name;  
          // 阻止时间冒泡
          e.stopPropagation();
          this.showMenuThree = false;
        },       
        search(searchval){ // 查询
          let currents = this.current;
          let txt = this.modelinput;
          let search = this.readInput;         
          this.readypage(currents,search,txt)
        }
    },
    mounted: function () {     
      this.readypage(1);   
    }
}
</script>
