<style scoped>
.combtn {
	width: 100%;
}
</style>
<!-- <div v-html="item"></div> -->
<script>
	export default {
		name:"combtn",
		template: `<div>
			 <component :is="item" v-for="item in html" :key="item"></component>
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
		</div>`,
		data () {
			return {
				modal: false,
				animal: 0,
				list: [],
				html: [],
				template: []
			}
		},
		methods: {
			ok () {
				this.html.push( this.list[this.animal].html_code );
				this.template.push( this.list[this.animal].html_code );
				this.$emit('code',this.template,this.html);
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
