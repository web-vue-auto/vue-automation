<!-- vue文章 -->
<template>
	<div class="createVue">
    <!-- 面包屑 -->
    <div class="padB10">
      <Breadcrumb>     
        <Breadcrumb-item><a href="javascript:;" @click="list">文章列表</a></Breadcrumb-item>
        <Breadcrumb-item>文章</Breadcrumb-item>
      </Breadcrumb>
    </div> 
    <!-- 文章 -->
    <div class="clearfix createContent box-shadow">
        <div class="message pad10 msgtitle">
          <div>{{title}}</div>
        </div>
        <div class="message pad10 msgcontent">
          <div v-html="content"></div> 
        </div>        
	  </div>
  </div>
</template>
<style>
    .createVue{background: #f7f7f7 url("/static/images/bg04.png");border-top: solid 1px #fff;padding: 5px 0 20px 0;}
    .createVue .createContent{margin:10px 170px;}
    .createVue .mar40{margin:20px 40px;}
    .createVue .pad10{padding:10px;}
    .createVue .padB10{padding:10px 0 0 174px;}
    .createVue .clearfix{clear:both;}
    .createVue .message{background: #fff;}
    .createVue .msgtitle{text-align: center;font-weight: bold;font-size: 20px;padding: 20px;border-bottom: 1px solid #eee}
    .createVue .msgcontent{min-height:420px;}
    .createVue .msgcontent>div p{line-height: 20px;margin-bottom:5px }
    .createVue .box-shadow{  
      border:1px solid #eee;
    } 
    .createVue .text-right{text-align: right;}
    .createVue .text-center{text-align: center;}
    .createVue .text-left{text-align: left;}
</style>
<script>
  export default {
    data () {
    return {
         title:"",
         content:""
      }
    },
    methods:{
        list(){//面包屑跳转路由
          let that = this;
          that.$router.push({ path: 'list'})
        },
        readyTable(){//初始化
          let itemId = this.$route.query.id;
          this.$http.post("/api/ManagementReplay",{"id":itemId}).then((response)=>{
              let _data = response.data;  
              this.title =  _data[0].Title 
              this.content =  _data[0].content        
        })  
        }
    },
    mounted: function () {
      this.readyTable();  
    }
  }
</script>