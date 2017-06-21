<template>
	<!-- works -->
	<div id="works"  class=" clearfix grid"> 
	    <figure class="effect-oscar  wowload fadeIn" v-for="item in items">
	        <img :src="item.imgUrl"/>
	        <figcaption>
	            <h2>{{ item.title }}</h2>
	            <p>{{ item.content }}<br>
	            <router-link :to="item.rout">View more</router-link></p>
	        </figcaption>
	    </figure>
    </div>
<!-- works -->
</template>
<script>
	export default {
		data () {
			return {
				items : [
					{
						imgUrl : "/static/images/Untitled1.jpg",
						title : "Management",
						content : "对管理来说-不是100分就是0分",
						rout:'welcome'
					},
					{
						imgUrl : "/static/images/Untitled2.jpg",
						title : "resources",
						content : "知识改变命运",
						rout:'resouse'
					},
					{
						imgUrl : "/static/images/Untitled3.jpg",
						title : "BBS",
						content : "沟通使我们距离更近",
						rout:'bbswork'
					},
					{
						imgUrl : "/static/images/Untitled4.jpg",
						title : "Vue",
						content : "爱拼才会赢",
						rout:'list'
					},
					{
						imgUrl : "/static/images/Untitled5.jpg",
						title : "quick cdn",
						content : "相信我们-会给你最好的服务",
						rout:'cdn'
					},
					/*{
						imgUrl : "/static/images/Untitled6.jpg",
						title : "task",
						content : "你-就是我们要找的赏金猎人",
						rout:'taskwelcome'
					},*/
					{
						imgUrl : "/static/images/Untitled6.jpg",
						title : "reviews",
						content : "严谨，整洁就是你的代名词",
						rout:'review'
					},
					{
						imgUrl : "/static/images/Untitled7.jpg",
						title : "NodeJs",
						content : "我们不只是前端",
						rout:'noderesouce'
					},
					{
						imgUrl : "/static/images/Untitled8.jpg",
						title : "components",
						content : "为了你-我们会做的更好",
						rout:'components_index'
					},
					{
						imgUrl : "/static/images/Untitled9.jpg",
						title : "Join Us",
						content : "加入我们-你-可以影响世界",
						rout:'joinus'
					}
				]
			}
		}
	}
</script>