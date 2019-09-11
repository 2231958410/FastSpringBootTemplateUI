<template>
	<div style="height: 100%;">
		<el-row type="flex" class="row-bg" style="margin: 5px;height: 95%;">
			<!--Left Tree-->
			<el-col :span="24" style="margin: 5px;">
				<avue-crud 
				:data="tableData" 
				:tableloading="tableLoading" 
				:permission="permissionList" 
				:option="option" 
				:page="page"
				 @refresh-change="refreshChange"
				 @on-load="getList"
				 @row-save="additem" 
				 @row-update="updateitem" 
				 @row-del="delitem">
				</avue-crud>
			</el-col>
		</el-row>
	</div>
</template>

<script>

	import {
		tableoption
	} from '@/const/crud/user_role/user_role_info.js' //crudoption

	import {
		fetchList,
		addObj,
		delObj,
		putObj,
		getObj
	} from '@/api/setting/user_role/user_role_api.js'

	import {
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				tableLoading: false, //表格等待框的控制
				datetime: '2019',
				page: {
					//pageSizes: [10, 20, 30, 40],默认
					currentPage: 0,
					total: 1,
					pageSize: 10
				},
				tableData:[],
				data:'',
				option: tableoption
			}
		},
		methods: {
			getList(page, params) {
				this.tableLoading = true
				fetchList(Object.assign({
					current: page.currentPage,
					size: page.pageSize
				}, params)).then(response => {
					this.tableData = response.data
					console.log(this.tableData)
					this.page.total = response.data.total
					this.tableLoading = false
				}).catch(() => {
					this.tableLoading = false
				})
			},
			additem(row, done, loading) {
				row.createTime = new Date(),
				row.lastPasswordResetTime = '',
				row.avatar = '',
				addObj(row).then(data => {
					this.tableData.push(Object.assign({}, row))
					this.$message({
						showClose: true,
						message: '添加成功',
						type: 'success'
					})
					done()
					this.getList(this.page)
				}).catch(() => {
					loading()
				})
			},
			delitem(row, index) {
				var _this = this
				this.$confirm('是否确认删除ID为' + row.id+ '的用户', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					return delObj(row.id)
				}).then(data => {
					_this.tableData.splice(index, 1)
					_this.$message({
						showClose: true,
						message: '删除成功',
						type: 'success'
					})
					this.getList(this.page)
				})
			},
			updateitem(row, index, done, loading) {
				row.lastPasswordResetTime = new Date(),
				putObj(row).then(data => {
					this.tableData.splice(index, 1, Object.assign({}, row))
					this.$message({
						showClose: true,
						message: '修改成功',
						type: 'success'
					})
					done()
					this.getList(this.page)
				}).catch(() => {
					loading()
				})
			},
			refreshChange(){
				this.getList(this.page);
			},
			sizeChange(val) {
				this.page.currentPage = 1
				this.page.pageSize = val
				this.getList()
				this.$message.success('行数' + val)
			},
			currentChange(val) {
				this.page.currentPage = val
				this.getList()
				this.$message.success('页码' + val)
			}
		},
		computed: {
				...mapGetters([
				'userInfo'
			]),
		}
	}
</script>

<style>
	.el-row {
		margin-bottom: 0px;

	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 0px;
		background-color: #f9fafc;
	}


	.el-col {
		margin-bottom: 0px;
	}

	.my1style .el-input__inner {
		height: 50px;
		border: 0px;
		background-color: rgb(27, 201, 142);
		text-align: center;
		font-size: 45px;
		color: white;
		width: 90%;
	}
</style>
