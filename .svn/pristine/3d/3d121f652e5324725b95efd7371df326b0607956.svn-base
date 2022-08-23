<template>
  <u-cell-group style="margin-bottom: 20rpx;">
  	<view class="common-title">·{{title}}</view> 
  	<u-cell-item
			v-for="(item,index) in data"
			:key="index"
			:title="item.title"
			:arrow="arrow"
			:value="item.value"
			:title-width="titleWidth"
			v-if="isShow"
			:value-style="{color:item.color !== undefined ? item.color:'#333333'}">
		</u-cell-item>
  </u-cell-group>
</template>

<script>
export default {
	props:{
		title:{
			type:String,
			default:''
		},
		data:{
			type: Array,
			default:() => []
		},
		arrow:{
			type:Boolean,
			default:false
		},
		titleWidth:{
			type:Number,
			default:null
		},
		isShow:{
			type:Boolean,
			default:true
		}
	},
  data () {
    return {
			
    }
  },
  methods: {

  },
  onLoad () {
  	
  },
  onReady () {
  	
  }
}
</script>

<style scoped lang="scss">
	.u-cell{
		padding: 14rpx 30rpx;
	}
</style>
