export default {
	// 变更合同审核
	getChangeContQueryPageList(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/changeCont/queryPageList', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	
}
