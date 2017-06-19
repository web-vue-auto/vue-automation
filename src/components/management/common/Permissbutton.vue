<template>
	<div>
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:"permissbutton",
		props:['showlog'],
		created () {
			let token = localStorage.getItem("token");
			let this_ = this;
			// 权限控制接口查询
			this.$http.post("/api/checkPermiss",{"token":token}).then((response)=>{		
			    let _data = response.data.data;
			    if (_data) {
			    		_data.split(",").forEach(function (item) {
			    			this_.validation(item);
			    		})
			    }else{
			    		// 新注册用户
			    		this.$emit('showlog',{
						"user":false,
					  	"resouce_list":false,
					  	"messagetable":false
					})
			    }
			})
		},
		methods:{
			validation (val) {
				switch(val)
				{
				case "web前端":
					this.$emit('showlog',{
						"user":false,
					  	"resouce_list":true,
					  	"messagetable":true
					})
				  break;
				case "admin":
				     this.$emit('showlog',{
						"user":true,
					  	"resouce_list":true,
					  	"messagetable":true
					})
				  break;
				}
			}
		}
	}
</script>