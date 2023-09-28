<template>
	<view class="feed-container">
		<view class="feed-content" v-for="(item,index) in feeds" :key="index" @click="tapCell(index,item)">
			<text class="feed-title"> {{item.title}}</text>
			<text class="feed-subtitle"> {{item.content}}</text>
			<uni-dateformat class="date" :date=item.create_at_time :threshold="[60000, 3600000]"></uni-dateformat>
			<grid-image :imgs="item.imgUrls" @tapImage="tapImg"></grid-image>

			<audio v-if="item.music" style="text-align: left" :src="item.music.url"
				poster="https://img2.kuwo.cn/star/starheads/500/40/70/4171427597.jpg" :name="item.music.name"
				author="unkown" action="audioAction" controls></audio>
			<video v-if="item.movie" :src="item.movie.url" controls></video>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			feeds: {
				type: Array,
				default: new Array
			},
		},
		emit: ['tapImageEvent', 'tapCellEvent'],
		methods: {
			tapImg(index, imgs) {
				this.$emit('tapImageEvent', index, imgs)
			},
			tapCell(index, item) {
				this.$emit('tapCellEvent', index, item)
			}
		}
	}
</script>

<style lang="scss">
	.feed-container {
		.feed-content {
			margin: 0 20px 44px 20px;

			.feed-title {
				display: block;
				font-size: 20px;
				font-weight: 700;
			}

			.feed-subtitle {
				margin-top: 10px;
				display: block;
				font-size: 16px;
				font-weight: 400;
			}

			.date {
				color: #999;
				font-size: 12px;
			}
		}
	}
</style>