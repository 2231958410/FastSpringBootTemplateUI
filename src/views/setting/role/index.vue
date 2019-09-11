<template>
	<div style="height: 100%;">
		<el-row type="flex" class="row-bg" style="margin: 5px;height: 95%;background-color: white;">
			<!--Left Tree-->
			<el-col :span="16" style="margin: 5px;">
				<avue-crud ref="table" 
				:data="tableData" 
				:tableloading="tableLoading" 
				:permission="permissionList" 
				:option="option"
				:page="page" 
				@refresh-change="refreshChange" 
				@on-load="getList" 
				@row-save="additem" 
				@row-update="updateitem"
				@row-del="delitem" 
				@row-click="loadMenuByRoleid">
				</avue-crud>
			</el-col>

			<el-col :span="8" style="margin: 5px;">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>角色菜单</span>
						<el-button style="float: right; padding: 3px 0" type="text" @click="saveMenu">保存操作</el-button>
					</div>

					<el-input placeholder="输入关键字进行过滤" v-model="filterText">
					</el-input>

					<el-tree ref="tree" 
					:data="data2" 
					show-checkbox 
					node-key="id" 
					:default-checked-keys="defaultcheck" 
					:props="defaultProps"
					:filter-node-method="filterNode" 
					style="margin-top: 20px;">
					</el-tree>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		tableoption
	} from '@/const/crud/role/roleinfo.js' //crudoption

	import {
		dateFormat
	} from '@/utils/date.js'

	import {
		fetchList,
		addObj,
		delObj,
		putObj,
		getObj,
		getMenuTree,
		updateMenu,
		getMeunidByRoleid
	} from '@/api/setting/role/role_api.js'

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
				tableData: [],
				data: '',
				option: tableoption,
				count: 1,
				data2: '',
				defaultcheck: '',
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				filterText: '',
				roleid: '',
				checked_menuids: '',  //选中的节点
				half_menuids: ''   //半选的节点
			}
		},
		methods: {
			getList(page, params) {
				this.tableLoading = true
				fetchList(Object.assign({
					current: page.currentPage,
					size: page.pageSize
				}, params)).then(response => {
					this.tableData = response.data.records
					console.log(this.tableData)
					this.page.total = response.data.total
					this.tableLoading = false
				}).catch(() => {
					this.tableLoading = false
				})
			},
			additem(row, done, loading) {
				row.createTime = dateFormat(new Date()),
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
				this.$confirm('是否确认删除ID为' + row.id + '的用户', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					return delObj(row.id)
				}).then(data => {
					this.tableData.splice(index, 1)
					this.$message({
						showClose: true,
						message: '删除成功',
						type: 'success'
					})
					this.getList(this.page)
				})
			},
			updateitem(row, index, done, loading) {
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
			loadMenuByRoleid(row, event, column) {
				this.roleid = row.id;
				getMeunidByRoleid(row.id).then(result => {
					//设置选中的节点
					this.$refs.tree.setCheckedKeys(result.data)
					this.$refs.table.setCurrentRow(row)
				}).catch(() => {

				})
			},
			refreshChange() {
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
			},
			LoadMenusTree() {
				getMenuTree().then(data => {
					this.data2 = data;
				}).catch(() => {
					loading()
				})
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			saveMenu() {
				var _this = this
				this.checked_menuids = this.$refs.tree.getCheckedKeys().toString();
				this.half_menuids = this.$refs.tree.getHalfCheckedKeys().toString();
				updateMenu(this.roleid, this.checked_menuids,this.half_menuids).then(response => {
					if (response.code == 0) {
						_this.$message({
							showClose: true,
							message: '保存成功',
							type: 'success'
						})
						this.loadMeun()
					} else {
						_this.$message({
							showClose: true,
							message: '保存失败',
							type: 'falier'
						})
					}
				}).catch(() => {

				})
			},
			//加载菜单
			loadMeun() {
				getMeunidByRoleid(this.roleid).then(result => {
					//设置选中的节点
					this.$refs.tree.setCheckedKeys(result.data)
					this.$refs.table.setCurrentRow(row)
				}).catch(() => {

				})
			}
		},
		mounted: function() {
			this.LoadMenusTree();
		},
		computed: {
			...mapGetters([
				'userInfo'
			]),
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
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
