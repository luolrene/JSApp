<template>
	<my-pagge>
		<view class="wrap">
			<image class="login_bk" src="../../static/common/login_bk.png"></image>
			<view class="content" v-show="!firstLogin">
				<view class="title">欢迎登录！</view>
				<u-form :model="loginForm" ref="loginForm" :label-width="1">
					<u-form-item prop="mobile">
						<u-input v-model="loginForm.mobile" placeholder="请输入手机号" :custom-style="customStyle" />
					</u-form-item>
					<u-gap height="40"></u-gap>
					<u-form-item prop="pwd">
						<u-input type="password" v-model="loginForm.pwd" placeholder="请输入密码" :custom-style="customStyle" />
					</u-form-item>
				</u-form>
				<u-gap height="20"></u-gap>
				<view class="remember-psw">
					<u-checkbox-group shape="circle">
						<u-checkbox 
							v-model="rememberPsw"
							name="记住账号密码"
						><span style="color: #FFFFFF;">记住账号密码</span></u-checkbox>
					</u-checkbox-group>
				</view>
				<u-gap height="100"></u-gap>
				<u-button type="primary" @click="submit" style="background-color: #B0947E;" ripple>登录</u-button>
			</view>
			<view class="content" v-show="firstLogin">
				<view class="title" style="font-size: 46rpx;">初次登录，修改密码！</view>
				<u-form :model="firstLoginForm" ref="firstLoginForm" :label-width="1">
					<u-form-item prop="password">
						<u-input type="password" v-model="firstLoginForm.password" placeholder="请输入新密码" :custom-style="customStyle" />
					</u-form-item>
					<u-gap height="40"></u-gap>
					<u-form-item prop="npwc">
						<u-input type="password" v-model="firstLoginForm.npwc" placeholder="重新输入新密码" :custom-style="customStyle" />
					</u-form-item>
				</u-form>
				<u-gap height="100"></u-gap>
				<u-button type="primary" @click="submit_first" style="background-color: #B0947E;" ripple>密码修改</u-button>
			</view>
			<u-toast ref="uToast" />
		</view>
		<u-modal v-model="modalShow" :content="content" :show-cancel-button="true" confirm-text="修改" @confirm="firstLogin=true"></u-modal>
	</my-pagge>
</template>

<script>
	import upApp from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	import {
		b64Md5
	} from '../utils/md5.js'
	export default {
		data() {
			return {
				firstLogin:false,
				rememberPsw:true,	// 是否记住密码
				loginForm: {
					mobile: '',
					pwd: ''
				},
				firstLoginForm: {
				  password: '',
				  npwc: ''
				},
				rules: {
					mobile: [{
						required: true,
						message: '请填写手机号',
						trigger: 'blur,change'
					}],
					pwd: [{
						required: true,
						message: '请填写密码',
						trigger: 'blur,change'
					}]
				},
				rules_first: {
					password: [{
						required: true,
						message: '请填写新密码',
						trigger: 'blur,change'
					},{
						pattern: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '新密码必须是大写字母，小写字母，数字，特殊字符组成，且长度为8到16位!'
					}],
					npwc: [{
						required: true,
						message: '请再次填写新密码',
						trigger: 'blur,change'
					},{
						pattern: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '新密码必须是大写字母，小写字母，数字，特殊字符组成，且长度为8到16位!'
					}]
				},
				customStyle: {
					color: '#ffffff'
				},
				modalShow:false,
				content: '账号初次登录将先进行密码修改'
			}
		},
		computed: {
		},
		onLoad() {
			/* 获取cid appid appkey */
			// 856c22b75d25362337949c7ef433d1d4
			// const clientInfo = plus.push.getClientInfo()
			// console.log(clientInfo)
			
			this.duUpApp()
		},
		onReady() {
			//页面加载完成，获取本地存储的用户名及密码
			const username = uni.getStorageSync('username');
			const password = uni.getStorageSync('password');
			if (username && password) {
				this.loginForm.mobile = username;
				this.loginForm.pwd = password;
				this.rememberPsw = true
			} else {
				this.loginForm.mobile = "";
				this.loginForm.pwd = "";
				this.rememberPsw = false
			}
			this.$refs.loginForm.setRules(this.rules);
			this.$refs.firstLoginForm.setRules(this.rules_first);
		},
		methods: {
			duUpApp(){
				upApp()
			},
			submit() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						let ids = {}
						ids.mobile = this.loginForm.mobile
						ids.pwd = b64Md5(this.loginForm.pwd).replace(/\+/g, '')
						
						//#ifdef APP-PLUS
						const clientInfo = plus.push.getClientInfo()
						ids.cid = clientInfo.clientid
						//#endif
						
						this.$store.dispatch('setIsShow',true)
						setTimeout(() => {
							this.$u.api.loginApi.getUserLoginUrl(ids, this).then(res => {
								if (res.message === '80') {
									this.modalShow = true
									this.$store.dispatch('setUserInfo', {token: res.result.token}).then(res => {})
								} else {
								  this.$store.dispatch('setUserInfo', res.result)
									this.$store.dispatch('setUserInfo_TAS', res.result)
								  this.$refs.uToast.show({
								  	title: '登录成功',
								  	type: 'success',
								  })
									if (this.rememberPsw) { //用户勾选“记住密码”
										uni.setStorageSync('username', this.loginForm.mobile);
										uni.setStorageSync('password', this.loginForm.pwd);
									} else { //用户没有勾选“记住密码”
										uni.removeStorageSync('username');
										uni.removeStorageSync('password');
										this.loginForm.mobile = "";
										this.loginForm.pwd = "";
									}
								  setTimeout(function() {
								  	uni.switchTab({
								  		url: '/pages/views/home/home'
								  	})
								  }, 600)
								}
							})
						}, 300)
					}
				});
			},
			submit_first(){
				if(this.firstLoginForm.password !== this.firstLoginForm.npwc){
					this.$refs.uToast.show({
						title: '两次密码不相同',
						type: 'warning',
					})
					return
				}
				this.$refs.firstLoginForm.validate(valid => {
					if (valid) {
						let ids = {}
						ids.mobile = this.loginForm.mobile
						ids.pwd = b64Md5(this.loginForm.pwd).replace(/\+/g, '')
						ids.password = b64Md5(this.firstLoginForm.password).replace(/\+/g, '')
						this.$store.dispatch('setIsShow',true)
						let that = this
						setTimeout(function() {
							that.$u.api.loginApi.getUserChange(ids, that).then(res => {
								that.$refs.uToast.show({
									title: '修改成功,请重新登录',
									type: 'success',
								})
								that.firstLogin = false
								that.loginForm.pwd = ''
							})
						}, 300)
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.wrap {
		font-size: 28rpx;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 14vh;

		.content {
			width: 80%;
			z-index: 1;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
				color: #FFFFFF;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}
		}
	}

	.u-input__input {
		color: red;
	}

	.login_bk {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 0;
	}
</style>
