<template>
	<div class="vuemodel">
	<div class="vuemodel_main">
		<div class="vuemodel_main_left">
			<div width="200px" class="vuemodel_nav">
					<div>
						<ul>
							<li><span>icon</span><a href="javascript:;">导航1</a></li>
							<li><span>icon</span><a href="javascript:;">导航1</a></li>
							<li><span>icon</span><a href="javascript:;">导航1</a></li>
							<li><span>icon</span><a href="javascript:;">导航1</a></li>
							<li><span>icon</span><a href="javascript:;">导航1</a></li>
							<li><span>icon</span><a href="javascript:;">导航1</a></li>
						
						</ul>
					</div>											
			</div>
		</div>
		<div class="vuemodel_main_right">
			<div class="vuemodel_content">
				<div class="vuemodel_content_header"></div>
				<div class="vuemodel_content_main">
				内容
					<router-view></router-view>
				</div>
			</div>	
		</div>
	</div>
		
	</div>
	
</template>
<style lang="less">
	.body{
		width: 100%;
		height: 100%;
	}
	.clearfix {
	    *zoom: 1;
	}

	.clearfix:before,
	.clearfix:after {
	    display: table;
	    line-height: 0;
	    content: "";
	}

	.clearfix:after {
	    clear: both;
	}
	.vuemodel {
		overflow: hidden;
		width: 100%;
		height: 100%;
		margin:0;
		padding: 0;
		box-sizing: border-box;
		margin-top:70px;
		.pull-left {
			float:left;
		}
		.clearfix {
			clear:both;
		}
		
		.vuemodel_main{
			width: 100%;
			min-height: 1200px;
		    display: flex;
			.vuemodel_main_left{
				-webkit-box-flex: 1;     
				-moz-box-flex: 1;         
				width: 20%;              
				-webkit-flex: 1;          
				-ms-flex: 1;            
				flex: 1;   				
				min-height: 1200px;	
				border-right:1px solid #ccc;			
				.vuemodel_nav {		
					height: auto;
					min-width: 200px;
					ul {
						background: #FFFFFF;
					    float: left;
					    position: relative;
					    width: auto;
					    top: -1px;
					    z-index: 199;
							li {
							position: relative;
						    line-height: 38px;
						    color: #4f4f4f;
						    cursor: pointer;
						    background: #FFFFFF;			   
						    span {
						    	position: relative;
						    	text-align: center;
							    float: left;
							    margin: 0;
							    padding: 0;
							    display: block;
							    height: 37px;
							    line-height: inherit;
							    width: 40px;
							    clear:left;
							    color: #ccc;
							    z-index: 9;
						    }
						    a {
						    	color:#666;
						    	font-size:12px;
						    	text-decoration: none;
						    }
						}

					}
				}
			}
			.vuemodel_main_right{
				-webkit-box-ordinal-group: 2;
				-moz-box-ordinal-group: 2;
				-ms-flex-order: 2;           
				-webkit-order: 2;              
				order: 2;                       			
				min-height: 1200px;	
								
				.vuemodel_content {					
					width: 1148px;
				    overflow: hidden;									
					.vuemodel_content_header{
						background:#f3f1f8;
						margin-left: 0px; 
						margin-right: 0px;				
						height: 40px;
					}
					.vuemodel_content_main{
						padding:20px;
					}
				}

			}
		}
		
		
	}
</style>
