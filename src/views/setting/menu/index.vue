<template>
	<el-container style="margin: 10px;">
		<el-aside width="200px">
			<el-card class="box-card">

				<div slot="header" class="clearfix">

					<div slot="header" class="clearfix">
						<!--新增菜单-->
						<el-button style="float: left; padding: 3px 0" type="text" @click="dialogFormVisible = true">新增菜单</el-button>
						<!--删除菜单，如果是父节点，必须先删干净该父节点下的子节点-->
						<el-button style="float: right; padding: 3px 0" type="text" @click="delMenu">删除菜单</el-button>
					</div>

				</div>

				<el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>


				<el-tree ref="tree" :data="treedata" node-key="id" :props="TreeProps" @node-click="loadNodeInfo"
				 :filter-node-method="filterNode" style="margin-top: 20px;">
				</el-tree>

			</el-card>

		</el-aside>

		<el-main>
			<avue-form ref="menuinfo" :option="crudoption" v-model="formdata" @submit="updateMenu" ></avue-form>
		</el-main>

		<!--隐藏表单-->
		<el-dialog title="添加菜单" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
			<avue-form :option="formoption" v-model="addformdata" @submit="addMenu">
			</avue-form>
		</el-dialog>


	</el-container>
</template>


<script>
	import {
		tableoption
	} from '@/const/crud/menu/menuinfo.js' //crudoption

	import {
		formtableoption
	} from '@/const/crud/menu/menuinfo_form.js' //formoption

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
				crudoption: tableoption,
				formoption: formtableoption,

				treedata: '',
				formdata: '',
				addformdata: {
					"createTime": '',
					"name": '',
					"component": '',
					"pid": '',
					"sort": '',
					"icon": '',
					"path": '',
					"iframe": ''
				},
				TreeProps: {
					children: 'children',
					label: 'label'
				},
				filterText: '',
				//改为从其他地方引入
				form: '',
				dialogFormVisible: false,
				formLabelWidth: '120px',
			}
		},
		methods: {
			//加载左侧菜单树
			LoadMenusTree() {
				getMenuTree().then(data => {
					this.treedata = data;
				}).catch(() => {
					loading()
				})
			},
			//删除
			delMenu() {
				var _this = this
				alert(_this.addformdata.pid)
				this.$confirm('是否确认删除ID为' + _this.addformdata.pid + '的菜单', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function() {
					return delObj(_this.addformdata.pid)
				}).then(data => {
					_this.$message({
						showClose: true,
						message: '删除成功',
						type: 'success'
					})
					this.$refs.menuinfo.resetForm();
					this.LoadMenusTree();
				})
			},
			//更新
			updateMenu(form, done) {
					putObj(form).then(data => {
						this.$message({
							showClose: true,
							message: '修改成功',
							type: 'success'
						})
						done()
						this.$refs.menuinfo.resetForm();
						this.LoadMenusTree();
					}).catch(() => {
						loading()
					})
			},
			//添加菜单
			addMenu(form, done) {
				form.createTime = new Date(),
					form.iframe = 'false',
					addObj(form).then(data => {
						this.tableData.push(Object.assign({}, form))
						this.$message({
							showClose: true,
							message: '添加成功',
							type: 'success'
						})
						done()
						this.dialogFormVisible = false ;
						this.$refs.menuinfo.resetForm();
						this.LoadMenusTree();
					}).catch(() => {
						this.$message({
							showClose: true,
							message: '添加失败',
							type: 'fail'
						})
					})
			},
			loadNodeInfo(data) {
				getObj(data.id).then(result => {
					this.formdata = result.data;
					//获取当前节点的id,当做添加新菜单的父节点
					this.addformdata.pid = result.data.id;
				}).catch(() => {
					this.$message({
						showClose: true,
						message: '加载信息失败!',
						type: 'fail'
					})
				})
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
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
