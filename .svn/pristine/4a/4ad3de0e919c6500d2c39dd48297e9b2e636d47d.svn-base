const install = (Vue, vm) => {
	// 配置参数
	Vue.prototype.$u.http.setConfig({
		baseUrl: vm.$common.BaseUrl, // 请求的本域名
		method: 'POST',
		dataType: 'json', // 设置为json，返回后会对数据进行一次JSON.parse()
		showLoading: false, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});

	// 请求拦截
	Vue.prototype.$u.http.interceptor.request = (config) => {
		if (vm.$store.getters.userInfo) {
			config.header.token = vm.$store.getters.userInfo.token;
		}
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if (config.url == '/viws/login') config.header.noToken = true;

		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截
	Vue.prototype.$u.http.interceptor.response = (params,a) => {
		let status = params.statusCode
		let res = params.data
		vm.$store.dispatch('setIsShow',false)
		if(status === 200){
			if (res.code === 0 || res.code === 33) {
				// res为服务端返回值，可能有code，result等字段
				// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
				// 如果配置了originalData为true，请留意这里的返回值
				return res;
			} else if (res.code === 99) {
				vm.$u.toast(res.message);
				return false;
			} else if (res.code === 20) {
				// uni.showModal({
				// 	title: '提示',
				// 	content: res.message,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			vm.$u.route({
				// 				url: 'pages/views/login',
				// 			})
				// 		}
				// 	}
				// });
				vm.$u.toast(res.message);
				vm.$u.route({
					url: 'pages/views/login',
				})
				return false;
			} else {
				// 如果返回false，则会调用Promise的reject回调，
				// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
				vm.$u.toast(res.message);
				return false;
			}
		}else{
			vm.$u.toast('请求异常，请联系管理员');
			return false;
		}
	}
}

export default {
	install
}
