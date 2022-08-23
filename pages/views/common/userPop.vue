<template>
  <view>
    <u-popup v-model="isShow" mode="bottom" height="90%" :closeable="true" :mask-close-able="false" close-icon-color="#ffffff">
			<my-search
			:fromValiData="fromValiData"
			:obj="this"
			placeholder="请输入人员名称"
			@handleCustom="handleCustom" type="primary" style="padding-top: 20rpx;"></my-search>
			<scroll-view scroll-y="true" style="height: 84%;">
				<u-checkbox-group @change="checkboxGroupChange" :wrap="true" style="background-color: #FFFFFF;padding: 0 20rpx 40rpx 20rpx;width: 100%;">
					<div style="margin: 20rpx 0;width: 100%;">
						已选中人员：
						<u-tag
						v-show="checkList.length > 0"
						v-for="(item,index) in checkList"
						:key="index"
						:index="index"
						:closeable="true"
						@close="closeCheck"
						:text="item.name"
						mode="plain"
						shape="circleRight"
						close-color="#FA3534"
						style="margin: 0 16rpx 12rpx 0;"/>
						<span v-show="checkList.length === 0">无</span>
					</div>
					<u-checkbox 
						@change="checkboxChange"
						v-model="item.checked"
						v-for="(item, index) in userList" :key="index"
						:name="JSON.stringify(item)"
						style="margin-bottom: 10rpx;"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
				<view style="height: 60vh;" v-show="userList.length === 0">
					<u-empty mode="data" text="搜索数据为空"></u-empty>
				</view>
			</scroll-view>
    	
			
			<view class="my-search-popup-button">
				<u-button size="medium" @click="handleReset">重置/全选</u-button>
				<u-button size="medium" type="primary" @click="handleSubmit">确认</u-button>
			</view>
    </u-popup>
  </view>
</template>

<script>
export default {
	props:{
		allList:{
			type:Array,
			default:()=>[]
		},
		checkList:{
			type:Array,
			default:()=>[]
		}
	},
  data () {
    return {
			isShow:false,
			
			fromValiData:{name:''},
			userList:[],	// 查询出来的数据
    }
  },
	watch:{
		isShow(newValue, oldValue){
			if(newValue){
				this.getListData()
			}
		}
	},
  methods: {
		handleSubmit(){
			this.$emit('getUserData',this.checkList)
			this.isShow = false
		},
		handleReset(){
			if(this.checkList.length > 0){
				this.checkList.splice(0,this.checkList.length)
				this.userList.forEach(xdd=>{
					xdd.checked = false
				})
			}else{
				this.userList.forEach(xdd=>{
					this.checkList.push(xdd)
					xdd.checked = true
				})
			}
		},
  	getListData(){
  		this.userList = []
  		let e = []
  		this.allList.forEach(xdd=>{
  			if(xdd.name.indexOf(this.fromValiData.name) > -1){
  				e.push(xdd)
  			}
  		})
  		e.forEach(xdd=>{
  			if(this.checkList && this.checkList.length > 0){
  				let checked = false
  				this.checkList.forEach(arc=>{	
  					if(xdd.id === arc.id){
  						checked = true
  					}
  				})
  				this.userList.push({
  					name:xdd.name,
  					id:xdd.id,
  					mobile:xdd.mobile,
  					checked:checked
  				})
  			}else{
  				this.userList.push({
  					name:xdd.name,
  					id:xdd.id,
  					mobile:xdd.mobile,
  					checked:false
  				})
  			}
  		})
  	},
  	handleCustom(e){
  		this.fromValiData.name = e
  		this.getListData()
  	},
  	// 复选框组事件
  	checkboxGroupChange(e){
  		
  	},
  	// 单个复选事件
  	checkboxChange(e){
  		if(e.value){
  			this.checkList.push(JSON.parse(e.name))
  		}else{
  			let arc = JSON.parse(e.name)
  			this.checkList.forEach((xdd,index)=>{
  				if(xdd.name === arc.name){
  					this.checkList.splice(index,1)
  				}
  			})
  		}
  	},
  	closeCheck(index){
  		this.userList.forEach(xdd=>{
  			if(xdd.id === this.checkList[index].id){
  				xdd.checked = false
  			}
  		})
  		this.checkList.splice(index,1)
  	}
  },
  mounted () {
		this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
