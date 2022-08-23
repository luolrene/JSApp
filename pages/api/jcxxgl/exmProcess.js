export default {
	// 流程明细
	getPathQueryPathItems(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/path/queryPathItems', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
}
