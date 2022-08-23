export default {
	// 节点日志查询
	getReportTaskLogQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/reportTaskLog/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 节点日志新增
	getReportTaskLogAdd(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/reportTaskLog/add', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 节点的负责人，时间，当前节点查询
	getReportJdQueryTaskJdShow(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/reportJd/queryTaskJdShow', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
