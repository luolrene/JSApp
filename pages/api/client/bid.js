export default {
	// 招投标分页查询
	getCrmBiddingQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmBidding/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 新增投标
	getCrmBiddingAddOrModify(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmBidding/addOrModify', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 新增投标
	getCrmBiddingDelLByIds(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmBidding/delLByIds', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 审核---分页
	getCrmBiddingToExamineQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmBidding/toExamineQueryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 审核---审核
	getCheckTaskAddCheckLog(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmBidding/addCheckLog', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 获取审核日志明细 
	getCrmBiddingToExamineLogDetailed(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmBidding/toExamineLogDetailed', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}