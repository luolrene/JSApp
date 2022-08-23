export default {
	//查询已发起的申请
	getToExamineQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/ToExamine/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	//查询申请的菜单
	getOaProcessGetChildrenTwo(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/OaProcess/getChildrenTwo', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
}