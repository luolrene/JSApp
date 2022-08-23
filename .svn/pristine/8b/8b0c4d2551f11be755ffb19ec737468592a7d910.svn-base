<template>
	<view class="">
		<u-tabs :list="list" :current="current" @change="change"></u-tabs>
		
		<contract :params="params" v-if="current === 0"></contract>
		<customer :custId="params.custId" v-if="current === 1"></customer>
		<task :params="params" v-if="current === 2"></task>
		<process :params="params" v-if="current === 3"></process>
		<remark :params="params" v-if="current === 4"></remark>
	</view>
</template>

<script>
	import contract from './modular/contract.vue'
	import customer from './modular/customer.vue'
	import task from './modular/task.vue'
	import process from './modular/process.vue'
	import remark from './modular/remark.vue'
	export default {
		components: {
		  contract,
		  customer,
		  task,
		  process,
		  remark
		},
		data() {
			return {
				list: [{
					name: '合同信息'
				}, {
					name: '客户信息'
				}, {
					name: '任务信息',
				}, {
					name: '流程明细',
				}, {
					name: '过程备注',
				}],
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		},
		onLoad(params) {
			if (params.params) {
				this.params = JSON.parse(params.params)
			}
		},
		onReady() {

		},
		onReachBottom() {
			if(this.current === 1 || this.current === 4){
				uni.$emit('onReachBottom');
			}
		},
		// 页面返回
		onBackPress(){
			let pages = getCurrentPages() // 当前页面
			let beforePage = pages[pages.length - 2] //上一页
			
			// // #ifdef H5
			// beforePage.doSearch()
			// // #endif
			// // #ifndef H5
			// beforePage.$vm.doSearch()
			// // #endif
		}
	}
</script>

<style lang="scss">

</style>
