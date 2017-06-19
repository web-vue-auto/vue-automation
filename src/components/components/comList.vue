<template>
	<div class="upload">
		<!-- 输入框 -->
		<Upload action="/api/headUpload" enctype="multipart/form-data" :data="{current:1}">
			<Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
		</Upload>
	</div>
</template>
<style scoped>
	.el-textarea__inner{
		border-radius:0px !important;
	}
	.upload{
		margin:10px;
	}
	.uploadInput{
		width: 300px;
		margin:10px 0;
		display:block;
	}
	.uploadTextarea{
		width: 500px;
	}
	.uploadContent{
		margin-top: 10px;
	}
	.uploadContent h2{
		font-size: 24px;
		margin-bottom: 10px;
	}
</style>
<script>
  export default {
  	data () {
  		return {
  			text:"",
  			textarea:""
  		}
  	}
  }
</script>