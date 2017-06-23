<template>
	<div>
		<div v-for="item in html" :key="item">
			<div v-html="item"></div>
		</div>
		 <Button type="ghost" class="combtn" @click="start">选择</Button>
		 <Modal
		        v-model="modal"
		        title="模块列表"
		        @on-ok="ok">
			<Radio-group v-model="animal">
				<Radio :label="index" v-for="(item,index) in list" :key="item.id">
					{{ item.title }}
				</Radio>
			</Radio-group>
		 </Modal>
	</div>
</template>
<style scoped>
.combtn {
	width: 100%;
}
</style>
<script>
	export default {
		name:"combtn",
		data () {
			return {
				modal: false,
				animal: 0,
				list: [],
				html: []
			}
		},
		methods: {
			ok () {
				this.html.push( this.list[this.animal].template_code );
			},
			start () {
				this.modal = !this.modal;
				this.$http.post('/api/templateListDrop').then((res)=>{
					this.$set(this.$data,"list",res.data.data);
				})
			}
		}
	}
</script>
