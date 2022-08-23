<template>
	<my-pagge :isShow="isShow">
		<view class="tableClass" v-for="(item, index) in tableData" :key="index">
			<u-row gutter="16" style="margin-bottom: 20rpx;">
				<u-col span="9" clas="my-list-left">
					<view class="u-line-1 content" v-for="(xdd,index2) in tableHeader_report" :key="xdd.prop"
						style="margin-bottom: 6rpx;">
						<span v-if="index2 === 0" style="font-size: 30rpx;margin-bottom: 8rpx;display: inline-block;">{{index+1}}. {{item[xdd.prop]}}</span>
						<span v-else>{{xdd.label}}：{{item[xdd.prop]}}</span>
					</view>
				</u-col>
				<u-col span="3" class="my-list-right">
					<u-button
						v-if="item.status==='1' || item.status==='3'"
						type="primary"
						size="mini"
						@click="handleNode(item)">节点展示</u-button>
				</u-col>
			</u-row>
			
	<!-- 		<u-row gutter="16" style="padding-left:20rpx;margin-bottom: 20rpx;" v-for="(arc,index3) in item.children" :key="index3">
				<u-col span="9" clas="my-list-left">
						<view class="u-line-1 content" v-for="(xdd,index2) in tableHeader_sampTask" :key="xdd.prop"
							style="margin-bottom: 6rpx;">
							<span v-if="index2 === 0" style="font-size: 30rpx;margin-bottom: 8rpx;display: inline-block;">({{index3+1}}) {{arc[xdd.prop]}}</span>
							<span v-else>{{xdd.label}}：{{arc[xdd.prop]}}</span>
						</view>
					</u-col>
					<u-col span="3" class="my-list-right">
		
					</u-col>
			</u-row> -->
		</view>
	</my-pagge>
</template>

<script>
export default {
  data () {
    return {
			isShow:false,
			params:{},
			
			tableHeader_report: [
				{label: '报告编号',prop: 'reportNoName'},
				{label: '报告任务名称',prop: 'name'},
				{label: '项目名称',prop: 'custName'},
				{label: '是否周期',prop: 'isCycleName'},
				{label: '任务状态',prop: 'statusName'},
				{label: '现场负责人',prop: 'opermanName'},
				{label: '开始时间',prop: 'reportStart'}
			],
			tableHeader_sampTask:[
				{label: '采样任务名称',prop: 'name'},
				{label: '项目名称',prop: 'proName'},
				{label: '报告编号',prop: 'reportNo'},
				{label: '是否周期',prop: 'isCycleName'},
				{label: '任务状态',prop: 'statusName'},
				{label: '现场负责人',prop: 'opermanName'},
				{label: '是否确认',prop: 'funIsOkName'},
			]
    }
  },
  methods: {
		handleNode(params){
			uni.navigateTo({
				url:'node_list?params=' + encodeURIComponent(JSON.stringify(params))
			})
		}
  },
  onLoad(params) {
		this.tableData = []
  	if (params.params) {
  		this.params = JSON.parse(params.params)
			console.log(this.params)
			if(this.params.children && this.params.children.length > 0){
				this.params.children.forEach(xdd=>{
					switch (xdd.status) {
					  case '0':
					    xdd.statusName = '未启动'
					    break
					  case '1':
					    xdd.statusName = '启动'
					    break
					  case '2':
					    xdd.statusName = '撤回'
					    break
					  case '3':
					    xdd.statusName = '完成'
					    break
					  case '4':
					    xdd.statusName = '放弃'
					    break
					}
					switch (xdd.isCycle) {
					  case '1':
					    xdd.isCycleName = '是' + (xdd.checkDetail === null ? '' : '(' + xdd.checkDetail + ')')
					    break
					  case '0':
					    xdd.isCycleName = '否'
					    break
					}
					
					if(xdd.children && xdd.children.length > 0){
						xdd.children.forEach(arc=>{
							switch (arc.status) {
							  case '0':
							    arc.statusName = '未启动'
							    break
							  case '1':
							    arc.statusName = '启动'
							    break
							  case '2':
							    arc.statusName = '撤回'
							    break
							  case '3':
							    arc.statusName = '完成'
							    break
							  case '4':
							    arc.statusName = '放弃'
							    break
							}
							switch (arc.isCycle) {
							  case '1':
							    arc.isCycleName = '是' + (arc.checkDetail === null ? '' : '(' + arc.checkDetail + ')')
							    break
							  case '0':
							    arc.isCycleName = '否'
							    break
							}
							switch (arc.funIsOk) {
							  case '1':
							    arc.funIsOkName = '已确认'
							    break
							  case '0':
							    arc.funIsOkName = '未确认'
							    break
							}
							arc.name += '(采)'
						})
					}
					xdd.reportNoName =  xdd.reportNo + '(报)'
				})
			}
			this.tableData = this.params.children
  	}
		
  },
  onReady () {
  	
  }
}
</script>

<style scoped lang="scss">
.tableClass {
		padding: 30rpx 20rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;

		.my-list-left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.content {
				width: 100%;
			}
		}

		.my-list-right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>
