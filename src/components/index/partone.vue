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
						imgUrl : "/static/images/bg_01.png",
						title : "Management",
						content : "对管理来说-不是100分就是0分",
						rout:'welcome'
					},
					{
						imgUrl : "/static/images/bg_02.png",
						title : "resources",
						content : "知识改变命运",
						rout:'resouse'
					},
					{
						imgUrl : "/static/images/bg_03.png",
						title : "BBS",
						content : "沟通使我们距离更近",
						rout:'bbswork'
					},
					{
						imgUrl : "/static/images/bg_04.png",
						title : "Vue",
						content : "爱拼才会赢",
						rout:'list'
					},
					{
						imgUrl : "/static/images/bg_05.png",
						title : "quick cdn",
						content : "相信我们-会给你最好的服务",
						rout:'cdn'
					},
					{
						imgUrl : "/static/images/bg_06.png",
						title : "task",
						content : "你-就是我们要找的赏金猎人",
						rout:'taskwelcome'
					},
					/*{
						imgUrl : "/static/images/bg_06.png",
						title : "reviews",
						content : "严谨，整洁就是你的代名词",
						rout:'review'
					},*/
					{
						imgUrl : "/static/images/bg_07.png",
						title : "NodeJs",
						content : "我们不只是前端",
						rout:'noderesouce'
					},
					{
						imgUrl : "/static/images/bg_08.png",
						title : "components",
						content : "为了你-我们会做的更好",
						rout:/*'components_index'*/'permission'
					},
					{
						imgUrl : "/static/images/bg_09.png",
						title : "Knowledge",
						content : "知识需要一点一滴的沉淀",
						rout:/*'permission'*/'knowledge'
					},
					{
						imgUrl : "/static/images/bg_10.png",
						title : "Rules",
						content : "正所谓国有国法-家有家规",
						rout:'rules'
					},
					{
						imgUrl : "/static/images/bg_11.png",
						title : "Foot Step",
						content : "只有足记才能坚定我们的成长",
						rout:/*'permission'*/'footstep'
					},
					{
						imgUrl : "/static/images/bg_12.png",
						title : "Join Us",
						content : "加入我们-你-可以影响世界",
						rout:'joinus'
					}
				]
			}
		}
	}
</script>