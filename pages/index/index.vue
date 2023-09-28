<template>
	<view class="content">
		<feed-content :feeds="dynamicList" @tapImageEvent="tapOneImg" @tapCellEvent="tapOneCell"></feed-content>
		<uni-load-more :status=" noMore ? 'no-more' : 'loading' "></uni-load-more>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from 'vue-property-decorator'
	import {
		getDynamicList
	} from "@/utils/dynamicUntil"
	@Component({})
	export default class Index extends Vue {
		page = 1
		size = 10
		noMore = false
		dynamicList = []

		// test
		async onLoad() {
			console.log('index onLoad..')
			this.loadData()
			// console.log(this.$appName)
		}

		tapOneCell(index : any, item : any) {
			console.log(index, item._id);
			this.navigateToPublish(item._id)
		}
		tapOneImg(current : any, urls : any) {
			uni.previewImage({
				current,
				urls
			})
		}
		async loadData(isRefresh ?: boolean, isMore ?: boolean) {
			if (isRefresh) {
				this.page = 1
				this.noMore = false
			}
			const res = await getDynamicList(this.page, this.size) as any
			const newData : [] = res.result.data
			console.log("dynamic list res", newData)
			if (this.page !== 1) {
				if (newData) {
					this.dynamicList = this.dynamicList.concat(newData)
				}
			} else {
				this.dynamicList = newData
			}
			this.page++
			if (isRefresh) {
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
			}
			if (isMore) {
				if (res.result.data.length === 0) this.noMore = true
			}
		}
		onNavigationBarButtonTap(e : any) {
			this.navigateToPublish()
		}
		navigateToPublish(id ?: any) {
			const url = '/pages/publishDynamic/publishDynamic' + (id ? `?id=${id}` : '')
			console.log(";url : ", url);
			uni.navigateTo({
				url,
				events: {
					publish: (data : any) => {
						console.log("get publish data:", data)
						if (data == true) {
							this.loadData()
						}
					}
				}
			})
		}
		async onPullDownRefresh() {
			this.loadData(true)
		}
		onReachBottom() {
			console.log('reach bottom');
			this.loadData(false, true)
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