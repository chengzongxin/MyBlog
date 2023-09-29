<template>
	<view class="container">
		<editor id="editor" class="ql-container" show-img-size show-img-toolbar show-img-resize placeholder="请输入"
			@ready="onEditorReady" @statuschange="onStatuschange"></editor>
		<button type="warn" @tap="undo">撤销</button>
		<view class="tool-bar">
			<view v-for="(items,index) in secions" :key="index">
				<view class="row">
					<view v-for="item in items" :key="item">
						<text class="iconfont action" :class="[item,selectAttr.includes(item)?'active':'']"
							@click="onClickAction(item)"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	@Component({})
	export default class PublishArtical extends Vue {
		editorCtx : any
		secions = [
			[
				'icon-blod',
				'icon-a-leftindentation',
				'icon-a-rightindentation',
				'icon-align-left',
				'icon-align-center',
				'icon-align-right'
			],
			[
				'icon-h1',
				'icon-a-itemnumber',
				'icon-a-bulletpoint',
				'icon-image',
				'icon-a-goback',
				'icon-check'
			],
		]
		selectAttr : any[] = new Array

		onEditorReady() {
			// #ifdef MP-BAIDU
			this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
			// #endif

			// #ifdef APP-PLUS || H5 ||MP-WEIXIN
			uni.createSelectorQuery().select('#editor').context((res) => {
				this.editorCtx = (res as any).context
			}).exec()
			// #endif
		}

		undo() {
			this.editorCtx.undo()
		}
		onClickAction(action : string) {
			console.log(this.selectAttr);
			if (this.selectAttr.includes(action)) {
				this.selectAttr.splice(this.selectAttr.indexOf(action), 1)
				this.setActionDistribute(action)
			} else {
				this.selectAttr.push(action)
				this.cancleActionDistribute(action)
			}
			console.log(this.selectAttr);
		}

		setActionDistribute(name : string) {
			const attr = name.replace('icon-', '')

			if (attr === 'h1') {
				this.setEditorFormat('header', 'H1')
			} else if (attr === 'blod') {
				this.setEditorFormat('bold')
			} else if (attr === 'image') {
				uni.chooseImage({
					success(res) {
						console.log((res.tempFiles as Array<any>)[0].path)
					}
				})
				// this.editorCtx.insertImage((res.tempFiles as any)[0].path)
			} else {

			}
		}
		cancleActionDistribute(name : string) {

		}

		setEditorFormat(name : string, value ?: string) {
			// header H1
			this.editorCtx.format(name, value)
		}

		onStatuschange() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10px;
	}

	#editor {
		width: 100%;
		height: 300px;
		background-color: #CCCCCC;
	}

	button {
		margin-top: 10px;
	}

	.tool-bar {
		margin: 20px 0;
		display: flex;
		flex-direction: column;

		.row {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;

			.action {
				display: block;
				color: darkblue;
				padding: 10rpx;

				&.active {
					color: red;
				}
			}
		}
	}
</style>