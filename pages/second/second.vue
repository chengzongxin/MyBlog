<template>
	<view>
		{{title}}
		{{head}}
		{{title}}
	</view>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	@Component({})
	export default class Second extends Vue {
		title : string = '1111'
		head : string = '2222'
	}
</script>

<style>

</style>