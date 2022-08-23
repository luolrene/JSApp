export default {
	// 采样任务列表
	getReportTaskQueryPageList(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/reportTask/queryPageList', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 样品管理列表
	getSamplingTaskQuerySampNoPageListByTaskId(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/samplingTask/querySampNoPageListByTaskId', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
