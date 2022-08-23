export default {
	// 查询审核日志
	getReportEditQueryPageList(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/reportEdit/queryPageList', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 提交报告审核
	getReportEditCommitToCheck(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/reportEdit/commitToCheck', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	
}
