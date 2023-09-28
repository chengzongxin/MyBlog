<template>
	<view class="container">
		<view class="user">
			<view class="avatar">
				<uni-id-pages-avatar width="100rpx" height="100rpx"></uni-id-pages-avatar>
			</view>
			<text class="name" @click="setNickname('')">{{nickname}}</text>
		</view>
		<!-- <uni-list class="list">
			<uni-list-item class="item" @click="setNickname('')" title="昵称" :rightText="nickname||'未设置'" link>
			</uni-list-item>
		</uni-list> -->
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
					title: "11",
					num: "发布"
				},
				{
					title: "22",
					num: "喜欢"
				},
				{
					title: "33",
					num: "收藏"
				},
				{
					title: "44",
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