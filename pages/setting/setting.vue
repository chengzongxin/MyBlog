<template>
	<view>
		<view class="">
			<button type="default" v-if="noLogin" @click="toLogin">登录</button>
			<view v-else class="bottomBar">
				<button type="primary" @click="getUserInfo">更新个人信息</button>
				<button type="warn" @click="logout">退出</button>
				<button class="clear" type="warn" @click="clearDynamicList">清理用户动态表</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		store,
		mutations
	} from "@/uni_modules/uni-id-pages/common/store.js"
	import {
		database
	} from "@/utils/db.js"
	const db = uniCloud.database()
	const usersTable = db.collection('uni-id-users')
	export default {
		data() {
			return {
				data: null,
				curPage: "setting"
			}
		},
		computed: {
			noLogin() {
				return !store.hasLogin
			}
		},
		methods: {

			toLogin() {
				uni.navigateTo({
					url: `/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=%252Fpages%252F${this.curpage}%252F${this.curpage}`,
				})
			},
			logout() {
				mutations.logout()
			},
			async getUserInfo() {
				console.log("update")
				let res = await usersTable.where("'_id' == $cloudEnv_uid")
					.field('mobile,nickname,username,email,avatar_file')
					.get()

				// const realNameRes = await uniIdCo.getRealNameInfo()

				console.log('fromDbData', res.result.data)
				uni.showToast({
					title: JSON.stringify(res.result.data),
					icon: 'none',
					duration: 10000
				})
				const data = res.result.data[0]
				if (data.nickname.length > 0) {
					this.data = data
				}
			},
			async clearDynamicList() {
				let res = await database.cleardynamicList()
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">
	.bottomBar {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		height: 1000rpx;
		justify-content: space-around;

		button {
			margin: 20px;
		}
	}
</style>