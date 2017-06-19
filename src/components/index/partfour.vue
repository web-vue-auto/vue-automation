<template>
	<!--Contact Starts-->
	<div id="contact" class="spacer">
		<div class="container contactform center">
			<h2 class="text-center  wowload fadeInUp">加入我们-你-可以影响世界</h2>
			<div class="row wowload fadeInLeftBig">      
				<div class="col-sm-6 col-sm-offset-3 col-xs-12 validArea"  >
					<input type="text" v-model="username" v-checkBlur="username" data-vCheck="isRequired" tag="账号" placeholder="账号">
					<input type="password" v-model="password" v-checkBlur="password" data-vCheck="isRequired" tag="密码" placeholder="密码">
					<button class="btn btn-primary"  @click="login"><i class="fa fa-paper-plane"></i> 点击进入</button>
					<router-link to="/form">
						<button  class="btn btn-primary commenA"><i class="fa fa-paper-plane"></i>申请账号</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
	<!--Contact Ends-->
</template>
<style>
	.commenA a {
		text-decoration: none;
		color: #fff;
	}

</style>
<script type="text/javascript">
	export default{
		name:"login",
		data(){
			return {
				username:"",
				password:""
			}
		},
		mounted(){
			let _this = this;
			let token = localStorage.getItem('token');
			if (token) {
				this.$router.push({name:"userperson"});
				return;
			}
			$(document).unbind('keyup').keyup(function (ev) {
				if( _this.$route.name!='joinus' ) return;
				if(ev.keyCode == 13){
					_this.login();
				}
			})
		},
		methods:{
			login () {
				if(!this.checkValid( $('.validArea')) ) return;

				let _this = this;
				 this.$http.post('/api/UserLogin',{name:this.username,password:this.password})
				 .then((res)=>{ 
				 	 if(res.data.type=='success'){
				 	 	this.updateUsername();
				 	 	this.$message.success('登录成功');
				 	 	localStorage.setItem('username',this.username);
				 	 	localStorage.setItem('token',res.data.token);

				 	 	let timer = setTimeout(function(){
				 	 		_this.$router.push({name:"index"});
				 	 		clearInterval(timer);
				 	 		timer=null;
				 	 	},500)
				 	 }else{
				 	 	$('<label class="tip">'+res.data.data+'</label>').prependTo( $('.validArea') )
					 }
				 })
			},
			updateUsername(){
				this.$store.dispatch('updateUsername', this.username)
			}
		}
	}
</script>