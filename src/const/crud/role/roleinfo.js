export const tableoption = {
	title:'角色信息',
	index: true,
	indexLabel: 'ID',
	border: true,
	//对其方式
	align: 'center',
	//选中高亮
	highlightCurrentRow: true,
	//列显隐按钮
	columnBtn: true,
	dialogType:'drawer',
    dialogWidth:800,
	menuAlign: 'center',
	column: [{
			label: '角色名称',
			prop: 'name'
		},{
			label: '备注',
			prop: 'remark'
		},
		{
			label: '数据域',
			prop: 'dataScope'
		},
		{
			label: '级别',
			prop: 'level',
		},
		{
			label: '创建时间',
			disabled: false,
			addDisplay: false,
			disabled: true,
			type: 'datetime',
			format: 'yyyy-MM-dd hh:mm:ss',   //界面显示的格式
			valueFormat: 'yyyy-MM-dd hh:mm:ss', //真正发往后台的格式
			prop: 'createTime',
		}
	]
}
