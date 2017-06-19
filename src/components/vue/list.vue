<!-- vue列表页 -->
<template>
<div class="vueStyle">
    <!-- 搜索 -->
    <!-- <div class="text-center">
        <Input v-model="searchvalue" placeholder="作者/文章标题" style="width: 500px" class="borderNone"></Input>
        <Button type="primary" icon="ios-search" class="borderNone" @click="searchlist">搜索</Button>
    
    </div> -->
	<!-- 表格 -->
	<!-- <div class="clearfix msgtable marTop20">
        <Table border :columns="columns" :data="tableData"></Table>        
    </div> -->
	<!-- 分页 -->
	<!-- <div class="tablepage text-center">
            <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
        </div> -->
        <div class="text-center">
            <Input v-model="searchvalue" placeholder="作者/文章标题" style="width: 300px" class="borderNone"></Input>
            <Button type="primary" icon="ios-search" class="borderNone" @click="searchlist">搜索</Button>
            <Button  class="borderNone" @click="clearBtn">重置</Button>
        </div>
        <div class="vue-list">
        <ul class="vue-list-ul" v-if="showerror">
            <li v-for="item in tableData" class="">
                <h4>
                <Icon type="ios-paper-outline" v-if="item.type == null"></Icon>
                <Icon type="ios-cloud-download-outline" v-else></Icon>
                {{item.Title}}
                </h4>
                <p class="vue-list-icon pull-left">
                    <!-- 查看 -->
                    <a href="#" @click="show(item.id)" v-if="item.type == null" class="icon draw">
                    </a>
                    <!-- 下载 -->
                    <a :href="item.content" download v-else class="icon draw">                                 
                    </a>
                </p>
                <p class="vue-list-content">                   
                    <span>{{item.Auther}}</span>
                    <span>{{item.Date}}</span>                    
                </p>
                
            </li>            
        </ul>
        <!-- 暂无数据时 -->
        <ul v-else>
            <li class="text-center">
                <img src="/static/images/null.png" alt="">
            </li>
        </ul>
        </div>
        <div class="tablepage text-center clearfix">
            <Page :total="total" @on-change="changePage" show-total :current="current"></Page>
        </div>
</div>
</template>
<style>
.vueStyle {
    margin: 20px 40px;
    font-size: 20px;
    clear: both;
    min-height: 500px;
}

.vueStyle .clearfix {
    clear: both;
}

.vueStyle .colorfff {
    color: #fff;
}

.vueStyle .text-right {
    text-align: right;
}

.vueStyle .text-left {
    text-align: left;
}

.vueStyle .text-center {
    text-align: center;
}

.vueStyle .marTop20 {
    margin-top: 20px;
}

.vueStyle .tablepage {
    font-size: 12px;
}

.vueStyle .vue-list {
    min-height: 360px;
    height: auto;
    margin: 20px auto;
    width: 80%;
}

.vueStyle .vue-list .vue-list-ul {
    width: 100%;
}

.vueStyle .vue-list .vue-list-ul li {
      min-height: 60px;
      border: 0;
      box-sizing: border-box;
      box-shadow: inset 0 0 0 1px #ccc;
      color: #f45e61;
      font-size: inherit;
      font-weight: 700;
      margin: 10px 0;
      padding:10px;
      text-align: center;
      position: relative;
      vertical-align: middle;
      clear:both;
}

.vueStyle .vue-list .vue-list-ul li h4 {
    font-weight: 700;
    float: left;
    color: #464c5b;
    font-size: 20px;
    line-height: 40px;
}

.vueStyle .vue-list .vue-list-ul li .vue-list-content {
    margin-top: 10px;
    font-size: 16px;
    color: #657180;
    float: right;
}

.vueStyle .vue-list .vue-list-ul li .vue-list-content span {
    margin-right: 10px;
}

/* 遮罩 */
.vueStyle .vue-list .vue-list-ul li .vue-list-icon .icon{
  background: none;
  border: 0;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 1px #ccc;
  font-size: inherit;
  font-weight: 700;
  min-height: 60px;
  width: 100%;
  text-align: center;
  text-transform: capitalize;
  position: absolute;
  left: 0;top: 0;
  vertical-align: middle;

}
.vueStyle .vue-list .vue-list-ul li .vue-list-icon .icon::before,
 .vueStyle .vue-list .vue-list-ul li .vue-list-icon .icon::after {
     box-sizing: border-box;
     content: '';
     position: absolute;
     width: 100%;
     height: 100%;
 } 
.draw {
    -webkit-transition: color 0.25s;
    transition: color 0.25s;
}

.draw::before, .draw::after {
    border: 1px solid transparent;
    width: 0;
    height: 0;
}

.draw::before {
    top: 0;
    left: 0;
}

.draw::after {
    bottom: 0;
    right: 0;
}

.draw:hover {
    color: #39f;
}

.draw:hover::before, .draw:hover::after {
    width: 100%;
    height: 100%;
}

.draw:hover::before {
    border-top-color: #39f;
    border-right-color: #39f;
    -webkit-transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
}

.draw:hover::after {
    border-bottom-color: #39f;
    border-left-color: #39f;
   /*  -webkit-transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s;
   transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s; */
}
</style>
<script>
	export default {
		beforeMount(){
			this.loading2 = true;
		},
		data () {
		return {
        type:'',
			  total:1,//页面条数
			  current:1,//当前页
        searchvalue:'',//查询
			  tableData: [ ],
        showerror:true//暂无数据
			}
		},
		methods:{            
		    show(id){//编辑
	           let that = this;	           
			       that.$router.push({ path: 'create', query: { id: id}})
        },
		    changePage (num) {//分页
              this.current = num;
              this.readyTable();
        },
        clearBtn(){//重置                
              this.searchvalue = "";
              this.readyTable();
        },
        searchlist(){
            if(this.searchvalue == ""){
                    this.readyTable();
            }else{
                  this.$http.post("/api/searchManagementList",{"search":this.searchvalue,'current':this.current}).then((response)=>{
                      let _data = response.data;
                      if(_data.data.data == ''){
                          this.showerror = false;
                      }else{
                          this.showerror = true;
                          this.tableData = _data.data.data;   
                      }
                      this.total = _data.data.total;   
                      
                  })  
              }
                
            },
		    readyTable(){//初始化
		    	let	current = this.current;
		    	this.$http.post("/api/ManagementList",{"current":current}).then((response)=>{
				    let _data = response.data;
                    if(_data.data == ''){
                        this.showerror = false;
                    }else{
                         this.showerror = true;
                         this.tableData = _data.data;   
                    }				    				    
				    this.total = _data.total;
				    this.loading2 = false;
				})
		    }
		},
		mounted: function () {
			this.readyTable();  
		}
	}
</script>