<template>
  <view class="" style="width: 100%;">
		<block v-if="type === 'input'">
			<input 
				class="uni-input"
				:type="type"
				@input="inputChanges"
				:placeholder="placeholder"
				:value="value"
				:disabled="disabled"
				:class="{disabledClass:disabled}"/>
		</block>
		<!-- 多行输入框 -->
		<block v-else-if="type === 'textarea'">
			<textarea 
				class="uni-input"
				:type="type"
				@input="inputChanges"
				:placeholder="placeholder"
				:value="value"
				:disabled="disabled"
				:class="{disabledClass:disabled}"
				auto-height/>
		</block>
		<!-- 下拉选择 -->
		<block v-else-if="type === 'select'">
			<input 
				class="uni-input"
				:type="type"
				@click="handleSelectClick"
				:disabled="true"
				:value="value"
				:placeholder="placeholder"
				:class="{disabledClass:disabled}"/>
		</block>
		<!-- 城市选择 -->
		<block v-else-if="type === 'selectCity'">
			<input 
				class="uni-input"
				:type="type"
				@click="handleSelectCityClick"
				:disabled="true"
				:value="value"
				:placeholder="placeholder"
				:class="{disabledClass:disabled}"/>
		</block>
		<!-- 时间选择 -->
		<block v-else-if="type === 'date' || type === 'month'">
			<input 
				class="uni-input"
				:type="type"
				@click="handleDateClick"
				:disabled="true"
				:value="value"
				:placeholder="placeholder"
				:class="{disabledClass:disabled}"/>
		</block>
		
		<!-- 下拉选择器 -->
		<u-select
			mode="single-column"
			v-model="selectShow"
			:value-name="selectValue"
			:label-name="selectLabel"
			:list="selectList"
			@confirm="selectConfirm">
		</u-select>
		<!-- 城市选择器 -->
		<u-picker
			mode="region"
			v-model="selectCityShow"
			@confirm="selectCityConfirm">
		</u-picker>
		
		<!-- 时间选择器 -->
		<u-calendar
			v-model="dateShow"
			mode="date"
			@change="dateConfirm"
			:max-date="maxDate">
		</u-calendar>
		
		<!-- 日期选择器 -->
		<u-picker mode="time" v-model="pickerShow" :params="params" @confirm="dateConfirm"></u-picker>
  </view>
</template>

<script>
export default {
	name: "my-form",
	props:{
		value: {
			type:String | Number,
			default : "",
		},
		type:{	//input类型
			type:String,
			default:'input'
		},
		name: { //input名称
			type:String,
			default : "",
		},
		disabled:{
			type:Boolean,
			default:false
		},
		selectList:{ //下拉框数据
			type:Array,
			default:()=>[]
		},
		placeholder:{ // 默认提示
			type:String,
			default:''
		},
		selectValue:{	// 下拉框数据的value属性名
			type:String,
			default:'id'
		},
		selectLabel:{	// 下拉框数据的label属性名
			type:String,
			default:'name'
		},
		params:{
			type:Object,
			default:() => {
				return {year:true,month:true}
			}
		}
	},
  data () {
    return {
			selectShow:false	,	//下拉框是否显示
			selectCityShow:false ,	//城市下拉框显示
			dateShow:false,	//时间下拉框显示
			maxDate: '2023-12-01',	//最大时间
			pickerShow:false, //日期选择器显示
    }
  },
  methods: {
		inputChanges(e){
			this.$emit("input", e.target.value)
		},
		inputBlur(e) {
			this.$emit("blur",e)
		},
		
		// 点击input 弹出下拉框
		handleSelectClick(e) {
			if(!this.disabled){
				this.selectShow = true
			}
		},
		// 下拉框选中时
		selectConfirm(e){
			this.$emit("confirm",e)
		},
		
		// 点击input 弹出城市下拉框
		handleSelectCityClick(e) {
			this.selectCityShow = true
		},
		// 城市下拉框选中时
		selectCityConfirm(e){
			this.$emit("confirm",e)
		},
		
		// 点击input 弹出时间下拉框
		handleDateClick(e) {
			if(!this.disabled && this.type==='date'){
				this.dateShow = true
			}else if(!this.disabled && this.type==='month'){
				this.pickerShow = true
			}
		},
		// 时间下拉框选中时
		dateConfirm(e){
			this.$emit("confirm",e)
		}
  },
	mounted () {
		
	},
	created () {
	
	}
}
</script>

<style scoped lang="scss">
uni-input{
	padding-top: 0;
	font-size: 28rpx;
}
.uni-input-placeholder{
	color: #C0C4CC;
}
.uni-textarea-placeholder{
	font-size: 28rpx;
	color: #C0C4CC;
}
</style>
