import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: uni.getStorageSync('userInfo'),
		userInfo_TAS: uni.getStorageSync('userInfo_TAS'),
		isShow:false,
		system: 'TAS'
  },
  getters: {
    userInfo (state) {
      if (state.userInfo) {
        return JSON.parse(state.userInfo)
      } else {
        return null
      }
    },
		userInfo_TAS (state) {
		  if (state.userInfo_TAS) {
		    return JSON.parse(state.userInfo_TAS)
		  } else {
		    return null
		  }
		},
		isShow (state) {
		  return state.isShow
		},
		system (state) {
		  return state.system
		}
  },
  mutations: {
    // 变量赋值，同步 不建议外部使用
    SET_UserInfo (state, userInfo) {
      state.userInfo = JSON.stringify(userInfo)
			if(userInfo){
				uni.setStorageSync('userInfo', JSON.stringify(userInfo));
			}else{
				uni.removeStorageSync('userInfo');
			}
    },
		SET_UserInfo_TAS (state, userInfo_TAS) {
		  state.userInfo_TAS = JSON.stringify(userInfo_TAS)
			if(userInfo_TAS){
				uni.setStorageSync('userInfo_TAS', JSON.stringify(userInfo_TAS));
			}else{
				uni.removeStorageSync('userInfo_TAS');
			}
		},
		set_IsShow (state, isShow) {
			state.isShow = isShow
		},
		set_System (state, system) {
			state.system = system
		}
  },
  actions: {
    // 变量赋值，异步 外部使用的赋值方法
    setUserInfo ({commit}, userInfo) {
      commit('SET_UserInfo', userInfo)
    },
		setUserInfo_TAS ({commit}, userInfo_TAS) {
		  commit('SET_UserInfo_TAS', userInfo_TAS)
		},
		setIsShow ({commit}, isShow) {
		  commit('set_IsShow', isShow)
		},
		setSystem ({commit}, system) {
		  commit('set_System', system)
		}
  }
})
export default store
