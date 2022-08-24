export default {
	//获取指定用户的已通过的采购记录
	getPurchaseGetAdoptDataByUserId(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/Purchase/getAdoptDataByUserId', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}