export default {
	//待审批的
	getToExamineStepQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/ToExamineStep/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 移交审核
	getToExamineStepModify(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/ToExamineStep/modify', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}