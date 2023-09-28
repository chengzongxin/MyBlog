<template>
	<view class="container">
		<view class="user">
			<view class="avatar">
				<uni-id-pages-avatar width="100rpx" height="100rpx"></uni-id-pages-avatar>
			</view>
			<text class="name" @click="setNickname('')">{{ noLogin ? '登录' : nickname}}</text>
			<navigator class="right" url="/pages/setting/setting">设置</navigator>
		</view>
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" :value="nickname" @confirm="setNickname"
				:inputType="setNicknameIng?'nickname':'text'" title="设置昵称" placeholder="请输入要设置的昵称">
			</uni-popup-dialog>
		</uni-popup>


		<view class="dynamic">
			<view class="content-btn" v-for="item in dynamics" :key="item._id">
				<text>{{item.title}}</text>
				<text>{{item.num}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		data() {
			return {
				curpage: "mine",
				setNicknameIng: false,
				dynamics: []
			}
		},
		computed: {
			noLogin() {
				return !store.hasLogin
			},
			nickname() {
				return store.userInfo.nickname
			}
		},
		async mounted() {
			this.dynamics = [{
					title: "0",
					num: "发布"
				},
				{
					title: "0",
					num: "喜欢"
				},
				{
					title: "0",
					num: "收藏"
				},
				{
					title: "0",
					num: "足迹"
				}
			]
		},
		methods: {
			onNavigationBarButtonTap(e) {
				console.log(e)
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			setNickname(nickname) {
				if (this.noLogin) {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
					})
					return
				}
				if (nickname) {
					mutations.updateUserInfo({
						nickname
					})
					this.setNicknameIng = false
					this.$refs.dialog.close()
				} else {
					this.$refs.dialog.open()
				}
			},
		}
	}
</script>

<style lang="scss">
	.user {

		display: flex;
		align-items: center;
		height: 100rpx;

		.right {
			position: absolute;
			top: 10px;
			right: 0px;
			height: 30px;
			width: 50px;
		}
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-left: 20px;
	}

	.name {
		margin-left: 20px;
		font-size: 44rpx;
		font-weight: 700;
	}


	.dynamic {
		margin-top: 20px;
		display: flex;

		.content-btn {
			width: 25%;
			height: 134rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			text:first-child {
				color: $primary-color;
				font-size: 22px;
				font-weight: 700;
			}

			text:last-child {
				color: $placeholder-color;
				font-size: 12px;
			}

		}
	}

	.list {
		margin-top: 100rpx;
	}

	.container {}
</style>