<template>
	<view class="">
		<u-tabs :list="list" :current="current" @change="change"></u-tabs>
		
		<info :params="params" v-if="current === 0"></info>
		<contract :params="params" v-if="current === 1"></contract>
		<relation :params="params" v-if="current === 2"></relation>
		<contactManage :params="params" v-if="current === 3"></contactManage>
		<followRecords :params="params" v-if="current === 4"></followRecords>
		<visitorsToPlan :params="params" v-if="current === 5"></visitorsToPlan>
		<salesLeads :params="params" v-if="current === 6"></salesLeads>
		<quotationRecord :params="params" v-if="current === 7"></quotationRecord>
	</view>
</template>

<script>
	import info from './modular/info.vue'
	import contract from './modular/contract.vue'
	import relation from './modular/relation.vue'
	import contactManage from './modular/contactManage.vue'
	import followRecords from './modular/followRecords.vue'
	import visitorsToPlan from './modular/visitorsToPlan.vue'
	import salesLeads from './modular/salesLeads.vue'
	import quotationRecord from './modular/quotationRecord.vue'
	export default {
		components: {
		  info,
			contract,
			relation,
			contactManage,
			followRecords,
			visitorsToPlan,
			salesLeads,
			quotationRecord
		},
		data() {
			return {
				list: [{
					name: '客户信息'
				}, {
					name: '合同信息'
				}, {
					name: '客户关系'
				}, {
					name: '联系人',
				}, {
					name: '跟进记录',
				}, {
					name: '访客计划',
				}, {
					name: '销售机会',
				}, {
					name: '报价记录',
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
			if(this.current === 0 || this.current === 1 || this.current === 2){
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
