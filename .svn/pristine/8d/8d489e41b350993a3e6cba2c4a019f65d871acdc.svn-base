export default {
	// 分页查询
	getCrmTrackQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmTrack/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 新增跟踪记录
	getCrmTrackAddOrModify(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmTrack/addOrModify', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 删除
	getCrmTrackDelLaCrmTrackIds(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmTrack/delLaCrmTrackIds', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
