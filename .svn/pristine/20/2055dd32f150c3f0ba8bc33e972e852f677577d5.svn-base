<template>
  <my-pagge :isShow="isShow">
		<my-cell-group :data="list" title="推送详情" :titleWidth="180"></my-cell-group>
  </my-pagge>
</template>

<script>
export default {
  data () {
    return {
			isShow:false,
			params:{},
			list:[]
    }
  },
  methods: {

  },
  onLoad (params) {
		if (params.params) {
			this.params = JSON.parse(params.params)
			
			this.list = [
				{title:'推送标题',value:this.params.title},
				{title:'提交时间',value:this.params.operTime},
				{title:'提示信息',value:this.params.detail}
			]
			
			this.$store.dispatch('setIsShow',true)
			let ids = {}
			ids.msgId = this.params.id
			this.$u.api.homeApi.getMsgSetMsgHasRead(ids, this).then(res => {
				
			})
		}
  },
  onReady () {
  	
  }
}
</script>

<style scoped lang="scss">

</style>
