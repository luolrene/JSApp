
export default {
	// 登录接口
	getUserLoginUrl(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/user/login', params).then(res => {
				resolve(res)
			}).catch(err => {
				console.log(err)
				reject(err)
			})
		})
	},
	// 修改密码
	getUserChange(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/user/change', params).then(res => {
				resolve(res)
			}).catch(err => {
				console.log(err)
				reject(err)
			})
		})
	},
	// 获取菜单权限
	getSysRoleMenu(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/sys/roleMenu', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 退出登录
	getUserLoginout(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/user/loginout', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 菜单
	getSysRoleMenu(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/sys/roleMenu', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
