export default {
	//获取菜单数据
	getSysRoleMenu(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.BaseUrl_OA + that.$common.OA_Server + '/sys/roleMenu', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}