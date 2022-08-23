export default {
	// 消息推送-分页查询
	getMsgQueryPageList(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/msg/queryPageList', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 消息推送-删除
	getMsgDelMsgs(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/msg/delMsgs', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 消息推送-修改单条数据为已读
	getMsgSetMsgHasRead(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/msg/setMsgHasRead', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 消息推送-查询单条信息
	getMsgQueryOneMsgById(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/msg/queryOneMsgById', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 根据 TAS token获取 OA 用户数据
	getUserGetUserInfoOA(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/user/getUserInfo', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 根据 OA token获取 TAS 用户数据
	getUserGetUserInfoTAS(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/user/getUserInfo', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}