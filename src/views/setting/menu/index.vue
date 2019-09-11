<template>
	<el-container style="margin: 10px;">
		<el-aside width="200px">
			<el-card class="box-card">
				
				<div slot="header" class="clearfix">
										<div slot="header" class="clearfix">
						<el-button style="float: right; padding: 3px 0" type="text" @click="saveMenu">新增菜单</el-button>
					</div>

				</div>
				
					<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input>
				

				<el-tree 
				ref="tree" 
				:data="treedata" 
				node-key="id" 
				:props="TreeProps"
				@node-click="loadNodeInfo"
				:filter-node-method="filterNode"
				style="margin-top: 20px;">
				</el-tree>

			</el-card>
		</el-aside>
		<el-main>
			<avue-form 
			:option="formoption" 
			v-model="formdata" 
			@submit="handleSubmit"></avue-form>
		</el-main>
	</el-container>
</template>


<script>
	import {
		tableoption
	} from '@/const/crud/menu/menuinfo.js' //crudoption

	import {
		getMenuTree,
	} from '@/api/setting/role/role_api.js'

	import {
		addObj,
		delObj,
		putObj,
		getObj
	} from '@/api/setting/menu/menu_api.js'

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
				formoption: tableoption,
				treedata: '',
				formdata: '',
				TreeProps: {
					children: 'children',
					label: 'label'
				},
				filterText: ''
			}
		},
		methods: {
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
				this.$confirm('是否确认删除ID为' + row.id + '的用户', '提示', {
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
			//加载左侧菜单树
			LoadMenusTree() {
				getMenuTree().then(data => {
					this.treedata = data;
				}).catch(() => {
					loading()
				})
			},
			handleSubmit(form, done) {
				this.$message.success('正在保存，请稍等！');
				setTimeout(() => {
					done()
				}, 2000)
			},
			loadNodeInfo(data){
				getObj(data.id).then(result => {
					this.formdata = result.data;
				}).catch(() => {
					
				})
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			}
		},
		computed: {
			...mapGetters([
				'userInfo'
			]),
		},
		mounted: function() {
			this.LoadMenusTree();
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
