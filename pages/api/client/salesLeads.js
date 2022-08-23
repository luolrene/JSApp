export default {
	// 分页查询
	getCrmSaleOpportunityQueryPageData(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmSaleOpportunity/queryPageData', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 添加修改
	getCrmSaleOpportunityAddOrModify(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmSaleOpportunity/addOrModify', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 删除
	getCrmSaleOpportunityDelCrmSaleOpportunityIds(params, that) {
		return new Promise((resolve, reject) => {
			that.$u.post(that.$common.JS_Server + '/CrmSaleOpportunity/delCrmSaleOpportunityIds', params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
