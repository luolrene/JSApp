<template>
  <view class="my-search">
    <u-search 
			shape="round"
			v-model="keyWorld"
			v-if="isInputShow"
			:placeholder="placeholder"
			:action-style="{color:'#ffffff',paddingRight:'0'}"
			:clearabled="false"
			style="margin-right: 60rpx;"
			@custom="custom"
			@search="search">
		</u-search>
		<u-search
			shape="round"
			:disabled="true"
			v-model="keyWorld"
			v-if="!isInputShow"
			:placeholder="placeholder"
			:action-style="{color:'#ffffff',paddingRight:'0'}"
			:clearabled="false"
			style="margin-right: 60rpx;"
			:show-action="showAction"
			@click="searchClick "
			@custom="custom"
			@search="search">
		</u-search>
		<u-icon 
			v-if="iconShow"
			size="60" 
			name="list-dot"
			color="#ffffff"
			@click="handleIcon">
		</u-icon>
		
		<u-popup v-model="searchShow" mode="bottom" height="96%" :closeable="true" :mask="false">
			<view class="my-search-popup">
				<view class="my-search-popup-title">筛选</view>
				<scroll-view scroll-y="true" class="my-search-popup-content" style="touch-action: none;">
					<block v-for="(item,index) in data" :key="index">		
						<view class="modular_input" v-if="item.type === 'input'">
							<view style="width: 200rpx;font-weight: 600;">{{item.name}}：</view>
							<my-form
								name="input"
								type="input"
								v-model="fromValiData[item.prop]"
								:placeholder="item.placeholder ? item.placeholder : '请输入...'"
								class="intBorder"></my-form>
						</view>
						
						<view class="modular" v-else-if="item.type === 'select'">
							<view class="title">{{item.name}}</view>
							<u-row style="padding: 0 20rpx;">
								<u-col span="4" v-for="(xdd,num) in item.data" :key="xdd.id" @click="handleMenu(xdd,num,item.prop,item)">
									<view class="menu" :class="{activeMenu:item.active === num}">{{xdd.name}}</view>
								</u-col>
							</u-row>
						</view>
						
						<view class="modular_date" v-else-if="item.type === 'date'" style="display: flex;align-items: center;">
							<view class="title" style="margin-bottom: 0;">{{item.name}}:</view>					
							<input
								class="uni-input"
								type="date"
								@click="item.isShow=true"
								:disabled="true"
								:value="fromValiData[item.prop]"
								placeholder="请选择..."/>
								
								<!-- 日期选择器 -->
								<u-picker mode="time"
									v-model="item.isShow"
									:params="item.params ? item.params:{year:true,month:true,day:true}"
									@confirm="dateConfirm(item,$event)"></u-picker>
						</view>
					</block>
					<slot></slot>
				</scroll-view>
				<view class="my-search-popup-button">
					<u-button size="medium" @click="handleReset">重置</u-button>
					<u-button size="medium" type="primary" @click="handleSearch">搜索</u-button>
				</view>
				
			</view>
		</u-popup>
  </view>
</template>

<script>
export default {
	props:{
		fromValiData: Object,
		data:{
			type:Array,
			default:()=>[]
		},
		obj:Object,
		placeholder:{
			type:'',
			default:'请输入...'
		},
		// 是否启用更多搜索按钮
		iconShow:{
			type:Boolean,
			default:false
		},
		// 是否启用右侧搜索按钮
		showAction:{
			type:Boolean,
			default:true
		},
		// 为true是input手动输入  false是弹出框
		isInputShow:{
			type:Boolean,
			default:true
		}
	},
  data () {
    return {
			keyWorld:'',
			
			searchShow:false
    }
  },
  methods: {
		//点击输入框
		searchClick(e){
			this.$emit('handleSearchClick',e)
		},
		// 搜索事件
		custom(e){
			this.$emit('handleCustom',e)
		},
		search(e){
			this.$emit('handleCustom',e)
		},
		// 点击图标展开搜索选择菜单
		handleIcon(){
			this.searchShow = true
		},
		// 日期选中
		dateConfirm(params,e){
			console.log(params)
			let data = Object.values(e)
			this.fromValiData[params.prop] = ''
			data.forEach(xdd=>{
				this.fromValiData[params.prop] += xdd + '-'
			})
			this.fromValiData[params.prop] = this.fromValiData[params.prop].substring(0,this.fromValiData[params.prop].length - 1)
		},
		//点击菜单
		handleMenu(xdd,index,name,item){
			if(item.active === index){
				item.active = null
				delete this.fromValiData[name]
			}else{
				item.active = index
				this.fromValiData[name] = xdd.id
			}
		},
		// 菜单搜索
		handleSearch(){
			this.searchShow = false
			this.obj.doSearch()
		},
		// 菜单重置
		handleReset(){
			this.data.forEach(xdd=>{
				xdd.active = null
				// 清除表单
				delete this.fromValiData[xdd.prop]
				this.$forceUpdate()
			})
			this.searchShow = false
			this.obj.doSearch()
		},
  },
  mounted () {
		
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
.my-search{
	background-color: #4D72E4;display: flex;padding: 0 20rpx 20rpx 20rpx;justify-content: flex-end;
}
.uni-input-placeholder{
	font-size: 28rpx;
}
::v-deep .uni-input-input{
	font-size: 28rpx;
}

::v-deep .u-action{
	font-size: 30rpx;
}
</style>
