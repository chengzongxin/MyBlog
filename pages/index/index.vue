<template>
	<view class="content">
		<feed-content :feeds="dynamicList" @tapImageEvent="tapOneImg" @tapCellEvent="tapOneCell"></feed-content>
	</view>
</template>

<script>
	import {
		onMounted
	} from "vue"
	import {
		database
	} from "@/utils/db.js"
	export default {
		data() {
			return {
				title: 'Hello',
				dynamicList: null
			}
		},
		async mounted() {
			this.loadData()
		},
		async onLoad() {
			console.log('index onLoad..')
			console.log(this.$appName)
		},
		methods: {
			tapOneCell(index, item) {
				console.log(index, item._id);
				this.navigateToPublish(item._id)
			},
			tapOneImg(current, urls) {
				uni.previewImage({
					current,
					urls
				})
			},
			async loadData(stopRefresh) {
				const res = await database.dynamicList()
				console.log("dynamic list res", res.result.data)
				this.dynamicList = res.result.data
				if (stopRefresh) {
					setTimeout(function() {
						uni.stopPullDownRefresh();
					}, 1000);
				}
			},
			onNavigationBarButtonTap(e) {
				this.navigateToPublish()
			},
			navigateToPublish(id) {
				const url = '/pages/publishDynamic/publishDynamic' + (id ? `?id=${id}` : '')
				console.log(";url : ", url);
				uni.navigateTo({
					url,
					events: {
						publish: data => {
							console.log("get publish data:", data)
							if (data == true) {
								this.loadData()
							}
						}
					}
				})
			},
			async onPullDownRefresh() {
				this.loadData(true)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>