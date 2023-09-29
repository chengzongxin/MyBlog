<template>
	<view class="container">
		<form @submit="formSubmit" @reset="formReset">
			<view class="publish">
				<view class="box" v-for="(item,index) in files" :key="index">
					<image :src=item.path mode="aspectFill"></image>
					<view class="close" @click="remove(index)">x</view>
					<view class="info">
						<text>{{getFormatSize(item.size)}}</text>
					</view>
				</view>
				<view class="box add" @click="chooseImg" v-if="files.length < 9">+</view>
			</view>

			<view class="">
				<button type="default" @click="chooseMusic">{{music == null ? '上传音乐':`${music.name}`}}
					<text style="font-size: 8px;color: #999;" v-if="music">{{`(${getFormatSize(music.size)})`}}</text>
				</button>
				<button type="default" @click="chooseMovie">{{movie == null ? '上传电影':`${movie.name}`}}
					<text style="font-size: 8px;color: #999;" v-if="movie">{{`(${getFormatSize(movie.size)})`}}</text>
				</button>
			</view>

			<input focus v-model="dynamicInfo.title" type="text" name="title" placeholder="请输入标题">
			<textarea v-model="dynamicInfo.content" name="content" id="" cols="30" rows="10"></textarea>
			<view class="btns">
				<button form-type="submit" type="primary">Submit</button>
				<button type="default" form-type="reset">Reset</button>
				<button v-if="id" type="warn" @click="removeDynamic">Delete</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		format
	} from '@/utils/formater.js';
	import {
		database
	} from "@/utils/db.js";
	export default {
		data() {
			return {
				id: null,
				files: [],
				music: null,
				movie: null,
				title: '',
				content: '',
				dynamicInfo: {
					title: '',
					content: ''
				}
			}
		},
		computed: {

		},
		async onLoad(option) {
			console.log(option);
			this.id = option.id
			if (this.id != null) {
				const res = await database.getDynamic(this.id)
				console.log(res);
				this.dynamicInfo = res.result.data
			}
		},
		methods: {
			async formSubmit(e) {
				uni.showLoading({
					title: "正在提交..."
				})
				var formdata = e.detail.value
				const promissAll = this.files.map(item => {
					return this.uploadImage(item)
				})
				// 添加音乐
				if (this.music) {
					const pm = this.uploadFile(this.music.path, "music/" + Date.now() + '-' + this.music.name)
					promissAll.push(pm)
				}
				// 添加电影
				if (this.movie) {
					const pm = this.uploadFile(this.movie.path, "movie/" + Date.now() + '-' + this.movie.name)
					promissAll.push(pm)
				}
				const imgs = await Promise.all(promissAll)
				if (this.music) {
					const music = {}
					music.url = imgs.pop().fileID
					music.name = this.music.name
					formdata.music = music
				}
				if (this.movie) {
					const movie = {}
					movie.url = imgs.pop().fileID
					movie.name = this.movie.name
					formdata.movie = movie
				}
				formdata.imgUrls = imgs.map(item => item.fileID)
				console.log(formdata)

				try {

					const res = await database.addDynamic(formdata)
					uni.hideLoading()
					const {
						errCode,
						id
					} = res.result
					console.log("res:", id, errCode)
					console.log("addDynamic res:", res)
					if (id || parseInt(errCode) === 0) {
						uni.showToast({
							title: "发布成功！"
						})
						this.getOpenerEventChannel().emit('publish', true)
						uni.navigateBack()
					}
				} catch (e) {
					//TODO handle the exception
					console.log("add dynamic err:", e)
					uni.showToast({
						title: e.message
					})
				}

			},
			formReset(e) {
				console.log('清空数据')
			},
			async removeDynamic() {
				console.log("删除");
				const res = await database.deleteDynamic(this.id)
				console.log(res);
				const {
					errCode,
					id
				} = res.result
				if (id || parseInt(errCode) === 0) {
					uni.showToast({
						title: "删除成功！"
					})
					this.getOpenerEventChannel().emit('publish', true)
					uni.navigateBack()
				}
			},
			chooseMusic() {
				uni.chooseFile({
					count: 1,
					type: 'image',
					success: (res) => {
						console.log(res);
						this.music = res.tempFiles[0]
					}
				})
			},
			chooseMovie() {
				uni.chooseFile({
					count: 1,
					type: 'video',
					success: (res) => {
						console.log(res);
						this.movie = res.tempFiles[0]
					}
				})
			},
			getFormatSize(size) {
				return format.dataUnit(size)
			},
			chooseImg(e) {
				console.log(e);
				uni.chooseImage({
					success: (res) => {
						console.log(res);
						this.files = [...this.files, ...res.tempFiles].slice(0, 9)
					}
				})
			},
			remove(idx) {
				console.log(idx);
				this.files.splice(idx, 1)
			},
			async uploadImage(item) {
				return this.uploadFile(item.path, "images/" + Date.now() + '-' + item.name)
			},
			async uploadFile(filePath, cloudPath) {
				return await uniCloud.uploadFile({
					filePath,
					cloudPath,
					cloudPathAsRealPath: true
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;

		.btns {
			button {
				margin: 20px;
			}
		}

		input {
			background-color: $backgroundLight-color;
			margin-top: 20px;
			padding: 0 10px;
		}

		textarea {
			width: 100%;
			margin-top: 20px;
			margin-bottom: 20px;
			padding: 10px;
			background-color: $backgroundGray-color;
		}
	}

	.publish {
		display: flex;
		flex-wrap: wrap;

		.box {
			background-color: greenyellow;
			width: 230rpx;
			height: 230rpx;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}

			// 去除第三个右边距，以免掉下来
			&:nth-child(3n) {
				margin-right: 0rpx;
			}

			.close {
				display: flex;
				justify-content: space-around;
				background-color: orange;
				position: absolute;
				right: 0;
				top: 0;
				width: 50rpx;
				height: 50rpx;
				background: rgba(0, 0, 0, 0.6);
				color: white;
				border-radius: 0 0 0 50rpx;
			}

			.info {
				position: absolute;
				bottom: 0;
				right: 0;
				color: white;
				width: 100%;
				height: 20px;
				line-height: 20px;
				background-color: rgba(0, 0, 0, 0.6);
				font-size: 12px;

				text {
					margin: 0 20rpx;
				}
			}
		}

		.add {
			font-size: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>