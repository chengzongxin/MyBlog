<template>
	<view class="imageList">
		<image v-for="(item, index) in imgs" :key="index" :src="item" @click="tapItem(index)" mode="aspectFill"></image>
	</view>
</template>


<script>
	export default {
		props: {
			imgs: {
				type: Array,
				default: new Array
			},
		},
		emit: ['tapImage'],
		methods:{
			tapItem(index){
				this.$emit('tapImage', index, this.imgs)
			}
		}
	}
</script>


<style lang="scss">
	.imageList {
		display: flex;
		flex-wrap: wrap;
		image {
			margin: 5px;
			width: 200rpx;
			height: 200rpx;
			box-sizing: border-box;
		}
	}
</style>