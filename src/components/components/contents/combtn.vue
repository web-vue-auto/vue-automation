<style lang="less" scoped>
.combtn-all {
	float: left;
	display: inline-block;
	width: 100%;
}
.combtn {
	width: 100%;
}
.ivu-modal-body {
	.config {
		position: relative;
		.line {
			position: absolute;
			width: 520px;
			left: -16px;
			border-bottom: 1px solid #e9eaec;
		}
		button {
			margin-top: 20px;
		}
		p{
			font-size: 14px;
			color: #1c2438;
			font-weight: 700;
			margin: 25px 0 14px 0;
		}
		.config-content {
			margin-top: 27px;
			span {
				margin-left: 10px;
				color: red;
			}
		}
	}
}
</style>
<script>
	export default {
		name:"combtn",
		template: `<div class="combtn-all" :style="{width: width,height: height}">
			 <component :is="item" v-for="item in html" :key="item"></component>
			 <Button type="ghost" class="combtn" @click="start" v-show="status">选择</Button>
			 <Modal
			        v-model="modal"
			        title="模块选择"
			        @on-ok="ok"
			        @on-cancel="cancel">
				<Radio-group v-model="animal">
					<Radio :label="index" v-for="(item,index) in list" :key="item.id">
						{{ item.title }}
					</Radio>
				</Radio-group>
				<div class="config">
					<p>区块添加</p>
					<div class="line"></div>
					<Button type="info" @click="block">创建新区块</Button>
				</div>
				<div class="config">
					<p>属性配置</p>
					<div class="line"></div>
					<div class="config-content">
						<label>宽</label>
						<Input v-model="width" style="width: 50px"></Input>
						<label>高</label>
						<Input v-model="height" style="width: 50px"></Input>
						<span>* 默认宽度100%，高度auto</span>
					</div>
				</div>
			 </Modal>
		</div>`,
		props: ['status'],
		data () {
			return {
				modal: false,
				animal: 0,
				width: "",
				height: "",
				list: [],
				html: [],
				template: []
			}
		},
		methods: {
			ok () {
				this.$emit('code',false);
				this.html.push( this.list[this.animal].html_code );
			},
			block () {
				this.$emit('code',true);
				this.modal = !this.modal;
			},
			cancel () {
				this.$emit('barstatus',false);
			},
			start () {
				this.modal = !this.modal;
				this.$emit('barstatus',true);
				this.$http.post('/api/templateListDrop').then((res)=>{
					this.$set(this.$data,"list",res.data.data);
				})
			}
		}
	}
</script>
