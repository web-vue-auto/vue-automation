<template>
	<div class="codepage">
		<Tabs value="name1">
	        <Tab-pane label="历史规范" name="name1">
	        	<div>
	        		<iframe src="http://192.168.145.159:7777" width="100%" height="29500px" style="border:none;" scrolling="no"></iframe>
	        	</div>
	        </Tab-pane>
	        <Tab-pane label="新规范之HTML" name="name2">
                <div>
                	 <embed id="pdfPlayer" src="http://192.168.145.159:8088/static/upload/html-yixin.pdf" type="application/pdf" width="100%" height="1200px">
                </div>
	        	               
	        </Tab-pane>
	        <Tab-pane label="新规范之CSS" name="name3">
                <div>
                	 <embed id="pdfPlayer" src="http://192.168.145.159:8088/static/upload/css-yixin.pdf" type="application/pdf" width="100%" height="1200px">
                </div>
	        	               
	        </Tab-pane>
	        <Tab-pane label="新规范之Javascript" name="name4">
                <div>
                	 <embed id="pdfPlayer" src="http://192.168.145.159:8088/static/upload/javascript-yixin.pdf" type="application/pdf" width="100%" height="1200px">
                </div>
	        	               
	        </Tab-pane>
	    </Tabs>
	</div>
</template>
<style>
	.codepage{
		margin:70px 20px;		 
	}
</style>