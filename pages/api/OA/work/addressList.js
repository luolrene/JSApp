export default {
	//获取部门数据
	getGroupQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/group/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 通讯录
	getUserQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/user/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}