<template>
	<div class="compontentsbody">
	<div class="searchInput">
	 <div class="input">
			<el-input
			  placeholder="请搜索"
			  icon="search"
			  v-model="input2"
			  :on-icon-click="handleIconClick"
			  min="20" class="borderNone">
			</el-input>	
		</div>    	
		<el-button type="primary" icon="search" class="borderNone">搜索</el-button>
	</div>
	<div class="compontentsList clearfix">
		<ul>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
		</ul>
		<ul>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
			<li>
				<h2>Basic</h2>
				<h3>£3.99 ($6 US)</h3>
				<p>					
				    15 active clients <br/>
				    Unlimited invoices per month <br/>
				    Unlimited staff logins <br/>
				    Free upgrades <br/>
				    RapidSSL Certificate <br/>

				Unlimited telephone & email support
				</p>
				<p>
					<a href="javascript:;"><span>Sign Up</span><span>30 day free trial</span></a>
				</p>

			</li>
		</ul>
	</div>		
	<div class="block text-center">
	    <el-pagination
	      layout="prev, pager, next"
	      :total="1000">
	    </el-pagination>
	  </div>
	</div>
	</div>
</template>
<style>
	.compontentsbody .text-center{
		text-align: center;
	}
	.compontentsbody .searchInput{
		width: 500px;
		margin: 10px auto;
	}
	.compontentsbody .searchInput .input{
		width: 410px;
		margin:0 10px 0 0;
		float: left;
	}
	.compontentsList {
		width: 80%;
		margin: 30px auto;
		margin-top: 10px;
	}
	.compontentsList ul {
		margin: 0 0 20px 0;
		padding: 0;
		list-style-type: none;
	}
	.compontentsList ul li {
		float: left;
		transition: all .2s;
		margin:0 15px;
		width: 22%;
		height: 460px;
		border: 1px solid #eee;
		box-sizing: border-box;
		padding: 10px;
	}
	.compontentsList ul:after {
		content: '';
		clear: both;
		display: block;
	}
	.compontentsList ul li h2 {
		font-size: 20px;
		text-align: center;
	}

	.compontentsList ul li h3 {
		font-size: 18px;
		text-align: center;
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}

	.compontentsList ul li a {
		display: block;
		width: 90%;
		margin: 10px auto;
		text-align: center;
		background: #00a9c6;
		border-radius: 10px;
		transition: all .5s;
		position: relative;
		padding: 20px 0;
		text-decoration: none;
		color: #fff;
	}

	.compontentsList ul li a span {
		display: block;
	}

	.compontentsList ul li a:hover {
		box-shadow: 0px 1px 10px rgba(0,0,0,.8);
	}

	.compontentsList ul li p {
		text-align: center;
		color: #111;
	}
	.compontentsList ul li:hover{
		box-shadow: 0px 4px 20px rgba(0,0,0,.3);
		border-radius: 10px;
		transform: scale(1.1);
		-webkit-transform: scale(1.1);
		border: none;
		background: #fff;
	}



</style>
<script>
	export default {		
		data () {
		return {
			   input2:""			   
			}
		},
		methods:{
		    handleIconClick(val) {//当前页
		        
		    }
		},
		mounted: function () {
			  
		}
	}
</script>