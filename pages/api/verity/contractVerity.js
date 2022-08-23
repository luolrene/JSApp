export default {
	// 合同审核
	getCheckTaskAddCheckLog(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/checkTask/addCheckLog', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 查询审核日志
	getCheckTaskQueryLogs(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/checkTask/queryLogs', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	
}

