<template>
	<div class="fullpage">
		<div class="pageContent">
		  <div id="pt-main" class="pt-perspective">
		    <!-- 文章列表 -->
		    <div class="pt-page pt-page-1 pt-page-current">
		      <!-- 目录 -->
		      <div class="title">目　录</div>
		      <p v-for="item in items">
		         <a :href="item.url" target="_black" class="pic">
		         		<img :src="item.imgUrl">
		         </a>
		         <a :href="item.url" class="titleStyle" :name="item.title" target="_black">{{item.title}}</a>
		         <a :href="item.url" class="pull-right aStyle" target="_black">{{item.time}}</a>
		      </p>
		    </div>
		  </div> 
		  </div>
		  <!-- 分页 -->   
	      <div class="listpages text-center">
	        <Page :total="total" show-total :current="current" @on-change="changePage" :page-size="20"></Page>
	      </div>
	</div>
</template>
<style scope>
	.fullpage {
		position: relative;
	}
	.fullpage .listpages {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.pt-page-current .pic img{
		width: 30px;
		height: 30px;
		margin-right: 15px;
	}
</style>
<script>
	export default {
		data () {
			return {
				items:[],
				total:0,
				current:1
			}
		},
		created () {
			this.getList(this.current);
		},
		methods:{
			getList (num) {
				this.$http.post('/api/nodeNewList',{"current":num}).then((res)=>{
					let _data = res.data;
					this.$set(this.$data,'items',_data.data);
					console.log(_data.total);
					this.$set(this.$data,'total',_data.total);
				})
			},
			changePage (val) {
				this.current = val;
				this.getList(val);
			}
		}
	}
</script>